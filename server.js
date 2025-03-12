const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let reports = []; // In-memory storage for reports

// Endpoint to submit a report
app.post('/api/reports', (req, res) => {
    const { name, roomNumber, issueType, description } = req.body;
    const trackingId = 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const status = 'Pending';

    const report = { trackingId, name, roomNumber, issueType, description, status };
    reports.push(report);

    res.json({ trackingId });
});

// Endpoint to check report status
app.get('/api/reports/:trackingId', (req, res) => {
    const { trackingId } = req.params;
    const report = reports.find(r => r.trackingId === trackingId);

    if (report) {
        res.json({ status: report.status });
    } else {
        res.status(404).send('Tracking ID not found.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});