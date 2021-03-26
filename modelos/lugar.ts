import {Schema, model, Document} from 'mongoose';

const lugarSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
    },
    costo: {
        type: Number,
        required: [true, "Costo obligatorio"]
    },
    ciudad: {
        type: String,
        required: [true, "Ciudad obligatoria"]
    },
    longitud: {
        type: String,
        required: [true, "Longitud obligatoria"]
    },
    latitud: {
        type: String,
        required: [true, "Latitud obligatoria"]
    }
});

interface IYo extends Document{
    nombre: String;
    descripcion: String;
    costo: Number;
    ciudad: String;
    longitud: String;
    latitud: String;
}

export const Lugar = model<IYo>('Lugar',lugarSchema);