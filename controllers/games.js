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
        const game = await Game.findById(req.params.gameId)
        res.render('games/show.ejs', {
            game: game
        })

    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/:gameId/reviews/new', function(req, res){
        if(req.session.user){
            res.render('games/new.ejs')
        } else {
            res.redirect(`/auth/sign-up?${error}`)
        }
})

router.post('/:gameId/reviews',async function(req, res){
    try {
        const currentGame = await Game.findById(req.params.gameId)
        req.body.user = req.session.user
        req.body.username = req.session.user.username
        currentGame.reviews.push(req.body)
        await currentGame.save()
        console.log(currentGame)
        console.log(req.body)
        res.redirect(`/games/${currentGame._id}`)
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





// create: “/:gameId/reviews/new”
// update: “/:gameId/reviews/:reviewId/edit”
// delete: “/:gameId/reviews/:reviewId/delete”






module.exports = router;