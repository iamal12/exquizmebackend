const Router = require('express');
const router10 = Router();

const mysqlConnection = require('../database/database');

// Get all quiz room participants
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

// Get quiz room participant by ID
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

// Edit quiz room participant
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

// Delete quiz room participant by ID
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
