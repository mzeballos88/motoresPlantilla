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
app.set('view engine','pug')

app.use('/api/productos', archivoRutas);
app.use('/resources',express.static('public'));

app.get('/productos',(req,res)=>{
    let renderObj ={
        message:"¡Bienvenidos al PokeApp!"
    }
    res.render('productos.pug',renderObj)
})

app.get('/datos')