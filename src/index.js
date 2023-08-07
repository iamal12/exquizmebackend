const express = require('express');
const app = express();
const cors = require('cors');
const login = require('./routes/login');
const customer = require('./routes/customer');
const menu = require('./routes/menu');
const delivery = require('./routes/delivery');
const orderdb = require('./routes/orderdb');
const cart = require('./routes/cart');
const employee = require('./routes/employee');

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/login', login);
app.use('/customer', customer);
app.use('/menu', menu);
app.use('/orderdb', orderdb);
app.use('/delivery', delivery);
app.use('/cart', cart);
app.use('/employee', employee);

// Starting the server
const port = 5040; // Set your desired port number here
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
