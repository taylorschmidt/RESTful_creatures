const express = require('express')
const router = express.Router()
const fs = require('fs')


router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //don't need this section in the deliverable - prehistoric creatures
    //handle a query string if there is one
    let nameFilter = req.query.nameFilter
    if (nameFilter) { //reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore case)
        dinoData = dinoData.filter(dino=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('./dinosaurs/index.ejs', {dinosaurs:dinoData});
  });

router.get('/new', (req,res)=> {
    res.render('./dinosaurs/new.ejs')
})

router.get('/:idx', (req,res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //get array index from url parameter
    let dinoIndex = parseInt(req.params.idx)
    res.render('./dinosaurs/show.ejs', {myDino: dinoData[dinoIndex], dinoId: dinoIndex})
})


router.post('/', (req,res)=> {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body) //push the new dino to the array
    //save the new dinoData array to the dinosaurs.json file
    //JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})


module.exports = router;