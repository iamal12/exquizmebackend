const express = require('express');
const router14 = express.Router();
const mysqlConnection = require('../database/database');

// Create a new random quiz battle
router14.post('/quiz_battles', (req, res) => {
    const { category_id, user1_id, user2_id } = req.body;

    mysqlConnection.query(
        'INSERT INTO quiz_battles (category_id, user1_id, user2_id) VALUES (?, ?, ?)',
        [category_id, user1_id, user2_id],
        (error, result) => {
            if (!error) {
                res.status(201).json({ message: 'Quiz battle created successfully', battle_id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Get a quiz battle by ID
router14.get('/quiz_battles/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
        'SELECT * FROM quiz_battles WHERE battle_id = ?',
        [id],
        (error, rows, fields) => {
            if (!error) {
                if (rows.length === 0) {
                    res.status(404).json({ error: 'Quiz battle not found' });
                } else {
                    res.json(rows[0]);
                }
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Update the status and winner of a quiz battle
router14.put('/quiz_battles/:id', (req, res) => {
    const id = req.params.id;
    const { status, winner_id } = req.body;

    mysqlConnection.query(
        'UPDATE quiz_battles SET status = ?, winner_id = ? WHERE battle_id = ?',
        [status, winner_id, id],
        (error, result) => {
            if (!error) {
                res.json({ message: 'Quiz battle updated successfully' });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Delete a quiz battle by ID
router14.delete('/quiz_battles/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
        'DELETE FROM quiz_battles WHERE battle_id = ?',
        [id],
        (error, result) => {
            if (!error) {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Quiz battle not found' });
                } else {
                    res.json({ message: 'Quiz battle deleted successfully' });
                }
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Get all quiz battles
router14.get('/quiz_battles', (req, res) => {
    mysqlConnection.query('SELECT * FROM quiz_battles', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

module.exports = router14;
