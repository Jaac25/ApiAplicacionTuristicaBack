import Server from "./clases/server";
import usuarioRutas from "./rutas/usuario";
import lugarRutas from "./rutas/lugar";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from "body-parser";

const server = new Server();

//Body Parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//Cors
server.app.use(cors({ origin: true, credentials: true }));

//Rutas
server.app.use('/usuario',usuarioRutas);
server.app.use('/lugar',lugarRutas);

//Conectar BD
mongoose.connect(
    'mongodb://localhost:27017/AplicacionTuristica',
    {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        useFindAndModify:false
    },
    (err) => {
        if(err) throw "err";
        console.log("Base de datos funcionando");
    }
)

//Levantar servidor
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`)
})