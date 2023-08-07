var Router = require('express');
const router5 = Router();

const mysqlConnection = require('../database/database');

router5.get('/', async(req, res) => {
    res.status(200).json('Server is on and database is connected..!!!');
});


router5.get('/:cart/:custid', async(req, res) => {
    var custid = req.params.custid;
    console.log(custid);
    mysqlConnection.query('select * from cart where custid=? ;', [custid], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
            console.log(rows);

        } else {
            console.log(error);
        }
    });
});

router5.get('/:cart/:custid/:itemid', async(req, res) => {
    var itemid = req.params.itemid;
    var custid = req.params.custid;
    console.log(itemid);
    mysqlConnection.query('select * from cart where itemid=? and custid=? ;', [itemid,custid], (error, rows, fields) => {
        if (!error) {
            
            res.json(rows);
            console.log(rows);

        } else {
            console.log(error);
        }
    });
});


router5.post('/:cart', (req, res) => {
    var custid = req.body.custid;
    var itemid = req.body.itemid;
    var itemname = req.body.itemname;
    var itemimage = req.body.itemimage;
    var itemprice = req.body.itemprice;
    var itemquantity = req.body.itemquantity;
    var totalamount = req.body.totalamount;
    console.log(custid);
    console.log(itemid);
    console.log(itemname);
    console.log(itemimage);
    console.log(itemprice);
    console.log(itemquantity);
    console.log(totalamount);
    mysqlConnection.query('insert into cart values(?,?,?,?,?,?,?);', [custid, itemid, itemname, itemimage, itemprice, itemquantity, totalamount], (error, rows, fields) => {
        if (!error) {
            //res.json({ Status: 'Customer registered ..!!' });
            res.send('cart record inserted successfully...!!!')

        } else {
            console.log(res.statusCode);
            console.log(error);
            res.send("Duplicate entries..!!!");
        }
    });

});

router5.put('/:cart', (req, res) => {
    var custid = req.body.custid;
    var itemid = req.body.itemid;
    var itemprice = req.body.itemprice;
    var itemquantity = req.body.itemquantity;
    var totalamount = req.body.totalamount;
    console.log(custid);
    console.log(itemid);
    console.log(itemprice);
    console.log(itemquantity);
    console.log(totalamount);
    mysqlConnection.query('update cart set itemprice = ?, itemquantity=?, totalamount=? where itemid = ? and custid=?', [itemprice,itemquantity,totalamount, itemid,custid], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Cart data updated ..!!' });

        } else {
            console.log(error);
        }
    });
});


router5.delete('/:cart/delete/:custid/:itemid', (req, res) => {
    var itemid = req.params.itemid;
    var custid = req.params.custid;
    console.log(custid);
    console.log(itemid);
    mysqlConnection.query('delete from cart where custid =? and itemid=?', [ custid,itemid], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Cart item deleted ...!!' });
        } else {
            console.log(error);
        }
    });
})

module.exports = router5;