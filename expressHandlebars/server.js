import Contenedor from './classes/Contenedor.js';
import express from 'express';
import {engine} from 'express-handlebars';
import cors from 'cors';
import upload from './services/uploader.js';


const contenedor = new Contenedor();


const app = express();
import archivoRutas from './rutas/index.js';
const PORT = process.env.PORT||8080;

const server = app.listen(PORT, ()=>{
    console.log("Servidor escuchando en: " +PORT)
})

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    next();
})

app.get('/',(req,res)=>{
    res.send('Bienvenido al PokeShop');
})

app.use('/api/productos', archivoRutas);
app.use('/resources',express.static('public'));

app.get('/views/productos', (req,res)=>{
    contenedor.getAll().then(result=>{
        let info = result.event;
        let preparedObject ={
            products : info
        }
        res.render('products', preparedObject)
    })
})




