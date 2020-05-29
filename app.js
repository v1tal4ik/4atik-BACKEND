import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import RootRouter from './routes';
import './models/index';

const port = process.env.PORT || 3001;
const app = express();

app
  .use(express.static(path.join(__dirname, '../client/build')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(bodyParser.text())
  .use(bodyParser.json())
  .use('/1.0', RootRouter);

app.use((req, res) => {
  res.status(404).json({
    err: '404',
    message: '404 - Not found',
  });
});

app.use((err, req, res) => {
  res.status(500).json({
    err: '500',
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
