const router = require('express').Router()
const { SQL } = require('../dbconfig')
const onlyUsers = require('../helpers/onlyUsers')


router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body
        if (!username || !password || !firstName || !lastName) {
            return res.status(400).send({ err: "make sure you enterd all info" })
        }
        const user = await SQL(`
          INSERT INTO users
          (firstName, lastName, username, password)
           VALUES
          ("${firstName}","${lastName}","${username}","${password}")
        `)
        req.session.username = username
        res.send({ msg: `Welcome ${username}`, username })
    } catch (error) {
        console.log(error);
        res.send({ err: "username is taken / error 500", error })
    }

})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).send({ err: "make sure you enterd all info" })
        }

        const user = await SQL(`
             SELECT * FROM vacationdb.users
             where username="${username}" and password= "${password}";
        `)
        if (user.length < 1) {
            return res.status(400).send({ err: "wrong username / password" })
        }
        req.session.username = username
        req.session.isAdmin = user[0].isAdmin
        req.session.user_id = user[0].id
        console.log(req.session.username);
        res.send({ msg: "user logged in, welcome " + username, user })

    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }



})
router.delete('/logout', (req, res) => {
    req.session.destroy()
    res.send({ msg: "bye bye" })
})






module.exports = router