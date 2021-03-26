"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lugar_1 = require("../modelos/lugar");
const lugarRutas = express_1.Router();
//Crear Lugar
lugarRutas.post('/crear', (req, res) => {
    const lugar = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        costo: req.body.costo,
        ciudad: req.body.ciudad,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
    };
    //Grabar Lugar en BD
    lugar_1.Lugar.create(lugar).then(lugarDB => {
        res.json({
            ok: true,
            lugar: lugarDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//Ver Lugar
lugarRutas.get('/todos', (req, res) => {
    lugar_1.Lugar.find({ specialty: req.query.type }).then(function (lugar) {
        res.json(lugar);
    }).catch(function (error) {
        console.log("There was error retrieving businesses" + error);
    });
});
//Verificar LUGAR
/*usuarioRutas.post('/update', verificarToken, (req: any, res: Response) => {
    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        password: req.body.password || req.usuario.password
    }
    Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {
        if (err) throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        const miToken = Token.getToken({
            _id: userDB._id,
            correo: userDB.correo,
            password: userDB.password
        });
        res.json({
            ok: true,
            token: miToken
        });
    });
});*/
exports.default = lugarRutas;
