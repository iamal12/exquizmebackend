var Router = require('express');
const router = Router();

const mysqlConnection = require('../database/database');

router.get('/', (req, res) => {
    res.status(200).json('Server is on and database is connected..!!!');
});

router.get('/:customer', (req, res) => {
    mysqlConnection.query('select * from customer;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router.get('/:customer/:custname', (req, res) => {
    var custname = req.params.custname;
    console.log(custname);
    mysqlConnection.query('select * from customer where name = ?;',[custname], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router.get('/customer/:custemail/:custpassword', (req, res) => {
    var email = req.params.custemail;
    var password = req.params.custpassword;
    console.log(email);
    console.log(password);
    mysqlConnection.query('select * from customer where email =? and pass =? ;', [email, password], (error, rows, fields) => {
        if (!error) {
            if(rows.length==0){
                res.json("NO entries");
                console.log("no entries");
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


router.post('/:customer', (req, res) => {
    var id = req.body.custid;
    var name = req.body.custname;
    var email = req.body.custemail;
    var phone = req.body.custphoneno;
    var pass = req.body.custpassword;
    console.log(id);
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(pass);
    mysqlConnection.query('insert into customer values(?,?,?,?,?);', [id, name, email, phone, pass], (error, rows, fields) => {
        if (!error) {
            //res.json({ Status: 'Customer registered ..!!' });
            res.send('Customer Registered successfully...!!!')

        } else {
            console.log(res.statusCode);
            console.log(error);
            res.send('Duplicate entries..!!!');
        }
    });

});

router.put('/:customer', (req, res) => {
    var name = req.body.custname;
    var email = req.body.custemail;
    var phone = req.body.custphoneno;
    var pass = req.body.custpassword;
    //console.log(id);
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(pass);
    mysqlConnection.query('update customer set custemail=?, custphoneno =?, custpassword =? where custname = ?', [email, phone, pass, name], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Customer data updated ..!!' });

        } else {
            console.log(error);
        }
    });
});

router.delete('/customer', (req, res) => {
    var custid = req.body.custid;
    console.log(custid);
    mysqlConnection.query('delete from customer where custid =?', [custid], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Customer record deleted ...!!' });
        } else {
            console.log(error);
        }
    });
})

module.exports = router;
