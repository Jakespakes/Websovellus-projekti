import bcrypt from 'bcrypt';
import {createUserRecord, findUserByEmail, findUserByUsername} from '../models/userModel.js';

/** Luo uuden käyttäjän*/
export async function createUser(username, email, password) {

    // Otetaan ylimääräiset välilyönnit pois käyttäjänimeltä ja sähköpostiosoitteelta
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const saltRounds = 12;

    // Käyttäjänimen validointia: tarkistetaan, että käyttäjänimi on 3-20 merkkiä pitkä
    if (/^[a-zåäöA-ZÅÄÖ0-9]{3,20}$/.test(trimmedUsername) === false) {
        throw new Error('Username must be 3-20 characters long and contain only letters and numbers');
    }

    // Sähköpostin validointia: tarkistetaan, että sähköposti on oikeassa muodossa
    if (/^[a-zåäöA-ZÅÄÖ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail) === false) {
        throw new Error('Invalid email format');
    }

    // Salasanan validointia: tarkistetaan, että salasana on vähintään 8 merkkiä pitkä ja sisältää ainakin yhden ison kirjaimen, yhden pienen kirjaimen, yhden numeron ja yhden erikoismerkin
    if (/^(?=.*[a-zåäö])(?=.*[A-ZÅÄÖ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zÅÄÖåäö\d@$!%*?&]{8,}$/.test(password) === false) {
        throw new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character');
    }

    // Tarkistetaan, onko sähköposti jo käytössä
    const emailExists = await findUserByEmail(trimmedEmail);

    if (emailExists) {
        throw new Error('Email already in use');
    }

    // Tarkistetaan, onko käyttäjänimi jo käytössä
    const usernameExists = await findUserByUsername(trimmedUsername);

    if (usernameExists) {
        throw new Error('Username already in use');
    }

    // Salasanan hashauksen tekeminen bcrypt-kirjastolla
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Käyttäjän tallentaminen tietokantaan
    const newUser = await createUserRecord(trimmedUsername, trimmedEmail, hashedPassword);
    return newUser;
}

/** Kirjautuminen */

export async function authenticateUser(email, password) {
    
    // Otetaan ylimääräiset välilyönnit pois sähköpostiosoitteelta
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Tarkistetaan, että sähköposti ja salasana ovat kelvollisia
    if (!trimmedEmail || typeof trimmedPassword !== 'string') {
        throw new Error('Invalid credentials');
    }

    // Haetaan käyttäjä tietokannasta sähköpostin perusteella
    const user = await findUserByEmail(trimmedEmail);

    // Tarkistetaan, että käyttäjä on olemassa
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Tarkistetaan, että salasana on oikea bcrypt-kirjastolla
    const isMatch = await bcrypt.compare(trimmedPassword, user.password_hash);

    // Jos salasana ei täsmää, heitetään virhe
    if (!isMatch) {
        throw new Error('Invalid credentials');
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