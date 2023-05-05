import express, { Express, json, urlencoded } from 'express';
const cors = require('cors');
require('dotenv').config();

import { myDataSource } from './app-data-source';

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// Routes
import { routes } from './routes/index';

// Create Express server
export const app: Express = express();

// Express configuration
app.set('port', process.env.PORT || 8081);
const corsOptions = {
    origin: '*',
    methods: [
      'GET',
      'POST',
    ],
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');

app.use(
    '/api/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.use('', routes);
