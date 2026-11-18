import bcrypt from 'bcrypt';
import {createUserRecord, findUserByEmail, findUserByUsername, updateUser, updatePassword, findUserById, findUserWithPasswordById, deleteUser} from '../models/userModel.js';
import {getOwnedGroupsByUserId} from '../models/groupModel.js'

/** Luo uuden käyttäjän*/

export async function createUser(username, email, password) {

    // Otetaan ylimääräiset välilyönnit pois käyttäjänimeltä ja sähköpostiosoitteelta
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const saltRounds = 12;

    // MUOKKAA ALLE VIRHEVIESTIEIHIN RES.JSON JA MESSAGE PALAUTUS!!!!

    // Käyttäjänimen validointia: tarkistetaan, että käyttäjänimi on 3-20 merkkiä pitkä
    if (/^[a-zåäöA-ZÅÄÖ0-9]{3,20}$/.test(trimmedUsername) === false) {
        const error = new Error('Käyttäjätunnuksen täytyy olla 3-20 merkkiä pitkä ja sisältää ainoastaan kirjaimia tai numeroita');
        error.status = 400;
        throw error;
    }

    // Sähköpostin validointia: tarkistetaan, että sähköposti on oikeassa muodossa
    if (/^[a-zåäöA-ZÅÄÖ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail) === false) {
        const error = new Error('Virheellinen sähköpostiosoitteen muoto');
        error.status = 400;
        throw error;

    }

    // Salasanan validointia: tarkistetaan, että salasana on vähintään 8 merkkiä pitkä ja sisältää ainakin yhden ison kirjaimen, yhden pienen kirjaimen, yhden numeron ja yhden erikoismerkin
    if (/^(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zÅÄÖåäö\d@$!%*?&]{8,}$/.test(password) === false) {
        const error = new Error('Salasanan tulee olla vähintään 8 merkkiä pitkä sekä sisältää ainakin yhden ison kirjaimen, yhden pienen kirjaimen, yhden numeron ja yhden erikoismerkin.');
        error.status = 400;
        throw error;
    }

    // Tarkistetaan, onko sähköposti jo käytössä
    const emailExists = await findUserByEmail(trimmedEmail);

    if (emailExists) {
        const error = new Error('Sähköpostiosoite on jo käytössä');
        error.status = 409;
        throw error;
    }

    // Tarkistetaan, onko käyttäjänimi jo käytössä
    const usernameExists = await findUserByUsername(trimmedUsername);

    if (usernameExists) {
        const error = new Error('Käyttäjätunnus varattu');
        error.status = 409;
        throw error;
    }

    // Salasanan hashauksen tekeminen bcrypt-kirjastolla
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Käyttäjän tallentaminen tietokantaan
    const newUser = await createUserRecord(trimmedUsername, trimmedEmail, hashedPassword);
    return newUser;
}

/** Kirjautuminen */

export async function authenticateUser(email, password) {
    
    // Otetaan mahdolliset ylimääräiset välilyönnit pois sähköpostiosoitteelta ja salasanalta
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Tarkistetaan, että sähköposti ja salasana ovat kelvollisia
    if (!trimmedEmail || typeof trimmedPassword !== 'string') {
        const error = new Error('Virheellinen käyttäjätunnus tai salasana');
        error.status = 401;
        throw error;
    }

    // Haetaan käyttäjä tietokannasta sähköpostin perusteella
    const user = await findUserByEmail(trimmedEmail);

    // Tarkistetaan, että käyttäjä on olemassa
    if (!user) {
        const error = new Error('Käyttäjätunnusta ei löytynyt');
        error.status = 401;
        throw error;
    }

    // Tarkistetaan, että salasana on oikea bcrypt-kirjastolla
    const isMatch = await bcrypt.compare(trimmedPassword, user.password_hash);

    // Jos salasana ei täsmää, heitetään virhe
    if (!isMatch) {
        const error = new Error('Virheellinen käyttäjätunnus tai salasana');
        error.status = 401;
        throw error;
    }

    // Palautetaan käyttäjän tiedot ilman salasanaa
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at
    };
};

export async function editUser(userId, username, email){
    if (!username || !email){
        const error = new Error('Käyttäjätunnus ja salasana vaaditaan')
        error.status = 400;
        throw error;
    }

    return await updateUser(userId, username.trim(), email.trim().toLowerCase());
}

export async function editPassword(userId, currentPassword, newPassword) {
    const user = await findUserWithPasswordById(userId);
    const passwordValidation = await bcrypt.compare(currentPassword, user.password_hash);
    const saltRounds = 12;

    if (!passwordValidation) {
        const error = new Error('Nykyinen salasana on väärin')
        error.status = 401;
        throw error;
    }

    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    await updatePassword(userId, newPasswordHash);
}

export async function removeUser(userId){
    const ownedGroups = await getOwnedGroupsByUserId(userId);

    /* Tietokannassa ON DELETE CASCADE users-taulussa eli käyttäjän poisto poistaa automaattisesti myös: 
    group_members, join_requests, reviews, messages ja movie_lists.
    Alla oleva tarkastus estää ainoastaan tilanteen, jossa käyttäjä on ryhmän omistaja (ja todennäköisesti ainoa admin, hallintaoikeuden toteutus vielä puuttuu)  */

    if (ownedGroups?.length > 0){
        const error = new Error('Poista ensin omistamasi ryhmät tai siirrä ryhmien hallintaoikeus muille')
        error.status = 409;
        throw error;
    }

    return await deleteUser(userId);
}