var Router = require('express');
const router7 = Router();

const mysqlConnection = require('../database/database');

router7.get('/', (req, res) => {
    res.status(200).json('Server is on and database is connected..!!!');
});

router7.get('/:employee', (req, res) => {
    mysqlConnection.query('select * from employee;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router7.get('/:employee/:empname', (req, res) => {
    var empname = req.params.empname;
    console.log(custname);
    mysqlConnection.query('select * from employee where empname = ?;',[empname], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router7.get('/employee/:empemail/:empdesignation', (req, res) => {
    var email = req.params.empemail;
    var empdesignation = req.params.empdesignation;
    console.log(email);
    console.log(password);
    mysqlConnection.query('select * from employee where empemail = ? and empdesignation =? ;', [email, empdesignation], (error, rows, fields) => {
        if (!error) {
            if(rows.length==0){
                res.send("NO entries");
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

router7.get('/employee/empid/:empemail/:emppassword', (req, res) => {
    var email = req.params.empemail;
    var emppassword = req.params.emppassword;
    console.log(email);
    console.log(emppassword);
    mysqlConnection.query('select * from employee where empemail = ? and emppassword =? ;', [email, emppassword], (error, rows, fields) => {
        if (!error) {
            if(rows.length==0){
                res.send("NO entries");
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

router7.post('/:employee', (req, res) => {
    var id = req.body.empid;
    var name = req.body.empname;
    var phone = req.body.empphoneno;
    var email = req.body.empemail;
    var password = req.body.emppassword
    var designation = req.body.empdesignation;
    var salary = req.body.empsalary;
    console.log(id);
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(designation);
    console.log(salary);
    mysqlConnection.query('insert into employee values(?,?,?,?,?,?,?);', [id, name, phone, email,password, designation,salary], (error, rows, fields) => {
        if (!error) {
            //res.json({ Status: 'Customer registered ..!!' });
            res.send('Employee Registered successfully...!!!')

        } else {
            console.log(res.statusCode);
            console.log(error);
            res.send("Duplicate entries..!!!");
        }
    });

});

router7.put('/:employee', (req, res) => {
    var name = req.body.empname;
    var phone = req.body.empphoneno;
    var email = req.body.empemail;
    var password = req.body.emppassword;
    var designation = req.body.empdesignation;
    var salary = req.body.empsalary;
    //console.log(id);
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(password);
    console.log(designation);
    console.log(salary);
    mysqlConnection.query('update employee set empemail=?, emppassword=?, empphoneno =?, empdesignation =? , empsalary=? where empname = ?', [email,password, phone, designation,salary, name], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'employee data updated ..!!' });

        } else {
            console.log(error);
        }
    });
});

router7.delete('/employee/:empname', (req, res) => {
    var empname = req.body.empname;
    console.log(empname);
    mysqlConnection.query('delete from employee where empname =?', [empname], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Employee record deleted ...!!' });
        } else {
            console.log(error);
        }
    });
})

module.exports = router7;