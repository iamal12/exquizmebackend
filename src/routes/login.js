var Router = require('express');
const router1 = Router();

const mysqlConnection = require('../database/database');

router1.get('/', async(req, res) => {
    res.status(200).json('Server is on and database is connected..!!!');
});

router1.get('/:login', async(req, res) => {
    mysqlConnection.query('select * from login;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router1.get('/login/:custemail/:custpassword', async(req, res) => {
    var email = req.params.custemail;
    var password = req.params.custpassword;
    console.log(email);
    console.log(password);
    mysqlConnection.query('select * from login where custemail = ? and custpassword =? ;', [email, password], (error, rows, fields) => {
        if (!error) {
            if(rows.length==0){
                res.json("NO entries");
                console.log("NO entries");
            }
            else{
                res.json(rows);
                console.log(rows);
            }
        } else {
            console.log(error);
        }
    });
});

router1.post('/login', (req, res) => {
    var email = req.body.custemail;
    var pass = req.body.custpassword;
    var status = req.body.status;
    var id = req.body.custid;
    console.log(email);
    console.log(status);
    console.log(pass);
    mysqlConnection.query('insert into login values(?,?,?,?);', [id,email, pass, status], (error, rows, fields) => {
        if (!error) {
            //res.json({ Status: 'Customer registered ..!!' });
            res.send('Login Registered successfully...!!!')

        } else {
            console.log(res.statusCode);
            console.log(error);
            res.send("Duplicate entries..!!!");
        }
    });

});

router1.put('/:login', (req, res) => {
    var email = req.body.custemail;
    var pass = req.body.custpassword;
    var status = req.body.status;
    console.log(email);
    console.log(status);
    console.log(pass);
    mysqlConnection.query('update login set custemail=?, custpassword =?, status = ? where custemail = ?', [email, pass, status, email], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Login data updated ..!!' });

        } else {
            console.log(error);
        }
    });
});

router1.delete('/login/:custemail', (req, res) => {
    var custemail = req.params.custemail;
    console.log(custemail);
    mysqlConnection.query('delete from login where custemail =?', [custemail], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Login record deleted ...!!' });
        } else {
            console.log(error);
        }
    });
})

module.exports = router1;