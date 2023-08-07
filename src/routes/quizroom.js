const Router = require('express');
const router9 = Router();
const mysqlConnection = require('../database/database');

// Create a new quiz room
router9.post('/quizrooms', (req, res) => {
    const { room_name, creator_id, start_time, end_time, status, max_participants } = req.body;

    mysqlConnection.query(
        'INSERT INTO quizroom (room_name, creator_id, start_time, end_time, status, max_participants, current_participants) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [room_name, creator_id, start_time, end_time, status, max_participants, 0], // 0 for initial current_participants
        (error, result) => {
            if (!error) {
                res.status(201).json({ message: 'Quiz room created successfully', room_id: result.insertId });
            } else {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    );
});

// Get all quiz rooms
router9.get('/quizrooms', (req, res) => {
    mysqlConnection.query('SELECT * FROM quizroom', (error, rows, fields) => {
        if (!error) {
            res.json(rows);
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Get quiz room by ID
router9.get('/quizrooms/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('SELECT * FROM quizroom WHERE room_id = ?', [id], (error, rows, fields) => {
        if (!error) {
            if (rows.length === 0) {
                res.status(404).json({ error: 'Quiz room not found' });
            } else {
                res.json(rows[0]);
            }
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

// Delete a quiz room by ID
router9.delete('/quizrooms/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM quizroom WHERE room_id = ?', [id], (error, result) => {
        if (!error) {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Quiz room not found' });
            } else {
                res.json({ message: 'Quiz room deleted successfully' });
            }
        } else {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

module.exports = router9;
