const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const app = express()

const authRouter = require('./routes/auth.routes')
const linkRouter = require('./routes/link.routes')

app.use(express.json({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/link', linkRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'))

        const PORT = config.get('port') || 5001
        const HOST = config.get('host') || 'localhost'
        app.listen(PORT, HOST, () => console.log(`Server working on ${HOST} ${PORT}...`))
    } catch (error) {
        console.log('Server error', error.message);
        process.exit(1)
    }
}

start()

