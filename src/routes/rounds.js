const express = require('express');
const router12 = express.Router();
const mysqlConnection = require('../database/database');

// Create a new round
router12.post('/rounds', (req, res) => {
    const { tournament_id, round_number } = req.body;

    mysqlConnection.query('INSERT INTO rounds (tournament_id, round_number, status) VALUES (?, ?, ?)',
        [tournament_id, round_number, 'Active'],
        (error, result) => {
            if (!error) {
                res.status(201).json({ message: 'Round created successfully', round_id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Get all rounds of a tournament
router12.get('/rounds/:tournament_id', (req, res) => {
    const tournament_id = req.params.tournament_id;

    mysqlConnection.query('SELECT * FROM rounds WHERE tournament_id = ?',
        [tournament_id],
        (error, rows, fields) => {
            if (!error) {
                res.json(rows);
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Update the status of a round
router12.put('/rounds/:round_id', (req, res) => {
    const round_id = req.params.round_id;
    const { status } = req.body;

    mysqlConnection.query('UPDATE rounds SET status = ? WHERE round_id = ?',
        [status, round_id],
        (error, result) => {
            if (!error) {
                res.json({ message: 'Round status updated successfully' });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Delete a round
router12.delete('/rounds/:round_id', (req, res) => {
    const round_id = req.params.round_id;

    mysqlConnection.query('DELETE FROM rounds WHERE round_id = ?',
        [round_id],
        (error, result) => {
            if (!error) {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Round not found' });
                } else {
                    res.json({ message: 'Round deleted successfully' });
                }
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

module.exports = router12;
