const { Router } = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

// /api/auth/register
router.post('/register',
    [
        check('email', 'Incorrent email pleace type @').isEmail(),
        check('password', 'Password min length must be 6 symbols').isLength({ min: 6 })
    ], async (req, res) => {
        try {

            console.log('Body', req.body);

            const errors = validationResult(req) // agar error bor bo'lsa errorsga tushadi

            if (!errors.isEmpty()) {  // agar error bo'lsa if ga kiradi
                res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect password or email validation'
                })
            }

            const { email, password } = req.body
            const candidate = await User.findOne({ email }) // agar mavjud bo'lsa email bo'yicha topadi

            if (candidate) {
                res.status(400).json({ message: 'This email is busy' }) // qachon email reg dan o'tgan bo'lsa
            }

            const hashedPassword = await bcrypt.hash(password, 12) // parolni hashladik

            const user = new User({
                email, password: hashedPassword
            })

            await user.save()
            res.status(201).json({ message: 'User created' })
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong, try again' })
        }
    })

// /api/auth/login
router.post('/login', [
    check('email', 'Incorrent email pleace type @').isEmail(),
    check('password', 'Password min length must be 6 symbols').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req) // agar error bor bo'lsa errorsga tushadi
        if (!errors.isEmpty()) {  // agar error bo'lsa if ga kiradi
            res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect password or email validation'
            })
        }

        const { email, password } = req.body
        const user = await User.findOne({ email }) // user qaytadi agar bor bo'lsa

        if (!user) {  // user mavjud bo'lmasa
            res.status(400).json({ message: 'User not found, try again' })
        }

        const isMatch = await bcrypt.compare(password, user.password)  // agar parol to'g'ri bo'lsa true xato bo'lsa false

        if (!isMatch) {
            res.status(400).json({ message: 'Incorrect password to login, try again' })
        }

        const token = await jwt.sign(
            { userId: user.id },
            config.get('jwtSecretKey'),
            { expiresIn: '1h' }  // tokenning yashash vaqti
        )

        res.json({ token, userId: user.id })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

module.exports = router