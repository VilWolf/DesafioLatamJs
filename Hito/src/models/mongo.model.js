import { mongoose} from 'mongoose';

const URIDB = "mongodb://localhost:27017/test";

const connectionDb = () => {

    mongoose
        .connect(URIDB, {
        })
        .then(() => {
            console.log("Base de datos conectada");
        })
        .catch((err) => {
            console.log(err)
        });
};


const ClientScheme = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        street: String,
        city: String,
        zipcode: Number,
    },
});

connectionDb();

const ClientModel = mongoose.model("clients", ClientScheme);

export const obtenerPersonas = async (res) => {
        const clients = await ClientModel.find();
        console.log(clients);
        res.json(clients);
};

// app.post("clients", async (req, res) => {
//     try {
//         const newClient = new ClientModel(req.body);
//         const savedClient = await newClient.save();
//         res.json(savedClient);
//     } catch (err) {
//         console.error(err);
//     }
// });
