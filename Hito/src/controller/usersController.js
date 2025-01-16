import { Usuario } from '../models/usuarios.js';

export const obtenerUsuarios = async () => {
  const users = await Usuario.findAll();
  return users;
};

export const crearUsuario = async (req, res) => {
  console.log('=>', req.body);
  const { username, password, email } = req.body;
  const nuevoUsuario = await Usuario.create({ username, password, email });
  return nuevoUsuario;
};
