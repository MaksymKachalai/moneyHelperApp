const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const userRouter = require('./routes/api/user');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/user', userRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const errorStatus = err.status ?? 500;
  res.status(errorStatus).json({ message: err.message });
});

app.listen(3001, () => {
  console.log('Server is started');
});
