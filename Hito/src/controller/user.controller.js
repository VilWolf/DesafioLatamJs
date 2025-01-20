import User from '../models/users.models.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

const PORT = process.env.PORT || 3000;

// export const obtenerUsuarios = async () => {
//   const users = await User.findAll();
//   return users;
// };

// export const crearUsuario = async (req, res) => {
//   console.log('=>', req.body);
//   const { username, password, email } = req.body;
//   const nuevoUsuario = await User.create({ username, password, email });
//   return nuevoUsuario;
// };

// registrar usuario
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    return res.status(201).json(`El usuario fue creado exitosamente`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Logear usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Las credenciales son incorrectas' });
    }

    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res
        .status(400)
        .json({ message: 'Las credenciales son incorrectas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
};

export const userController = { register, login };
