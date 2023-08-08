const express = require('express');
const router15 = express.Router();
const mysqlConnection = require('../database/database');

/**
 * @swagger
 * /onetoquizchallenges:
 *   post:
 *     summary: Create a new one-to-one quiz challenge.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               challenger_id:
 *                 type: integer
 *               opponent_id:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *             required:
 *               - challenger_id
 *               - opponent_id
 *               - category_id
 *     responses:
 *       201:
 *         description: One-to-one quiz challenge created successfully.
 */
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

/**
 * @swagger
 * /onetoquizchallenges/{id}:
 *   get:
 *     summary: Get a one-to-one quiz challenge by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: One-to-one quiz challenge ID
 *     responses:
 *       200:
 *         description: Successfully retrieved one-to-one quiz challenge.
 *       404:
 *         description: One-to-one quiz challenge not found.
 */
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

/**
 * @swagger
 * /onetoquizchallenges/{id}:
 *   put:
 *     summary: Update the status and winner of a one-to-one quiz challenge.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: One-to-one quiz challenge ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               winner_id:
 *                 type: integer
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: One-to-one quiz challenge updated successfully.
 */
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

/**
 * @swagger
 * /onetoquizchallenges/{id}:
 *   delete:
 *     summary: Delete a one-to-one quiz challenge by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: One-to-one quiz challenge ID
 *     responses:
 *       200:
 *         description: One-to-one quiz challenge deleted successfully.
 *       404:
 *         description: One-to-one quiz challenge not found.
 */
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

/**
 * @swagger
 * /onetoquizchallenges:
 *   get:
 *     summary: Get all one-to-one quiz challenges.
 *     responses:
 *       200:
 *         description: Successfully retrieved one-to-one quiz challenges.
 */
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
