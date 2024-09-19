const express = require('express')
const router = express.Router()

const Game = require('../models/game.js')
// const session = require('express-session')

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
        const game = await Game.findById(req.params.gameId)
        console.log(game.reviews)
        res.render('games/show.ejs', {
            game: game,
        })

    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
})

router.post('/:gameId/reviews',async function(req, res){
    try {
        const currentGame = await Game.findById(req.params.gameId)
        if(req.session.user){
        req.body.user = req.session.user
        req.body.username = req.session.user.username
        currentGame.reviews.push(req.body)
        await currentGame.save()
        res.redirect(`/games/${currentGame._id}`)
        } else {
            res.render('games/show.ejs', {
                game: currentGame,
                message: 'Please create an account before making a review!'
            })
        }
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/:gameId/reviews/:reviewId/edit', async function(req, res){
    try {
        const currentGame = await Game.findById(req.params.gameId)
        const review = currentGame.reviews.id(req.params.reviewId)
        res.render('games/edit.ejs', {
            review: review,
            game: currentGame
        })
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
})

router.put('/:gameId/reviews/:reviewId', async function(req, res){
    try {
        const currentGame = await Game.findById(req.params.gameId)
        const review = currentGame.reviews.id(req.params.reviewId)
        review.set(req.body)
        await currentGame.save()
        res.redirect(`/games/${currentGame._id}`)
    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
})




router.delete('/:gameId/reviews/:reviewId', async function(req, res){
    try{
        const currentGame = await Game.findById(req.params.gameId)
        currentGame.reviews.id(req.params.reviewId).deleteOne()
        await currentGame.save()
        res.redirect(`/games/${currentGame._id}`)
    } catch(err){
        console.log(err)
        res.redirect('/')
    }
})

//games not defined in index.ejs


module.exports = router;