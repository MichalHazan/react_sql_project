const router = require('express').Router()
const { SQL } = require('../dbconfig')
const onlyUsers = require('../helpers/onlyUsers')

//------חופשות לפי הסדר בהם עוקב היוזר ------
router.get('/', onlyUsers, async (req, res) => {
    try {
        console.log(req.session.user_id);
        const IsFollowVac = await SQL(`
        SELECT * 
             FROM vacationdb.vacations_of_users
             where user_id="${req.session.user_id}"
             ;
        `)
        const Allvacations = await SQL(`SELECT * FROM vacationdb.vacations;`)
        Allvacations.map(async (vac) => {
            
            if (IsFollowVac.find(vu => vu.vacation_id == vac.id)) {
                try {
                    await SQL(`
                        update vacations
                        set isFollowing = 1
                        where id="${vac.id}"
                    `)

                } catch (error) {
                    console.log(error);
                    res.sendStatus(500)
                }
            } else {
                try {
                    await SQL(`
                        update vacations
                        set isFollowing = 0
                        where id="${vac.id}" 
                    `)

                } catch (error) {
                    console.log(error);
                    res.sendStatus(500)
                }
            }
        })
        const vacations = await SQL(`
        SELECT  *
         FROM vacationdb.vacations
         order by vacations.isFollowing desc
        `)
        console.table(vacations) //showing nice table at the terminal
        res.send(vacations)
    } catch (error) {
       
        console.log(error);
        res.sendStatus(500)
    }
})
// -----------------------------------------------
//------רק החופשות אחריהן עוקב היוזר ------
router.get('/myVacations', onlyUsers, async (req, res) => {
    try {

        const vacations = await SQL(`
        SELECT vacations_of_users.* , vacations.* 
        FROM vacationdb.vacations_of_users
        inner join vacations on vacations_of_users.vacation_id = vacations.id
         WHERE vacations_of_users.user_id = ${req.session.user_id}
        `)
        console.table(vacations) //showing nice table at the terminal
        res.send(vacations)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
// -----------------------------------------------
//------חופשה ספציפית ------
router.get('/:id', onlyUsers, async (req, res) => {
    try {

        const vacations = await SQL(`
        SELECT vacations_of_users.* , vacations.* 
        FROM vacationdb.vacations_of_users
        inner join vacations on vacations_of_users.vacation_id = vacations.id
         WHERE vacations.id = ${req.params.id}
        `)
        console.table(vacations) //showing nice table at the terminal
        res.send(vacations)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})
// -----------------------------------------------


//-----הוספת או הורדת מעקב לחופשה ------

router.put('/follow/:id', onlyUsers, async (req, res) => {
    console.log("x");
    try {
        await SQL(`
            update vacations
               set followersNum = followersNum +1
                where id= "${req.params.id}"
            `);
        try {
            await SQL(`
            INSERT INTO vacations_of_users
            (user_id, vacation_id)
            VALUES
            ("${req.session.user_id}","${req.params.id}")
            `)
        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        }
        res.send({ msg: "thanks for follow" })
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

router.put('/unfollow/:id', onlyUsers, async (req, res) => {
    try {
        await SQL(`
        delete from  vacationdb.vacations_of_users
        where user_id="${req.session.user_id}" and vacation_id="${req.params.id}";
        `)
        try {
            await SQL(`
            update vacations
               set followersNum = followersNum  - 1
                where id= "${req.params.id}"
            `);
        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        }
        res.send({ msg: "unfollow" })
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})

// ---------------------------------------



module.exports = router