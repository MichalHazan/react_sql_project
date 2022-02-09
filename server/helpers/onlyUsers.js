const onlyUsers = (req, res, next) => {
    if (!req.session.username) {
        return res.status(401).send({ err: "you need to log in" })
    }
    next()
}

module.exports = onlyUsers

