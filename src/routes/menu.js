var Router = require('express');
const router2 = Router();

const mysqlConnection = require('../database/database');

router2.get('/', async(req, res) => {
    res.status(200).json('Server is on and database is connected..!!!');
});

router2.get('/:menu', async(req, res) => {
    mysqlConnection.query('select * from menu;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

router2.get('/:menu/:itemname', async(req, res) => {
    var itemname = req.params.itemname;
    console.log(itemname);
    mysqlConnection.query('select * from menu where itemname=? ;', [itemname], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
            console.log(rows);

        } else {
            console.log(error);
        }
    });
});

router2.get('/:menu/itemname/:itemcategory', async(req, res) => {
    var category = req.params.itemcategory;
    console.log(category);
    mysqlConnection.query('select * from menu where itemcategory=? ;', [category], (error, rows, fields) => {
        if (!error) {
            res.json(rows);
            console.log(rows);

        } else {
            console.log(error);
        }
    });
});

router2.post('/:menu', (req, res) => {
    var itemid = req.body.itemid;
    var itemname = req.body.itemname;
    var itemdesc = req.body.itemdesc;
    var itemcategory = req.body.itemcategory;
    var itemimage = req.body.itemimage;
    var itemprice = req.body.itemprice;
    console.log(itemid);
    console.log(itemname);
    console.log(itemdesc);
    console.log(itemcategory);
    console.log(itemimage);
    console.log(itemprice);
    mysqlConnection.query('insert into menu values(?,?,?,?,?,?);', [itemid, itemname, itemdesc, itemcategory, itemimage, itemprice], (error, rows, fields) => {
        if (!error) {
            //res.json({ Status: 'Customer registered ..!!' });
            res.send('Menu record inserted successfully...!!!')

        } else {
            console.log(res.statusCode);
            console.log(error);
            res.send("Duplicate entries..!!!");
        }
    });

});

router2.put('/:menu', (req, res) => {
    var itemid = req.body.itemid;
    var itemname = req.body.itemname;
    var itemdesc = req.body.itemdesc;
    var itemprice = req.body.itemprice;
    console.log(itemid);
    console.log(itemname);
    console.log(itemdesc);
    console.log(itemprice);
    mysqlConnection.query('update menu set itemname=?, itemdesc =?, itemprice = ? where itemid = ?', [itemname, itemdesc, itemprice, itemid], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Menu data updated ..!!' });

        } else {
            console.log(error);
        }
    });
});

router2.delete('/menu', (req, res) => {
    var itemname = req.body.itemname;
    console.log(custid);
    mysqlConnection.query('delete from menu where itemname =?', [itemname], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Menu item deleted ...!!' });
        } else {
            console.log(error);
        }
    });
})

module.exports = router2;