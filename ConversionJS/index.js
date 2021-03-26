"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const usuario_1 = __importDefault(require("./rutas/usuario"));
const lugar_1 = __importDefault(require("./rutas/lugar"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = new server_1.default();
//Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
//Rutas
server.app.use('/usuario', usuario_1.default);
server.app.use('/lugar', lugar_1.default);
//Conectar BD
mongoose_1.default.connect('mongodb://localhost:27017/AplicacionTuristica', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err)
        throw "err";
    console.log("Base de datos funcionando");
});
//Levantar servidor
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
