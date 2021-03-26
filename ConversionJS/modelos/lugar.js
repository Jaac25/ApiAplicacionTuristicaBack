"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lugar = void 0;
const mongoose_1 = require("mongoose");
const lugarSchema = new mongoose_1.Schema({
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
exports.Lugar = mongoose_1.model('Lugar', lugarSchema);
