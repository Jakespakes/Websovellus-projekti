// "You must use the TMDB logo to identify Your use of TMDB, the TMDB APIs, or TMDB Content. 
// Any use of any TMDB logos in Your Application must be less prominent than the logos or marks
//  that primarily describe or identify Your Application and must make it clear that use of any 
// TMDB logos does not imply any endorsement, certification, or other approval by TMDB. 
// In addition, You must place the following notice prominently in or on Your Application:
// "This [website, program, service, application, product] uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB."
// Pistä jonnekki footterii tai About pagee.

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

const apiKey = process.env.TMDB_API;