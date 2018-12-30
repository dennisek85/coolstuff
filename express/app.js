const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Coolstuff = require('./models/Coolstuff.js');

const app = express();
const router = express.Router();

app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.json());

app.use(express.static('./../dist/coolstuff'));

mongoose.connect('mongodb://localhost:27017/coolstuff', { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', ()=> {
  console.log('Successfully connected to database!');
});

app.listen(4200, ()=>{
  console.log('Listening on port 4200');
});

router.route('/api/coolstuff').get((req, res)=> {
  Coolstuff.find((err, coolstuff)=> {
    if(err) {
      console.log('Error retrieving from dB!');
    }
    else {
      res.json(coolstuff);
    }
  })
});

router.route('/api/coolstuff/:color').put((req, res) => {
  Coolstuff.findOne({'color': req.params.color}, (err, data)=> {
    if(err) {
      console.log('Couldn\'t find matching data');
    }
    else {
      data.color = req.body.color;
      data.number = req.body.number;
      data.save((err, updatedData)=> {
        if(err) {
          return err
        }
        else {
          res.send(updatedData);
        }
      });
    }
  })
});


app.use('/', router);
