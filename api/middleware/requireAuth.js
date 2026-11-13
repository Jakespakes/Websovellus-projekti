import jwt from 'jsonwebtoken'
import { findUserById } from '../models/userModel.js'

export default async function requireAuth(req, res, next) {

    try {
        console.log('cookies:', req.cookies);
        const token = req.cookies.auth;

        // Jos eväste puuttuu, palautetaan 401 Unauthorized    
        if (!token) return res.status(401).json({ error: 'Login is required' });

        // Luetaan JWT ja tarkistetaan sen voimassaolo. 
        // Jos JWT on voimassa, se palauttaa payloadin, joka sisältää käyttäjän id:n (sub).
        const payload = jwt.verify(token, process.env.JWT_SECRET, {
        expiresIn: '30m', algorithms: ['HS256'], issuer: 'movie-community', audience: 'movie-community-web'
        });

        const user = await findUserById(payload.sub);

        if (!user) return res.status(401).json({error: 'User not found'});
        
        // Jos kaikki on kunnossa, lisätään käyttäjän tiedot pyyntöön ja jatketaan seuraavaan middlewareen tai reittiin.
        // Käyttäjän tiedot löytyvät req.user-objektista, jota voidaan käyttää seuraavissa reiteissä.
        req.user = user;
        next();
    } catch {
      return res.status(401).json({ error: 'Session is not valid' });
    }
}
