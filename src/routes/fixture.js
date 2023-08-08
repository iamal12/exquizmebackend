const express = require('express');
const router13 = express.Router();
const mysqlConnection = require('../database/database');

// Create a new fixture
/**
 * @swagger
 * tags:
 *   name: Fixtures
 *   description: Fixture management endpoints
 */

/**
 * @swagger
 * /api/fixtures:
 *   post:
 *     summary: Create a new fixture
 *     tags: [Fixtures]
 *     requestBody:
 *       description: Fixture data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               round_id:
 *                 type: integer
 *               player1_id:
 *                 type: integer
 *               player2_id:
 *                 type: integer
 *               player1_score:
 *                 type: integer
 *               player2_score:
 *                 type: integer
 *             example:
 *               round_id: 1
 *               player1_id: 123
 *               player2_id: 456
 *               player1_score: 3
 *               player2_score: 2
 *     responses:
 *       '201':
 *         description: Fixture created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Fixture created successfully
 *               fixture_id: 789
 *       '500':
 *         description: Internal Server Error
 */

router13.post('/fixtures', (req, res) => {
    const { round_id, player1_id, player2_id, player1_score, player2_score } = req.body;

    mysqlConnection.query(
        'INSERT INTO fixture (round_id, player1_id, player2_id, player1_score, player2_score) VALUES (?, ?, ?, ?, ?)',
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
/**
 * @swagger
 * /api/fixtures:
 *   get:
 *     summary: Get all fixtures
 *     tags: [Fixtures]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fixture'
 *       '500':
 *         description: Internal Server Error
 */
router13.get('/fixtures', (req, res) => {
    mysqlConnection.query('SELECT * FROM fixture', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Get fixture by ID
/**
 * @swagger
 * /api/fixtures/{id}:
 *   get:
 *     summary: Get fixture by ID
 *     tags: [Fixtures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Fixture ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fixture'
 *       '404':
 *         description: Fixture not found
 *       '500':
 *         description: Internal Server Error
 */
router13.get('/fixtures/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('SELECT * FROM fixture WHERE fixture_id = ?', [id], (error, rows, fields) => {
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
/**
 * @swagger
 * /api/fixtures/{id}:
 *   put:
 *     summary: Update fixture by ID
 *     tags: [Fixtures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Fixture ID
 *     requestBody:
 *       description: Updated fixture data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fixture'
 *     responses:
 *       '200':
 *         description: Fixture updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Fixture updated successfully
 *       '404':
 *         description: Fixture not found
 *       '500':
 *         description: Internal Server Error
 */

router13.put('/fixtures/:id', (req, res) => {
    const id = req.params.id;
    const { round_id, player1_id, player2_id, player1_score, player2_score } = req.body;

    mysqlConnection.query(
        'UPDATE fixture SET round_id=?, player1_id=?, player2_id=?, player1_score=?, player2_score=? WHERE fixture_id=?',
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
/**
 * @swagger
 * /api/fixtures/{id}:
 *   delete:
 *     summary: Delete fixture by ID
 *     tags: [Fixtures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Fixture ID
 *     responses:
 *       '200':
 *         description: Fixture deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Fixture deleted successfully
 *       '404':
 *         description: Fixture not found
 *       '500':
 *         description: Internal Server Error
 */

router13.delete('/fixtures/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM fixture WHERE fixture_id = ?', [id], (error, result) => {
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
