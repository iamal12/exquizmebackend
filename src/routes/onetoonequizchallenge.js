const express = require('express');
const router15 = express.Router();
const mysqlConnection = require('../database/database');

// Create a new one-to-one quiz challenge
router15.post('/onetoquizchallenges', (req, res) => {
    const { challenger_id, opponent_id, category_id } = req.body;

    mysqlConnection.query(
        'INSERT INTO onetoquizchallenges (challenger_id, opponent_id, category_id, status) VALUES (?, ?, ?, "pending")',
        [challenger_id, opponent_id, category_id],
        (error, result) => {
            if (!error) {
                res.status(201).json({ message: 'One-to-one quiz challenge created successfully', battle_id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Get a one-to-one quiz challenge by ID
router15.get('/onetoquizchallenges/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
        'SELECT * FROM onetoquizchallenges WHERE battle_id = ?',
        [id],
        (error, rows, fields) => {
            if (!error) {
                if (rows.length === 0) {
                    res.status(404).json({ error: 'One-to-one quiz challenge not found' });
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

// Update the status and winner of a one-to-one quiz challenge
router15.put('/onetoquizchallenges/:id', (req, res) => {
    const id = req.params.id;
    const { status, winner_id } = req.body;

    mysqlConnection.query(
        'UPDATE onetoquizchallenges SET status = ?, winner_id = ? WHERE battle_id = ?',
        [status, winner_id, id],
        (error, result) => {
            if (!error) {
                res.json({ message: 'One-to-one quiz challenge updated successfully' });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Delete a one-to-one quiz challenge by ID
router15.delete('/onetoquizchallenges/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
        'DELETE FROM onetoquizchallenges WHERE battle_id = ?',
        [id],
        (error, result) => {
            if (!error) {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'One-to-one quiz challenge not found' });
                } else {
                    res.json({ message: 'One-to-one quiz challenge deleted successfully' });
                }
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Get all one-to-one quiz challenges
router15.get('/onetoquizchallenges', (req, res) => {
    mysqlConnection.query('SELECT * FROM onetoquizchallenges', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

module.exports = router15;
