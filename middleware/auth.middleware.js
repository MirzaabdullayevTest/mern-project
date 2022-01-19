const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {  // 
        return next()
    }

    try {
        const token = req.headers.authorisation.split(' ')[1] // '[Bearer Token]'

        console.log(token);

        if (!token) {
            return res.status(401).json({ message: 'No auth' })
        }

        const decoded = jwt.verify(token, config.get('jwtSecretKey'))  //tekshirib beradi
        req.user = decoded  // 
        next()
    } catch (error) {
        return res.status(401).json({ message: 'No auth' })
    }
}