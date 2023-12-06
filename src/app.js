import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import productRouter from './routes/products.router.js';
import './db/connection.js';
import cartRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js';
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewRouter);

const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket)=>{
    console.log(`Usuario conectado ${socket.id}`);
    socket.on('disconnect', ()=> console.log('usuario desconectado'))

    socket.emit('saludoDesdeBack', 'Bienvenido a websocket')

    socket.on('respuestaDesdeFront', (msg)=> console.log(msg))

    socket.on('newProduct', (product)=>{
        console.log("Producto recibido en el servidor:", product);
        products.push(product)
        socketServer.emit('arrayProducts', products)
    })
})