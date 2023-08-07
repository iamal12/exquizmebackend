var Router = require('express');
const router4 = Router();

const mysqlConnection = require('../database/database');

router4.get('/', async(req, res) => {
    res.status(200).json('Server is on and database is connected..!!!');
});

router4.get('/:order', async(req, res) => {
    mysqlConnection.query('select * from orderdb;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router4.get('/:order/:orderid', async(req, res) => {
    var orderid = req.params.orderid;
    console.log(deliveryid);
    mysqlConnection.query('select * from orderdb where orderid=? ;', [orderid], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
            console.log(rows);

        } else {
            console.log(error);
        }
    });
});

router4.get('/:order/orderid/:custid', async(req, res) => {
    var custid = req.params.custid;
    console.log(custid);
    mysqlConnection.query('select * from orderdb where custid=? ;', [custid], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
            console.log(rows);

        } else {
            console.log(error);
        }
    });
});

router4.get('/order/orderid/:custid/:datetime',async(req,res) => {
    var custid = req.params.custid;
    var datetime = req.params.datetime;
    mysqlConnection.query('select * from orderdb where custid =? and ordertime = ?',[custid,datetime],(error,rows,fields) => {
        if(!error){
            res.json(rows);
            console.log(rows);
        }
        else{
            res.send(error);
            console.log(rows);
        }
    });
});


router4.post('/:order', (req, res) => {
    var orderid = req.body.orderid;
    var custid = req.body.custid;
    var items = req.body.items;
    var totalamount = req.body.totalamount;
    var payment_type = req.body.payment_type;
    var ordertime = req.body.ordertime;
    var delivery_type = req.body.delivery_type;
    var isreceived = req.body.isreceived;
    console.log(orderid);
    console.log(custid);
    console.log(items);
    console.log(totalamount);
    console.log(payment_type);
    console.log(ordertime);
    console.log(delivery_type);
    console.log(isreceived);
    mysqlConnection.query('insert into orderdb values(?,?,?,?,?,?,?,?);', [orderid, custid, items, totalamount, payment_type, ordertime, delivery_type, isreceived], (error, rows, fields) => {
        if (!error) {
            //res.json({ Status: 'Customer registered ..!!' });
            res.send('Order record inserted successfully...!!!')

        } else {
            console.log(res.statusCode);
            console.log(error);
            res.send(error);
        }
    });

});

router4.put('/order/:orderid/:isreceived', (req, res) => {
    var orderid = req.body.orderid;
    var status = req.body.isreceived;
    console.log(status);
    mysqlConnection.query('update orderdb set isreceived=? where orderid = ?', [status, orderid], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Order data updated ..!!' });

        } else {
            console.log(error);
        }
    });
});


router4.delete('/menu', (req, res) => {
    var itemname = req.body.itemname;
    console.log(custid);
    mysqlConnection.query('delete from menu where itemname =?', [itemname], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Menu item deleted ...!!' });
        } else {
            console.log(error);
        }
    });
});


module.exports = router4;