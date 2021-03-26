import { Router, Request, Response} from "express";
import {Usuario} from '../modelos/usuario'

import bcrypt from 'bcryptjs';
import Token from "../clases/token";
import { verificarToken } from "../middelwares/autentification";

const usuarioRutas = Router();


//Crear Usuario
usuarioRutas.post('/crear',(req: Request,res: Response)=>{
    const usuario = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        documento: req.body.documento,
        telefono: req.body.telefono,
        ciudad: req.body.ciudad,
        correo: req.body.correo,
        password: bcrypt.hashSync(req.body.password,10)
    };
    
//Grabar USUARIO en BD
    Usuario.create(usuario).then(usuarioDB => {
        res.json({
            ok: true,
            usuario:usuarioDB
        })
    }).catch(err => {
        res.json({
            ok: false,
            err
        })
    })
});
//Login Usuario
usuarioRutas.post('/entrar',(req: Request,res: Response)=>{
    const body = req.body;
    Usuario.findOne({correo: body.correo},(err,usuarioDB) => {
        if(err) throw err;
        if(!usuarioDB){
            return res.json({
                ok: false,
                mensaje: 'Algo salió mal'
            });
        }
        if(usuarioDB.compararContrasena(body.password)){
            const miToken= Token.getToken({
                _id: usuarioDB._id,
                correo: usuarioDB.correo,
                password: usuarioDB.password
            });
            res.json({
                ok:true,
                token: miToken
            })
        }else{
            res.json({
                ok: false,
                mensaje: "Algo salió mal"
            })
        }
    });
});
usuarioRutas.post('/update', verificarToken, (req: any, res: Response) => {
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
});
    
export default usuarioRutas;