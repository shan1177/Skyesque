const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// mysql connection
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root', // mysql username
	password: 'root123', // mysql password
	database: 'weather', // database name
});

// Connect to MySQL
connection.connect(err => {
	if (err) {
		console.error('Error connecting to MySQL: ' + err.stack);
		return;
	}
	console.log('Connected to MySQL as id ' + connection.threadId);
});

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: true }));

// GET route for serving index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'madurai.html'));
});

// POST route for handling login
app.post('/login', (req, res) => {
	const { username, password } = req.body;
	const query = 'SELECT * FROM signup WHERE user_name = ? AND password = ?';

	connection.query(query, [username, password], (error, results, fields) => {
		if (error) {
			console.error('Error executing query: ' + error);
			res.status(500).send('Internal Server Error');
			return;
		}

		if (results.length > 0) {
			// If username and password match, redirect to student.html
			res.redirect('/madurai.html');
		} else {
			// If username and password don't match, redirect back to login page
			res.redirect('/');
		}
	});
});

app.listen(port, () => {
	console.log(`Server is running on port http://localhost:${port}`);
});