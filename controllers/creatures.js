const express = require('express')
const router = express.Router()
const fs = require('fs')

// PC Index Route
router.get('/', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    res.render('./prehistoric_creatures/index', {creatures:creatureData});
});

//PC New Route
router.get('/new', (req,res)=> {
    res.render('./prehistoric_creatures/new')
})

//Get ID PC Route
router.get('/:idx', (req,res)=> {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let pcData = JSON.parse(creatures)

    //get array index from url parameter
    let pcIndex = parseInt(req.params.idx)
    res.render('./prehistoric_creatures/show', {myPC: pcData[pcIndex], pcId: pcIndex})
})

//PC Post Route
router.post('/', (req,res)=> {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let pcData = JSON.parse(creatures)
    pcData.push(req.body) //push the new pc to the array
    //save the new pcData array to the dinosaurs.json file
    //JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(pcData))
    //redirect to the GET /dinosaurs route (index)
    res.redirect('/prehistoric_creatures')
})

module.exports = router;