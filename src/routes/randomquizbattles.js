const express = require('express');
const router14 = express.Router();
const mysqlConnection = require('../database/database');

/**
 * @swagger
 * /quiz_battles:
 *   post:
 *     summary: Create a new random quiz battle.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *               user1_id:
 *                 type: integer
 *               user2_id:
 *                 type: integer
 *             required:
 *               - category_id
 *               - user1_id
 *               - user2_id
 *     responses:
 *       201:
 *         description: Quiz battle created successfully.
 */
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

/**
 * @swagger
 * /quiz_battles/{id}:
 *   get:
 *     summary: Get a quiz battle by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quiz battle ID
 *     responses:
 *       200:
 *         description: Successfully retrieved quiz battle.
 *       404:
 *         description: Quiz battle not found.
 */
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

/**
 * @swagger
 * /quiz_battles/{id}:
 *   put:
 *     summary: Update the status and winner of a quiz battle.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quiz battle ID
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
 *         description: Quiz battle updated successfully.
 *       404:
 *         description: Quiz battle not found.
 */
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

/**
 * @swagger
 * /quiz_battles/{id}:
 *   delete:
 *     summary: Delete a quiz battle by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quiz battle ID
 *     responses:
 *       200:
 *         description: Quiz battle deleted successfully.
 *       404:
 *         description: Quiz battle not found.
 */
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

/**
 * @swagger
 * /quiz_battles:
 *   get:
 *     summary: Get all quiz battles.
 *     responses:
 *       200:
 *         description: Successfully retrieved quiz battles.
 */
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
