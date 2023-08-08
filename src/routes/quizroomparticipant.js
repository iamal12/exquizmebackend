const Router = require('express');
const router10 = Router();
const mysqlConnection = require('../database/database');

/**
 * @swagger
 * /quizroomparticipants:
 *   get:
 *     summary: Get all quiz room participants.
 *     responses:
 *       200:
 *         description: Successfully retrieved quiz room participants.
 */
router10.get('/quizroomparticipants', (req, res) => {
    mysqlConnection.query('SELECT * FROM quizRoomParticipant', (error, rows, fields) => {
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
 * /quizroomparticipants:
 *   post:
 *     summary: Create a new quiz room participant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *             required:
 *               - room_id
 *               - user_id
 *     responses:
 *       201:
 *         description: Quiz room participant created successfully.
 */
router10.post('/quizroomparticipants', (req, res) => {
    const { room_id, user_id } = req.body;

    mysqlConnection.query('INSERT INTO quizRoomParticipant (room_id, user_id) VALUES (?, ?)',
        [room_id, user_id],
        (error, result) => {
            if (!error) {
                res.status(201).json({ message: 'Quiz room participant created successfully', participant_id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

/**
 * @swagger
 * /quizroomparticipants/{id}:
 *   get:
 *     summary: Get a quiz room participant by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quiz room participant ID
 *     responses:
 *       200:
 *         description: Successfully retrieved quiz room participant.
 *       404:
 *         description: Quiz room participant not found.
 */
router10.get('/quizroomparticipants/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('SELECT * FROM quizRoomParticipant WHERE participant_id = ?', [id], (error, rows, fields) => {
        if (!error) {
            if (rows.length === 0) {
                res.status(404).json({ error: 'Quiz room participant not found' });
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
 * /quizroomparticipants/{id}:
 *   put:
 *     summary: Edit a quiz room participant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quiz room participant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *             required:
 *               - room_id
 *               - user_id
 *     responses:
 *       200:
 *         description: Quiz room participant updated successfully.
 *       404:
 *         description: Quiz room participant not found.
 */
router10.put('/quizroomparticipants/:id', (req, res) => {
    const id = req.params.id;
    const { room_id, user_id } = req.body;

    mysqlConnection.query('UPDATE quizRoomParticipant SET room_id = ?, user_id = ? WHERE participant_id = ?',
        [room_id, user_id, id],
        (error, result) => {
            if (!error) {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Quiz room participant not found' });
                } else {
                    res.json({ message: 'Quiz room participant updated successfully' });
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
 * /quizroomparticipants/{id}:
 *   delete:
 *     summary: Delete a quiz room participant by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quiz room participant ID
 *     responses:
 *       200:
 *         description: Quiz room participant deleted successfully.
 *       404:
 *         description: Quiz room participant not found.
 */
router10.delete('/quizroomparticipants/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM quizRoomParticipant WHERE participant_id = ?', [id], (error, result) => {
        if (!error) {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Quiz room participant not found' });
            } else {
                res.json({ message: 'Quiz room participant deleted successfully' });
            }
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

module.exports = router10;
