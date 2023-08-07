const express = require('express');
const router13 = express.Router();
const mysqlConnection = require('../database/database');

// Create a new fixture
router13.post('/fixtures', (req, res) => {
    const { round_id, player1_id, player2_id, player1_score, player2_score } = req.body;

    mysqlConnection.query(
        'INSERT INTO Fixture (round_id, player1_id, player2_id, player1_score, player2_score) VALUES (?, ?, ?, ?, ?)',
        [round_id, player1_id, player2_id, player1_score, player2_score],
        (error, result) => {
            if (!error) {
                res.status(201).json({ message: 'Fixture created successfully', fixture_id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Get all fixtures
router13.get('/fixtures', (req, res) => {
    mysqlConnection.query('SELECT * FROM Fixture', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Get fixture by ID
router13.get('/fixtures/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('SELECT * FROM Fixture WHERE fixture_id = ?', [id], (error, rows, fields) => {
        if (!error) {
            if (rows.length === 0) {
                res.status(404).json({ error: 'Fixture not found' });
            } else {
                res.json(rows[0]);
            }
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Update fixture by ID
router13.put('/fixtures/:id', (req, res) => {
    const id = req.params.id;
    const { round_id, player1_id, player2_id, player1_score, player2_score } = req.body;

    mysqlConnection.query(
        'UPDATE Fixture SET round_id=?, player1_id=?, player2_id=?, player1_score=?, player2_score=? WHERE fixture_id=?',
        [round_id, player1_id, player2_id, player1_score, player2_score, id],
        (error, result) => {
            if (!error) {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Fixture not found' });
                } else {
                    res.json({ message: 'Fixture updated successfully' });
                }
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Delete fixture by ID
router13.delete('/fixtures/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM Fixture WHERE fixture_id = ?', [id], (error, result) => {
        if (!error) {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Fixture not found' });
            } else {
                res.json({ message: 'Fixture deleted successfully' });
            }
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

module.exports = router13;
