const express = require('express');
const app = express();
const cors = require('cors');
const hdb = require('hdb');

const connectionOptions = {
  host: 'c14b96c5-80d0-4e8d-987a-016d2dddfe41.hana.trial-us10.hanacloud.ondemand.com',
  port: 443,
  user: 'E40188BF6E914BC39E71CAB89533F4CD_E2YL56BIC7PO8DA0JLRISSCL6_RT',
  password: 'Ai64hAeLOleqJyUUnUD11FeMKYO-ri4hjm52erZ2h3UVdrrNl4zWGagUTEw9LO1pon5pWW1osB2ZpB9t6LlajdlV2roxwhcpgjHPqsROrwWjp0svSwrUmWRZLBZhNhrl',
  encrypt: true
};

const client = hdb.createClient(connectionOptions);
client.connect(err => {
  if (err) {
    console.error('Error connecting:', err);
    return;
  }
  console.log('You are already connected to the DB!');
});

app.use(cors({
    origin: '*'
  }));
// parse JSON
app.use(express.json());
// parse URL encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());

app.get('/test', function (req, res) {
  client.exec('SELECT * FROM DB_1.Interests', (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Process the query result
    const data = result && result.length > 0 ? result[0] : null;
    res.json(data);
  });
});

app.post('/registerUser', function (req, res) {
    var body=req.body;
    console.log(body);
    res.send('User Registered');
  });

app.post('/loginUser', function (req, res) {
    var body=req.body;
    console.log(body);
    if(body.user.id=="I583727" && body.user.password=="hola"){
      res.send('Correct');
    }else{
      res.send('Incorrect');
    }
  });

const port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});
