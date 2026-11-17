import {createUser, authenticateUser, editUser, editPassword} from '../services/authService.js';
import {issueCookie, clearCookie} from '../services/jwtService.js';


export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    await createUser(username, email, password);

    res.status(201).json({message: 'Käyttäjä luotu'});
  } catch (error) {
    next(error);
  }
};

export async function login(req, res, next) {
  try {

    const { email, password } = req.body;

    const user = await authenticateUser(email, password);

    issueCookie(res, user);

    res.json({
      message: "Kirjautuminen onnistui",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};

export function logout(req, res) {

  clearCookie(res);

  res.json({ message: 'Uloskirjautuminen onnistui'});
};


export function getProfile(req, res) {
  res.status(200).json({
    message: "Käyttäjätietojen haku onnistui",
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
    created_at: req.user.created_at
  });
};

export async function updateProfile(req, res, next) {

  try {
    const user = await editUser(req.user.id, req.body.username, req.body.email);
    res.status(200).json({message: "Käyttäjätietojen päivitys onnistui", user});
  } catch (error) {
    next(error);
  }
};

export async function changePassword(req, res, next){
  try {
    await editPassword(req.user.id, req.body.currentPassword, req.body.newPassword);
    res.status(200).json({message: 'Salasana vaihdettu'});
    } catch (error) {
    next(error);
  }
};

