const { Router } = require('express')
const router = Router()
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')

router.post('/generate', (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId })

        console.log(links);
        
        res.json(links)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})


module.exports = router