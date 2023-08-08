const express = require('express');
const router12 = express.Router();
const mysqlConnection = require('../database/database');

/**
 * @swagger
 * /rounds:
 *   post:
 *     summary: Create a new round.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournament_id:
 *                 type: integer
 *               round_number:
 *                 type: integer
 *             required:
 *               - tournament_id
 *               - round_number
 *     responses:
 *       201:
 *         description: Round created successfully.
 */
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

/**
 * @swagger
 * /rounds/{tournament_id}:
 *   get:
 *     summary: Get all rounds of a tournament.
 *     parameters:
 *       - in: path
 *         name: tournament_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tournament ID
 *     responses:
 *       200:
 *         description: Successfully retrieved rounds.
 */
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

/**
 * @swagger
 * /rounds/{round_id}:
 *   put:
 *     summary: Update the status of a round.
 *     parameters:
 *       - in: path
 *         name: round_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Round ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Round status updated successfully.
 *       404:
 *         description: Round not found.
 */
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

/**
 * @swagger
 * /rounds/{round_id}:
 *   delete:
 *     summary: Delete a round.
 *     parameters:
 *       - in: path
 *         name: round_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Round ID
 *     responses:
 *       200:
 *         description: Round deleted successfully.
 *       404:
 *         description: Round not found.
 */
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
