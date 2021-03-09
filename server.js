const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let waitingList = [];
let reserve = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));
app.get('/Tables', (req, res) =>
  res.sendFile(path.join(__dirname, 'Tables.html'))
);
app.get('/Reserves', (req, res) =>
  res.sendFile(path.join(__dirname, 'Reserves.html'))
);

app.get('/api/Tables', (req, res) => {
  res.json(reserve);
});

app.get('/api/waitingList', (req, res) => {
  res.json(waitingList);
});

app.post('/api/Tables', (req, res) => {
  const reservation = req.body;

  if (reserve.length < 6) {
    reserve.push(reservation);
  } else {
    waitingList.push(reservation);
  }
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
