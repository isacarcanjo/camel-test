// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(cors());
app.use(bodyParser.json());

// Sample data storage (in-memory for demonstration purposes)
let administrators = [];
let custodians = [];

// Middleware for security (mock implementation)
// app.use((req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) {
//         return res.status(401).json({ _errorCode: 401, _message: "Unauthorized", _details: "No token provided." });
//     }
//     next();
// });

// Route to retrieve all administrators
app.get('/administrators', (req, res) => {
    recive(req)
    res.status(200).json(administrators);
});

// Route to create a new administrator
app.post('/administrators', (req, res) => {
    recive(req)
    const newAdmin = req.body;
    administrators.push(newAdmin);
    res.status(201).json(newAdmin);
});

// Route to retrieve a specific administrator
app.get('/administrators/:identifier', (req, res) => {
    recive(req)
    const identifier = req.params.identifier;
    const admin = administrators.find(a => a.identifier === identifier);
    if (!admin) {
        return res.status(404).json({ _errorCode: 404, _message: "Not Found", _details: "Administrator not found." });
    }
    res.status(200).json(admin);
});

// Route to update an administrator
app.put('/administrators/:identifier', (req, res) => {
    recive(req)
    const identifier = req.params.identifier;
    const index = administrators.findIndex(a => a.identifier === identifier);
    if (index === -1) {
        return res.status(404).json({ _errorCode: 404, _message: "Not Found", _details: "Administrator not found." });
    }
    administrators[index] = { ...administrators[index], ...req.body };
    res.status(200).json(administrators[index]);
});

// Route to delete an administrator
app.delete('/administrators/:identifier', (req, res) => {
    recive(req)
    const identifier = req.params.identifier;
    const index = administrators.findIndex(a => a.identifier === identifier);
    if (index === -1) {
        return res.status(404).json({ _errorCode: 404, _message: "Not Found", _details: "Administrator not found." });
    }
    administrators.splice(index, 1);
    res.status(200).json({ message: "Administrator deleted successfully." });
});

// Route to retrieve all custodians
app.get('/custodians', (req, res) => {
    recive(req)
    res.status(200).json(custodians);
});

// Route to create a new custodian
app.post('/custodians', (req, res) => {
    recive(req)
    const newCustodian = req.body;
    custodians.push(newCustodian);
    res.status(201).json(newCustodian);
});

// Route to retrieve a specific custodian
app.get('/custodians/:identifier', (req, res) => {
    recive(req)
    const identifier = req.params.identifier;
    const custodian = custodians.find(c => c.identifier === identifier);
    if (!custodian) {
        return res.status(404).json({ _errorCode: 404, _message: "Not Found", _details: "Custodian not found." });
    }
    res.status(200).json(custodian);
});

// Route to update a custodian
app.put('/custodians/:identifier', (req, res) => {
    recive(req)
    const identifier = req.params.identifier;
    const index = custodians.findIndex(c => c.identifier === identifier);
    if (index === -1) {
        return res.status(404).json({ _errorCode: 404, _message: "Not Found", _details: "Custodian not found." });
    }
    custodians[index] = { ...custodians[index], ...req.body };
    res.status(200).json(custodians[index]);
});

// Route to delete a custodian
app.delete('/custodians/:identifier', (req, res) => {
    recive(req)
    const identifier = req.params.identifier;
    const index = custodians.findIndex(c => c.identifier === identifier);
    if (index === -1) {
        return res.status(404).json({ _errorCode: 404, _message: "Not Found", _details: "Custodian not found." });
    }
    custodians.splice(index, 1);
    res.status(200).json({ message: "Custodian deleted successfully." });
});

const recive = (req) => {
    const requestData = req.body;
    const params = req.params;
    const query = req.query;
    console.log(`Received ${req.method} request with params: `, params);
    console.log(`Received ${req.method} request with query: `, query);
    console.log(`Received ${req.method} request with data: `, requestData);
    console.log(``);
}
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});