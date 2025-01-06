const { Pool } = require("pg");

const pool = new Pool({
  host: "127.0.0.1",
  user: "wolff",
  password: "123654",
  database: "postgres",
  allowExitOnIdle: true,
});

//Obtener personas
const obtenerPersonas = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM person ORDER BY id ASC"
  );
  return rows;
};

// //Agregar persona
const agregarPersona = async (
  firstname,
  lastname,
  gender,
  birthdate,
  rut,
) => {
  const consulta =
    "INSERT INTO person values (DEFAULT, $1, $2, $3, $4, $5)";
  const values = [firstname, lastname, gender, birthdate, rut];
  const result = await pool.query(consulta, values);
};

//Actualizar persona
const actualizarPersona = async (id, firstname) => {
  const result = await pool.query(
    "UPDATE person SET firstname = $1 WHERE id = $2",
    [firstname, id]
  );
  return result.rows;
};

//Borrar persona
const borrarPersona = async (id) => {
  const consulta = "DELETE FROM person WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
};

//Obtener persona mediante ID
const obtenerPersona = async (id) => {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(
      "SELECT * FROM person WHERE id = $1",
      [id]
    );
    client.release();
    return rows[0];
  } catch (err) {
    console.error("Error al obtener la persona:", err);
    throw err;
  }
};

module.exports = {
  obtenerPersonas,
  agregarPersona,
  actualizarPersona,
  borrarPersona,
  obtenerPersona
};