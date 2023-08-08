const Router = require('express');
const router8 = Router();
const mysqlConnection = require('../database/database');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check if the Tournament API is working.
 *     responses:
 *       200:
 *         description: Tournament API is working!
 */
router8.get('/', (req, res) => {
    res.status(200).json('Tournament API is working!');
});

/**
 * @swagger
 * /tournaments:
 *   get:
 *     summary: Get all tournaments.
 *     responses:
 *       200:
 *         description: Successfully retrieved tournaments.
 */
router8.get('/tournaments', (req, res) => {
    mysqlConnection.query('SELECT * FROM tournaments', (error, rows, fields) => {
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
 * /tournaments/{id}:
 *   get:
 *     summary: Get tournament by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tournament ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the tournament.
 *       404:
 *         description: Tournament not found.
 */
router8.get('/tournaments/:id', (req, res) => {
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

/**
 * @swagger
 * /tournaments:
 *   post:
 *     summary: Create a new tournament.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *               rounds:
 *                 type: integer
 *               max_slots:
 *                 type: integer
 *             required:
 *               - title
 *               - description
 *               - start_time
 *               - end_time
 *               - status
 *               - rounds
 *               - max_slots
 *     responses:
 *       201:
 *         description: Tournament created successfully.
 */
router8.post('/tournaments', (req, res) => {
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

/**
 * @swagger
 * /tournaments/{id}:
 *   delete:
 *     summary: Delete a tournament by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tournament ID
 *     responses:
 *       200:
 *         description: Tournament deleted successfully.
 *       404:
 *         description: Tournament not found.
 */
router8.delete('/tournaments/:id', (req, res) => {
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

module.exports = router8;
