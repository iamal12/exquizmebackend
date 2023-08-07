const Router = require('express');
const router = Router();

const mysqlConnection = require('../database/database');

router.get('/', (req, res) => {
    res.status(200).json('Tournament API is working!');
});

// Get all tournaments
router.get('/tournaments', (req, res) => {
    mysqlConnection.query('SELECT * FROM tournaments', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Get tournament by ID
router.get('/tournaments/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('SELECT * FROM tournaments WHERE tournament_id = ?', [id], (error, rows, fields) => {
        if (!error) {
            if (rows.length === 0) {
                res.status(404).json({ error: 'Tournament not found' });
            } else {
                res.json(rows[0]);
            }
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Create a new tournament
router.post('/tournaments', (req, res) => {
    const { title, description, start_time, end_time, status, rounds, max_slots } = req.body;
    const filled_slots = 0; // Initialize filled_slots to 0 for a new tournament

    mysqlConnection.query('INSERT INTO tournaments (title, description, start_time, end_time, status, rounds, max_slots, filled_slots) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, start_time, end_time, status, rounds, max_slots, filled_slots],
        (error, result) => {
            if (!error) {
                res.status(201).json({ message: 'Tournament created successfully', tournament_id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Delete a tournament by ID
router.delete('/tournaments/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM tournaments WHERE tournament_id = ?', [id], (error, result) => {
        if (!error) {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Tournament not found' });
            } else {
                res.json({ message: 'Tournament deleted successfully' });
            }
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

module.exports = router;
