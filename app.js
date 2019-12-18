// Import modules by creating variables and require their module
const express = require('express');
const app = express(); // Creating a new variable called 'app' that creates a new instance of express
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser'); 
const path = require('path'); // The path module provides utilities for working with file and directory paths
const component = require('./public/komponent'); // Node module to show info about Open-toilet data

// Using morgan to log info of the requests
app.use(morgan('common'));

// Application server is now serving all files in the "./public" directory. 
app.use(express.static('./public'))

// A piece of middleware that helps process requests easier. Example: Get data passed into a form 
app.use(bodyParser.urlencoded({extended: false}))

// Creating a connection to the mysql database
function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'Resurser_db'
    });
};

// Specifies the routes

/* In the callback function: 
1. "/" is the root, 
2. "req" is the request from the browser, 
3. "res" is the respons you want to give the get request */

// The landing page (root page)
app.get('/', (req, res) => {
    console.log('Responding to root route')
    res.sendFile(path.join(__dirname + '/public/ResurcerTilHjemlose.html'))
});

// Returning JSON to the route "/resurser"
app.get('/api/resurser', (req, res) => {

        const connection = getConnection()
    
        const muligheder_id = req.params.id
        const queryString = "SELECT * FROM muligheder"
        connection.query(queryString, [muligheder_id], (err, rows, fields) => {
            if (err) {
                console.log("Failed to query for muligheder: " + err)
                res.sendStatus(500)
                return
            }
            console.log('We fetched data successfully')
            res.json(rows)
        });
    });

    // Creating a get request that fetch specific opportunities(muligheder) identified by id
    app.get('/api/resurser/:id', (req, res) => {
        const connection = getConnection()
    
        const muligheder_id = req.params.id
        const queryString = "SELECT * FROM muligheder WHERE muligheder_id = ?"
        connection.query(queryString, [muligheder_id], (err, rows, fields) => {
            if (err) {
                console.log("Failed to query for muligheder with specific id" + err)
                res.sendStatus(500)
                return
            }
            console.log('We fetched data successfully')
            res.json(rows)
        });
    });

    // Get request for the inputs
    app.get('/api/ny_resurse', (req, res) => {
        console.log("Responding to request")
        res.sendFile(path.join(__dirname + '/public/Indtastning.html'))
    });

// Creating a route to handle post requests (creating new ressources)
app.post('/api/resurse', (req, res) => {
    const connection = getConnection()

    console.log("Trying to create a new ressource...")
    const by = req.body.create_by
    const kategori = req.body_create_kategori
    const navn = req.body_create_navn
    const beskrivelse = req.body.create_beskrivelse
    const adresse = req.body.create_adresse
    const telefon = req.body.create_telefon
    const åbningstider = req.body.create_åbningstider
    const webside = req.body.create_webside

    const queryString = "INSERT INTO muligheder (muligheder_by, muligheder_kategori, muligheder_navn, muligheder_beskrivelse, muligheder_adresse, muligheder_telefon, muligheder_åbningstider, muligheder_webside) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    connection.query(queryString, [by, kategori, navn, beskrivelse, adresse, telefon, åbningstider, webside], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new ressource: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a ressource with id: ", results.insertedId)
        res.end()
    });
});

// Creating a route to handle delete requests
// NOT WORKING ::: ONLY A DUMMY 
app.delete('/api/delete/:id', (req, res) => {
    const connection = getConnection()

    const muligheder_id = req.params.id
    const queryString = "DELETE FROM muligheder WHERE muligheder_id = ?"
    connection.query(queryString, [muligheder_id], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for muligheder with specific id" + err)
            res.sendStatus(500)
            return
        }
        console.log('We fetched data successfully')
        res.json(rows)
    });
});

// Creating a route to handle PUT requests
// NOT WORKING ::: ONLY A DUMMY 
app.put('/api/put/:id', (req, res) => {
    const connection = getConnection()

    const muligheder_id = req.params.id
    const queryString = "UPDATE muligheder SET //WRITE UPDATE HERE// WHERE muligheder_id = ?"
    connection.query(queryString, [muligheder_id], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for muligheder with specific id" + err)
            res.sendStatus(500)
            return
        }
        console.log('We updated data successfully')
        res.json(rows)
    });
});

// Making the server running on port 3000
app.listen(3000, () => {
    console.log("Server is running and listening on port 3000")
});