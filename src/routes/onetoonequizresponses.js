const express = require('express');
const router16 = express.Router();
const mysqlConnection = require('../database/database');

/**
 * @swagger
 * /onetoquizresponses:
 *   post:
 *     summary: Create a new one-to-one quiz response.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               battle_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               question_id:
 *                 type: integer
 *               selected_option:
 *                 type: string
 *             required:
 *               - battle_id
 *               - user_id
 *               - question_id
 *               - selected_option
 *     responses:
 *       201:
 *         description: One-to-one quiz response created successfully.
 */
router16.post('/onetoquizresponses', (req, res) => {
    const { battle_id, user_id, question_id, selected_option } = req.body;

    mysqlConnection.query(
        'INSERT INTO onetoQuizResponses (battle_id, user_id, question_id, selected_option) VALUES (?, ?, ?, ?)',
        [battle_id, user_id, question_id, selected_option],
        (error, result) => {
            if (!error) {
                res.status(201).json({ message: 'One-to-one quiz response created successfully', response_id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

/**
 * @swagger
 * /onetoquizresponses/{id}:
 *   get:
 *     summary: Get a one-to-one quiz response by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: One-to-one quiz response ID
 *     responses:
 *       200:
 *         description: Successfully retrieved one-to-one quiz response.
 *       404:
 *         description: One-to-one quiz response not found.
 */
router16.get('/onetoquizresponses/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
        'SELECT * FROM onetoQuizResponses WHERE response_id = ?',
        [id],
        (error, rows, fields) => {
            if (!error) {
                if (rows.length === 0) {
                    res.status(404).json({ error: 'One-to-one quiz response not found' });
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
 * /onetoquizresponses/{id}:
 *   put:
 *     summary: Update a one-to-one quiz response.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: One-to-one quiz response ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               battle_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               question_id:
 *                 type: integer
 *               selected_option:
 *                 type: string
 *             required:
 *               - battle_id
 *               - user_id
 *               - question_id
 *               - selected_option
 *     responses:
 *       200:
 *         description: One-to-one quiz response updated successfully.
 */
router16.put('/onetoquizresponses/:id', (req, res) => {
    const id = req.params.id;
    const { battle_id, user_id, question_id, selected_option } = req.body;

    mysqlConnection.query(
        'UPDATE onetoQuizResponses SET battle_id = ?, user_id = ?, question_id = ?, selected_option = ? WHERE response_id = ?',
        [battle_id, user_id, question_id, selected_option, id],
        (error, result) => {
            if (!error) {
                res.json({ message: 'One-to-one quiz response updated successfully' });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

/**
 * @swagger
 * /onetoquizresponses/{id}:
 *   delete:
 *     summary: Delete a one-to-one quiz response by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: One-to-one quiz response ID
 *     responses:
 *       200:
 *         description: One-to-one quiz response deleted successfully.
 *       404:
 *         description: One-to-one quiz response not found.
 */
router16.delete('/onetoquizresponses/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
        'DELETE FROM onetoQuizResponses WHERE response_id = ?',
        [id],
        (error, result) => {
            if (!error) {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'One-to-one quiz response not found' });
                } else {
                    res.json({ message: 'One-to-one quiz response deleted successfully' });
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
 * /onetoquizresponses:
 *   get:
 *     summary: Get all one-to-one quiz responses.
 *     responses:
 *       200:
 *         description: Successfully retrieved one-to-one quiz responses.
 */
router16.get('/onetoquizresponses', (req, res) => {
    mysqlConnection.query('SELECT * FROM onetoQuizResponses', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

module.exports = router16;
