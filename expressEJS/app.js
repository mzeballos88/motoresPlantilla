import Contenedor from './classes/Contenedor.js';
import express from 'express';
import cors from 'cors';
import archivoRutas from './rutas/index.js';

const app = express();
const contenedor = new Contenedor();

const server = app.listen(8080,()=>{
    console.log("Escuchando servidor 8080");
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    next();
})

app.set('views','/views')
app.set('view engine','ejs')

app.use('/api/productos', archivoRutas);
app.use('/resources',express.static('public'));


let productos = [];

app.get('/productos',(req,res)=>{
    let renderObj ={
        producto:productos
    }
    res.render('productos.ejs',renderObj)
})

app.get('/datos')