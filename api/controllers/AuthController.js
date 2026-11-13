import {createUser, authenticateUser} from '../services/authService.js';
import {issueCookie, clearCookie} from '../services/jwtService.js';


export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    await createUser(username, email, password);

    res.status(201).json({message: 'User created'});
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

export function getProfile(req, res) {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
    created_at: req.user.created_at
  });
};

export function logout(req, res) {

  clearCookie(res);

  res.json({ message: 'Logged out'});
};

