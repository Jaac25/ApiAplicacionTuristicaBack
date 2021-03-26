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
    ciudad: {
        type: String,
        unique: true,
        required: [true, "Tu número de documento es obligatorio"]
    },
    costo: {
        type: Number,
        unique: true,
        required: [true, "Tu número de teléfono es obligatorio"]
    },
    longitud: {
        type: String,
        unique: true,
        required: [true, "Tu número de teléfono es obligatorio"]
    },
    latitud: {
        type: String,
        unique: true,
        required: [true, "Tu número de teléfono es obligatorio"]
    },
    clicks: {
        type: Number,
        unique: true,
        required: [true, "Tu número de teléfono es obligatorio"]
    }
});
exports.Lugar = mongoose_1.model('Lugar', lugarSchema);
