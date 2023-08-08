var Router = require('express');
const router = Router();

const mysqlConnection = require('../database/database');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check server status and database connection.
 *     responses:
 *       200:
 *         description: Server is on and database is connected.
 */
router.get('/', (req, res) => {
    res.status(200).json('Server is on and database is connected..!!!');
});

/**
 * @swagger
 * /customer:
 *   get:
 *     summary: Get all customer records.
 *     responses:
 *       200:
 *         description: Successfully retrieved customer records.
 */
router.get('/customer', (req, res) => {
    mysqlConnection.query('select * from customer;', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
        }
    });
});

/**
 * @swagger
 * /customer/{custname}:
 *   get:
 *     summary: Get customer record by name.
 *     parameters:
 *       - in: path
 *         name: custname
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer name
 *     responses:
 *       200:
 *         description: Successfully retrieved customer record.
 */
router.get('/customer/:custname', (req, res) => {
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

/**
 * @swagger
 * /customer/{custemail}/{custpassword}:
 *   get:
 *     summary: Get customer record by email and password.
 *     parameters:
 *       - in: path
 *         name: custemail
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer email
 *       - in: path
 *         name: custpassword
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer password
 *     responses:
 *       200:
 *         description: Successfully retrieved customer record.
 *       404:
 *         description: No entries found.
 */
router.get('/customer/:custemail/:custpassword', (req, res) => {
    var email = req.params.custemail;
    var password = req.params.custpassword;
    console.log(email);
    console.log(password);
    mysqlConnection.query('select * from customer where email =? and pass =? ;', [email, password], (error, rows, fields) => {
        if (!error) {
            if (rows.length == 0) {
                res.json("NO entries");
                console.log("no entries");
            } else {
                res.json(rows);
                console.log(rows);
            }
        } else {
            console.log(error);
        }
    });
});

/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Register a new customer record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custid:
 *                 type: integer
 *               custname:
 *                 type: string
 *               custemail:
 *                 type: string
 *               custphoneno:
 *                 type: string
 *               custpassword:
 *                 type: string
 *             required:
 *               - custid
 *               - custname
 *               - custemail
 *               - custphoneno
 *               - custpassword
 *     responses:
 *       200:
 *         description: Customer record registered successfully.
 *       409:
 *         description: Duplicate entries.
 */
router.post('/customer', (req, res) => {
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
            res.send('Customer Registered successfully...!!!');
        } else {
            console.log(res.statusCode);
            console.log(error);
            res.send('Duplicate entries..!!!');
        }
    });
});

/**
 * @swagger
 * /customer:
 *   put:
 *     summary: Update a customer record by name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custname:
 *                 type: string
 *               custemail:
 *                 type: string
 *               custphoneno:
 *                 type: string
 *               custpassword:
 *                 type: string
 *             required:
 *               - custname
 *     responses:
 *       200:
 *         description: Customer data updated successfully.
 */
router.put('/customer', (req, res) => {
    var name = req.body.custname;
    var email = req.body.custemail;
    var phone = req.body.custphoneno;
    var pass = req.body.custpassword;
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(pass);
    mysqlConnection.query('update customer set email=?, phone =?, pass =? where name = ?', [email, phone, pass, name], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Customer data updated ..!!' });
        } else {
            console.log(error);
        }
    });
});

/**
 * @swagger
 * /customer:
 *   delete:
 *     summary: Delete a customer record by ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custid:
 *                 type: integer
 *             required:
 *               - custid
 *     responses:
 *       200:
 *         description: Customer record deleted successfully.
 */
router.delete('/customer', (req, res) => {
    var custid = req.body.custid;
    console.log(custid);
    mysqlConnection.query('delete from customer where id =?', [custid], (error, rows, fields) => {
        if (!error) {
            res.json({ Status: 'Customer record deleted ...!!' });
        } else {
            console.log(error);
        }
    });
});

module.exports = router;
