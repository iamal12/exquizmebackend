const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Path to the generated Swagger JSON

const cors = require('cors');
const login = require('./routes/login');
const customer = require('./routes/customer');
const menu = require('./routes/menu');
const delivery = require('./routes/delivery');
const orderdb = require('./routes/orderdb');
const cart = require('./routes/cart');
const employee = require('./routes/employee');
const tournament = require('./routes/tournament.js');
const quizrooms = require('./routes/quizroom.js');
const quizroomparticipant = require('./routes/quizroomparticipant.js');
const playersRouter = require('./routes/player.js');
const rounds = require('./routes/rounds.js');
const fixtures = require('./routes/fixture.js');
const randomquizbattle = require('./routes/randomquizbattles.js');
const onetoonequizchallenge = require('./routes/onetoonequizchallenge.js');
const onetoonequizresponses = require('./routes/onetoonequizresponses.js');
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
app.use('/tournaments', tournament);
app.use('/quizrooms', quizrooms);
app.use('/quizroomparticipants', quizroomparticipant);
app.use('/players', playersRouter);
app.use('/rounds', rounds);
app.use('/fixtures', fixtures);
app.use('/quiz_battles', randomquizbattle);
app.use('/onetoquizchallenges', onetoonequizchallenge);
app.use('/onetoquizresponses', onetoonequizresponses);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Starting the server
const port = 3000; // Set your desired port number here
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
