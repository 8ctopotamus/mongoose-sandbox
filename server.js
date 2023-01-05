require('./config/connection')
const express = require('express');
const { Pet } = require('./models')

const app = express();
const port = 3001;

app.use(express.json());

app.post('/create', async (req, res) => {
  try {
    const result = await Pet.create(req.body)
    res.json(result)
  } catch(err) {
    res.status(500).json(err)
  }
});

app.get('/read', async (req, res) => {
  try {
    const pets = await Pet.find()
    res.json(pets)
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const result = await Pet.findByIdAndUpdate(req.params.id, { 
      $set: req.body 
    }, { new: true })
    res.json(result)
  } catch(err) {
    res.status(500).json(err)
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const result = await Pet.findByIdAndDelete(req.params.id)
    res.json(result)
  } catch(err) {
    res.status(500).json(err)
  }
});

app.put('/increase-age/:id', async (req, res) => {
  try {
    let pet = await Pet.findById(req.params.id)
    pet.increaseAge()
    pet = await Pet.findById(req.params.id)
    res.json(pet)
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
})

app.get('/aggregate-ages', async (req, res) => {
  try {
    const result = await Pet.aggregate([{
      $group: {
        _id: 'Ages',
        min: { $min: '$age'},
        max: { $max: '$age'}
      }
    }])
    res.json(result)
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});







