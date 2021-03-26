"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../modelos/usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../clases/token"));
const autentification_1 = require("../middelwares/autentification");
const usuarioRutas = express_1.Router();
//Crear Usuario
usuarioRutas.post('/crear', (req, res) => {
    const usuario = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        documento: req.body.documento,
        telefono: req.body.telefono,
        ciudad: req.body.ciudad,
        correo: req.body.correo,
        password: bcryptjs_1.default.hashSync(req.body.password, 10)
    };
    //Grabar USUARIO en BD
    usuario_1.Usuario.create(usuario).then(usuarioDB => {
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Login Usuario
usuarioRutas.post('/entrar', (req, res) => {
    const body = req.body;
    usuario_1.Usuario.findOne({ correo: body.correo }, (err, usuarioDB) => {
        if (err)
            throw err;
        if (!usuarioDB) {
            return res.json({
                ok: false,
                mensaje: 'Algo salió mal'
            });
        }
        if (usuarioDB.compararContrasena(body.password)) {
            const miToken = token_1.default.getToken({
                _id: usuarioDB._id,
                correo: usuarioDB.correo,
                password: usuarioDB.password
            });
            res.json({
                ok: true,
                token: miToken
            });
        }
        else {
            res.json({
                ok: false,
                mensaje: "Algo salió mal"
            });
        }
    });
});
usuarioRutas.post('/update', autentification_1.verificarToken, (req, res) => {
    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        password: req.body.password || req.usuario.password
    };
    usuario_1.Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        const miToken = token_1.default.getToken({
            _id: userDB._id,
            correo: userDB.correo,
            password: userDB.password
        });
        res.json({
            ok: true,
            token: miToken
        });
    });
});
exports.default = usuarioRutas;
