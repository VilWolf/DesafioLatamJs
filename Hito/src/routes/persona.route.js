import { obtenerPersonas, agregarPersona, actualizarPersona, borrarPersona, obtenerPersona} from '../models/persona.model.js';

// /api/v1/personas

export const getPersonas = async () => {
    const personas = await obtenerPersonas();
    return personas;
};

export const postPersona = async (req) => {
    const { firstname, lastname, gender, birthdate, rut } = req.body;
    await agregarPersona(firstname, lastname, gender, birthdate, rut);
};

export const putPersona = async (req) => {
    const { id } = req.params;
    const { firstname } = req.query;
    const result = await actualizarPersona(id, firstname);
};

export const deletePersona = async (req) => {
    const { id } = req.params;
    await borrarPersona(id);
};

export const getPersona = async (req) => {
  const { id } = req.params;
    const persona = await obtenerPersona(id);
    return persona;
};
