const express = require('express');
const router = express.Router();
const Things = require('../models/things.js');
// const seedData = require('../models/seed_data.js');


//Seed Route
router.get('/seed', (req, res)=>{
    Things.create([{
    name:"Fabe's Kreations",
    img:"/images/fabek.jpeg",
    description:'Kustom Jewelry With Swag for everyone designed by Fabian Broaden.',
    webLink: "https://www.fabeskreations.com/"
},
{
    name:'Plexus',
    img: "/images/plexus.png",
    description:'For you health: Safe, effective weight management, nutrition, and skin care all in one place. Mimi Forkner Berry is your personal Plexus Ambassador.',
    webLink: "https://plexusworldwide.com/home"
},
{
    name:'LimeLife by Alcone',
    img: "/images/limelife.jpg",
    description:'Every person is made of pure gold!! Make up should just make you sparkle more!! Come on in and shop! You can also become a beauty guide. Natalie Lichenfels is your personal beauty guide.',
    webLink: "https://www.limelifebyalcone.com/nbl"
},
{
    name:'Sipology by Steeped Tea',
    img: "/images/sipology.jpg",
    description:'A variety of loose leaf teas, accesories, and sweet/savory treats. Sold by your very own Siplogist, Tamara Sabine.',
    webLink: "https://www.sipology.com/?fromConsultant=KT204887"

}], (err, data)=>{
  // console.log(err);
        res.redirect('/things');
    })
});


//Index
router.get('/', (req, res) => {
    Things.find({}, (error, allThings) => {
      // console.log(allThings);
        res.render('index.ejs',{
            things: allThings
        });
    })
});

//Delete
router.delete('/:id', (req, res)=>{
  Things.findByIdAndRemove(req.params.id, (error, deletedThings) => {
    res.redirect('/things')
  })
});

//Edit
router.get('/:id/edit', (req, res) => {
    Things.findById(req.params.id, (error, foundThings) => {
      // console.log(error);
      res.render('edit.ejs', {things: foundThings});
    })

})

//Update
router.put('/:id', (req, res)=>{
  Things.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/things');
  })
});

//New
router.get('/new', (req, res) => {
    res.render('new.ejs');
});


//Create POST
router.post('/', (req, res) => {
    Things.create(req.body, (error, createdThings) => {
      // console.log(error);
        res.redirect('/things')
    });
});

// Show
router.get('/:id', (req, res) => {
    Things.findById(req.params.id, (error, foundThings) => {
      // console.log(foundThings);
      console.log(error);
        res.render('show.ejs', {
            things: foundThings
        });
    });
});

module.exports = router;
