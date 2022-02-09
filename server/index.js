const express = require('express')
const session = require('express-session')
const cors = require('cors')
let PORT = 2001;

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))

app.use(session({
    secret: "michalhazanshoosh",
    name: "michal",
    resave: true, //זוכר כל פעולה
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, //שנה
    }
}))
app.get('/', (req, res) => {
    res.send({ msg: "work", docsUrl: "http://localhost:2001/vacations" })
})
// endpoints

app.use('/vacations', require('./routes/vacations'))
app.use('/users', require('./routes/users'))
app.use('/adminpage', require('./routes/adminpage'))

app.listen(process.env.PORT || PORT, () => console.log(`rocking ${PORT}`))