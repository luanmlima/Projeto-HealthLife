import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import routes from './routes';

const app = express();
env.config();
app.use(express.json(), cors(), routes);

app.listen(process.env.PORT, () => {
  console.log(`Server start port ${process.env.PORT}`);
});
