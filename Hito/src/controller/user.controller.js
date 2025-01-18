import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs/dist/bcryptjs.js"

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


//JWT
//registrar usuario
const register = async (req, res) => {
  try {
    const {name, password } = req.body;

    const user = await User.create({name, password});
    return res.status(201).json(user);
  }catch (error) {
    console.log({ error });
    return res.status(500).json({
      message: error,
    });
  }
};

//logear usuario
const login = async (req, res) => {
  try {
    
    const {name, password } = req.body;
    const user = await User.findOne({ where: {name: name} });
    if(!user){
      return res.status(400).json({ message: "Las credenciales ingresadas no son correctas"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({ message: "El password ingresado no es correcto"});
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    res.json({ user, token });
  }catch (error) {
      res.status(500).json({ message: error.message });
    }
};