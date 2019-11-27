import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import routeManager from './routes/routeManager';


const server = http.createServer(routeManager);

server.listen(8000);