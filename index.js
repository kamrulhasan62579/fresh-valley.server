var express = require('express')
require('dotenv').config()
var cors = require('cors')
var bodyParser = require('body-parser')
 
var app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
 
app.use(cors())
 


const { MongoClient, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.smuci.mongodb.net/fresh-valley?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




client.connect(err => {
  const collection = client.db("fresh-valley").collection("products");
  console.log('Database Connected');


  app.post('/product', (req, res) => {
    collection.insertOne(req.body)
    .then(result => {
        res.send(result.insertedCount > 0)
        console.log('Inserted Successfully')
    })
  })
  app.get('/product', (req, res) => {
      collection.find({})
      .toArray((err, documents) =>{
          res.send(documents)
      })
  }) 
// signUpRegister

  const signUpRegisterCollection = client.db("fresh-valley").collection("signUpRegister");
  app.post('/signUpRegister', (req, res) => {
    signUpRegisterCollection.insertOne(req.body)
    .then(result => {
      res.send(result.insertedCount < 0)
      console.log('Inserted successfully');
    })
  })
  app.get('/signUpRegister', (req, res) => {
    signUpRegisterCollection.find({})
    .toArray((err, documents) => {
      res.send(documents)
    })
  })

// cheakOutData 

const cheakOutDataCollection = client.db("fresh-valley").collection("cheakOutData");
app.post('/cheakOutData',(req, res) => {
  cheakOutDataCollection.insertOne(req.body)
  .then(result => {
    res.send(result.insertedCount < 0)
    console.log('Data Submitted Successfully')
  })
})
app.get('/cheakOutData', (req, res) => {
  cheakOutDataCollection.find({})
  .toArray((err, documents) => {
    res.send(documents)
  })
})


});


app.get('/', (req, res) => {
  res.send('Hello web developers')
})

app.listen(process.env.PORT || 4007, () => console.log('Listening from port 4007'))