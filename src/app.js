import express from 'express'
import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import chatRouter from './routes/chatRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import { __dirname } from './utils.js';
import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import socketServerController from './socketServerController.js';
import mongoose from 'mongoose';

const connectMongoDB = async () => {
    const DB_URL = 'mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority';
    try {
        await mongoose.connect(DB_URL)
        console.log("DB connected successfully!");
    } catch (err) {
        console.log("DB connection error: ", err);
    }
}



const port = 8080;
const app = express();
connectMongoDB();
//main
console.log(__dirname);
const httpServer = app.listen(port, () => console.log("running"));

//websocket
const socketServer = new Server(httpServer);
socketServerController(socketServer);
app.set('socketio', socketServer);

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//handlebars
app.set('views', `${__dirname}/views`);
const hbs = handlebars.create();
hbs.handlebars.registerHelper('set', function(name, value, options){
    options.data.root[name] = value;
});
hbs.handlebars.registerHelper('checkLastUser', function(value, options){
    if(options.data.root["lastUser"] != value){
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));


//routers
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/chat", chatRouter);
app.use(viewsRouter);





