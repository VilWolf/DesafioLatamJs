import { obtenerPersonas} from '../models/mongo.model.js';



// /api/v2/personas
export const getMongoPersonas = async () => {
        const personas = await obtenerPersonas();
        return personas;
};