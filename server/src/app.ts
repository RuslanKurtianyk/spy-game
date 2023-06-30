import express, { Express, json, urlencoded } from 'express';
const path = require('path');
const cors = require('cors');
require('dotenv').config();

import { appDataSource } from './app-data-source';

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

// Routes
import { routes } from './routes/index';

// Create Express server
export const app: Express = express();

// Express configuration
app.set('port', process.env.PORT || 8081);
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('', routes);

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

