const router = require('express').Router()
const { SQL } = require('../dbconfig')
const onlyAdmin = require('../helpers/onlyAdmin')



// --- דוחות חופשה וכמות עוקבים----
router.get('/forreport', onlyAdmin, async (req, res) => {
    try {
        const forreport = await SQL(`
        SELECT * FROM vacationdb.vacations
        where followersNum > 0
        `)
        console.table(forreport) //showing nice table at the terminal
        res.send(forreport)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
// ---------------------------
//----הוספת חופשה---
router.post('/add', onlyAdmin, async (req, res) => {
    try {
        const { description, location, picture, dateGo, dateBack, price } = req.body
        if (!location || !description || !picture || !dateGo || !dateBack || !price) {
            return res.send({ err: "missing information" })
        }
        await SQL(`
        INSERT INTO vacationdb.vacations
         (description, location, picture, dateGo, dateBack, price )
         VALUES
        ("${description}","${location}","${picture}","${dateGo}","${dateBack}",${price})        
            `);
        res.send({ msg: "added vac" })

    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
//----עריכת חופשה---
router.put('/update/:id', onlyAdmin, async (req, res) => {
    try {
        const { description, location, picture, dateGo, dateBack, price } = req.body

        await SQL(`UPDATE vacations
        SET description="${description}", location="${location}",
        picture="${picture}", price=${price}
        WHERE id=${req.params.id}`);

        if (dateGo) {
            await SQL(`UPDATE vacations
            SET dateGo="${dateGo}"
            WHERE id=${req.params.id}`);
        }
        if (dateBack) {
            await SQL(`UPDATE vacations
            SET dateBack="${dateBack}"
            WHERE id=${req.params.id}`);
        }

        res.send({ msg: "updated vac" })

    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
//----מחיקת חופשה---
router.delete('/delete/:id', onlyAdmin, async (req, res) => {
    try {

        await SQL(`
        DELETE FROM vacationdb.vacations_of_users
        WHERE vacation_id=${req.params.id} ; 
         `);


    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
    try {

        await SQL(`
        DELETE FROM vacationdb.vacations
        WHERE id=${req.params.id} ;   
         `);
        res.send({ msg: "deleted vac" })

    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

module.exports = router