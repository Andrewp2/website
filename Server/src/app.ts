import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;
let x = [54, 6, 1];
app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.listen(port, () => {
  console.log(`Server started.`);
});
