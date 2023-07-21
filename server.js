const express = require('express');
const app = express();
const cors = require('cors');
const hdb = require('hdb');

const connectionOptions = {
  host: 'e30109de-b87a-4fb9-9a92-eeeeae99a9db.hana.trial-us10.hanacloud.ondemand.com',
  port: 443,
  user: 'DB_1_82A8JGBRXMEVKPMKPV56WEXPU_RT',
  password: 'Lm0MPTASCdWF19N8FE8N0-S9WSRbZR_J8yPA9FEGuemasJtDI_XBcdInEj5JnXy.ahZUujvMxxkXuVbxd0sB5oBgTy2inT9dqMhz-w1NY6jzVHaTwo3Tr3hMuG09Hu-t',
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
  client.exec('SELECT * FROM DEVS', (err, result) => {
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
