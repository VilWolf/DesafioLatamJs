const { Router } = require("express");
const {
  obtenerPersonas,
  agregarPersona,
  actualizarPersona,
  borrarPersona,
  obtenerPersona
} = require("../models/persona.model.js");

const router = Router();

// /api/v1/personas

router.get("/", async (req, res) => {
  try {
    const personas = await obtenerPersonas();
    res.json(personas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, gender, birthdate, rut } = req.body;
    await agregarPersona(firstname, lastname, gender, birthdate, rut);

    res.send("Persona agregada con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname } = req.query;
    const result = await actualizarPersona(id, firstname);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await borrarPersona(id);
    res.json({ message: "Persona eliminada con éxito" });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await obtenerPersona(id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ message: "Persona no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la persona" });
  }
});

module.exports = router;
