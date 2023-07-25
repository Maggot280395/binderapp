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
/*
const connectionOptions = {
  host: 'e30109de-b87a-4fb9-9a92-eeeeae99a9db.hana.trial-us10.hanacloud.ondemand.com',
  port: 443,
  user: 'DB_1_82A8JGBRXMEVKPMKPV56WEXPU_RT',
  password: 'Lm0MPTASCdWF19N8FE8N0-S9WSRbZR_J8yPA9FEGuemasJtDI_XBcdInEj5JnXy.ahZUujvMxxkXuVbxd0sB5oBgTy2inT9dqMhz-w1NY6jzVHaTwo3Tr3hMuG09Hu-t',
  encrypt: true
};*/

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
  client.exec('SELECT * FROM DB_1.USERINFO', (err, result) => {
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
    client.exec('INSERT INTO DB_1.USERINFO (ID, firstName, lastName, password) VALUES ('+body.id+',\''+body.firstName+'\',\''+body.lastName+'\',\''+body.password+'\');', (err, result) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }else{
        res.send({'response':'User Registered'});
      }
    });
  });

app.get('/loginUser', function (req, res) {
    var user=req.query.usr;
    var password=req.query.pwd;
    client.exec('SELECT ID, firstName FROM E40188BF6E914BC39E71CAB89533F4CD.BINDERAPP1_1_USERINFO WHERE firstname='+user+' AND PASSWORD=\''+password+'\';', (err, result) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }else{
        if(result.length>0){
          res.send({"text":"Correct"})
        }else{
          res.send({"text":"Incorrect"});
        }
      }
    });
  });

app.get('/loadProfile', function (req, res) {
    var user=req.query.usr;
    res.json(data);
  });

const port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});
