import jwt from 'jsonwebtoken';

// Asetetaan evästeen nimi ja asetukset. Eväste on httpOnly, secure vain tuotannossa, sameSite=lax ja polku on root (/).
const cookieName = 'auth';
const cookieOptions = {
  httpOnly: true, // httpOnly tarkoittaa, että eväste ei ole käytettävissä JavaScriptistä
  secure: process.env.NODE_ENV === 'production', // secure tarkoittaa, että eväste lähetetään vain HTTPS-yhteyden yli, tämä on ehdollinen vain tuotannossa
  sameSite: 'lax', // lax tarkoittaa, että eväste lähetetään vain saman originin pyyntöihin, mutta ei cross-site POST-pyyntöihin
  path: '/', // polku tarkoittaa, että eväste on voimassa kaikilla poluilla
};

/* Tällä funktiolla luodaan JWT ja asetetaan se evästeeksi selaimeen. 
   Evästeen voimassaoloaika on 30 minuuttia.
   */
export function issueCookie(res, user) {

  // Luodaan JWT ja käytetään ympäristömuuttujassa olevaa salaisuutta (JWT_SECRET) allekirjoittamiseen. 
  // JWT sisältää käyttäjän id:n (sub) ja on voimassa 30 minuuttia. 
  // Lisäksi määritellään algoritmi, julkaisija (issuer) ja vastaanottaja (audience) (nämä eivät ole pakollisia).
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: '30m', algorithm: 'HS256', issuer: 'movie-community', audience: 'movie-community-web'
  });
  // Asetetaan eväste vastaukseen
  res.cookie(cookieName, token, { ...cookieOptions, maxAge: 30 * 60 * 1000 });
}

export function clearCookie(res) {

  res.clearCookie(
    cookieName,
    cookieOptions
  );
}
