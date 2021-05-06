const  express = require( 'express');
const  cors = require( 'cors');
const  env = require( './env');
const  customerRoutes = require( './app/routes/customerRoutes');
const dotenv = require('dotenv')
dotenv.config();
require('babel-polyfill');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', customerRoutes);


app.listen(process.env.PORT).on('listening', () => {
  console.log(`🚀 are live on ${process.env.PORT}`);
});

module.exports = app;