const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
app.get('/api/login', (req, res) => {
  res.send('Welcome to CORS server');
});

app.post('/api/login', (req, res) => {
  console.log('Got body:', req.body);

  res.end('yes');
});

app.listen(8000, () => {
  console.log('Started on PORT 8000');
});
