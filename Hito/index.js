import express from 'express';
const app = express()
import https from 'https';
import fs from 'fs';

import { getPersonas, postPersona, putPersona, deletePersona, getPersona} from './src/routes/persona.route.js';
import { getMongoPersonas } from './src/routes/mongo.route.js';
import { sequelize } from './src/database/sequelize.js';
import { obtenerUsuarios, crearUsuario } from './src/controller/usersController.js';

app.use(express.json());

// Función asíncrona para probar la conexión
async function testConnection() {
  try {
    // Intenta autenticar la conexión
    await sequelize.authenticate();
    console.log('Database ✅');
  } catch (error) {
    console.error('Database ❌', error);
  }
}

// Ejecutar la prueba
testConnection();

app.listen(3000, () => {
  console.log('Servidor ENCENDIDO en el puerto 3000');
  sequelize.sync({ force: true });
});

//Obtener personas
app.get('/api/v1/personas/', async (req, res) => {
  const users = await getPersonas();
  console.log('users =>', users);
  res.json(users);
});

//Agregar persona
app.post('/api/v1/personas/:id', async (req, res) => {
  const users = await postPersona(req);
  res.json(users);
});

//Modificar persona
app.put('/api/v1/personas/:id', async (req, res) => {
  const users = await putPersona(req);
  res.json(users);
});

//Eliminar persona
app.delete('/api/v1/personas/:id', async (req, res) => {
  const users = await deletePersona(req);
  res.json(users);
});

//Obtener persona
app.get('/api/v1/personas/:id', async (req, res) => {
  const users = await getPersona(req);
  res.json(users);
});

//*** MONGODB ***//
//ObtenerPersona
app.get('/api/v2/personas/', async (req, res) => {
  const users = await getMongoPersonas();
  console.log('users =>', users);
  res.json(users);
});

//** SEQUELIZE **//
app.get('api/v3/users/', async (req, res) => {
  const users = await obtenerUsuarios();
  console.log('users =>', users);
  res.json(users);
});
