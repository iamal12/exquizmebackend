const express = require('express');
const router11 = express.Router();
const mysqlConnection = require('../database/database');

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get all players.
 *     responses:
 *       200:
 *         description: Successfully retrieved players.
 */
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

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Get a player by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Successfully retrieved player.
 *       404:
 *         description: Player not found.
 */
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

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Create a new player.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               user_id:
 *                 type: integer
 *             required:
 *               - name
 *               - email
 *               - user_id
 *     responses:
 *       201:
 *         description: Player created successfully.
 */
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

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Update a player by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Player ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               user_id:
 *                 type: integer
 *             required:
 *               - name
 *               - email
 *               - user_id
 *     responses:
 *       200:
 *         description: Player updated successfully.
 */
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

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Delete a player by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Player ID
 *     responses:
 *       200:
 *         description: Player deleted successfully.
 *       404:
 *         description: Player not found.
 */
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
