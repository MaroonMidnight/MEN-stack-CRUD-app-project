const express = require('express')
const router = express.Router()

const Game = require('../models/game.js')

router.get('/', async function(req, res){
        try {
            const allGames = await Game.find({})
            console.log(allGames,'games')
            res.render('games/index.ejs', {
                games: allGames
            })
        } catch(err){
            console.log(err)
            res.redirect('/')
        }
})

router.get('/:gameId', async function(req, res){
    try{
        const game = await Game.findById(req.params.gameId).populate('reviews')
        res.render('games/show.ejs', {
            game: game
        })

    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
})

router.post('/new', async function(req, res){
    try{
        const newGame = await Game.create(req.body)
        res.json(newGame)
    } catch(err){
        console.log(err)
    }
})


// create: “/:gameId/reviews/new”
// update: “/:gameId/reviews/:reviewId/edit”
// delete: “/:gameId/reviews/:reviewId/delete”






module.exports = router;