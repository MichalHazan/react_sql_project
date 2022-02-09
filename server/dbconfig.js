const mysql = require('mysql')


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vacationdb'
});

con.connect(err => {
    if (err) {
        return console.log("😡", err);
    }
    console.log("connected to mysql server 😊");
})
// --  יצירת פונקציה שמחזירה פרומיס כמעטפת לקוורי לאס-קיו-אל שלנו
const SQL = (q) => {
    return new Promise((resolve, reject) => {
        con.query(q, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = { SQL: SQL } //{Key : Value} so the import will be: const { SQL } = require('./dbconfig')
