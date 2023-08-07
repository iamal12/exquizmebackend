const express = require('express');
const router11 = express.Router();
const mysqlConnection = require('../database/database');

// Get all players
router11.get('/players', (req, res) => {
    mysqlConnection.query('SELECT * FROM players', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Get player by ID
router11.get('/players/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('SELECT * FROM players WHERE player_id = ?', [id], (error, rows, fields) => {
        if (!error) {
            if (rows.length === 0) {
                res.status(404).json({ error: 'Player not found' });
            } else {
                res.json(rows[0]);
            }
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Create a new player
router11.post('/players', (req, res) => {
    const { name, email, user_id } = req.body;

    mysqlConnection.query('INSERT INTO players (name, email, user_id) VALUES (?, ?, ?)',
        [name, email, user_id],
        (error, result) => {
            if (!error) {
                res.status(201).json({ message: 'Player created successfully', player_id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Update player by ID
router11.put('/players/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, user_id } = req.body;

    mysqlConnection.query('UPDATE players SET name = ?, email = ?, user_id = ? WHERE player_id = ?',
        [name, email, user_id, id],
        (error, result) => {
            if (!error) {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Player not found' });
                } else {
                    res.json({ message: 'Player updated successfully' });
                }
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Delete player by ID
router11.delete('/players/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM players WHERE player_id = ?', [id], (error, result) => {
        if (!error) {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Player not found' });
            } else {
                res.json({ message: 'Player deleted successfully' });
            }
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

module.exports = router11;
