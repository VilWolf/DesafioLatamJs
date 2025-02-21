import express from 'express';
const app = express();
import 'dotenv/config';
const PORT = process.env.PORT || 3000;

import router from "./src/routes/user.router.js"

const messageQueues = new Map();

import { getPersonas, postPersona, putPersona, deletePersona, getPersona} from './src/routes/persona.route.js';
import { getMongoPersonas } from './src/routes/mongo.route.js';
import { sequelize } from './src/database/sequelize.js';
import { obtenerUsuarios, crearUsuario } from './src/controller/user.controller.js';

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

app.post('/publish/:queue', (req, res) => {
  const { queue } = req.params;
  const { message } = req.body;

  if(!messageQueues.has(queue)) {
     messageQueues.set(queue, []);
  }

  messageQueues.get(queue).push(message);
  res.json({ message })
})


app.get('/publish/:queue', (req, res) => {
  const { queue } = req.params;

  if(!messageQueues.has(queue) || messageQueues.get(queue).length == 0) {
     return res.status(404).json({ message: 'No hay mensajes en la cola'})
  }

  const menssage = messageQueues.get(queue).shift();
  res.json({ menssage })
})







// Ejecutar la prueba
testConnection();

app.use("api/v4/users", router)

//Ultima version, usa registrar y logear
app.listen(PORT, () => {
  console.log('Servidor ENCENDIDO en el puerto 3000');
  sequelize.sync({ force: true });
});

//Deprecado en seguridad
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

app.use(express.json());

