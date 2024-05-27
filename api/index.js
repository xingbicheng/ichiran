const express = require('express');
const { exec } = require('child_process');
const app = express();
app.use(express.json());

app.post('/analyze', (req, res) => {
    const { sentence } = req.body;
    if (!sentence) {
        return res.status(400).json({ success: false, error: 'No sentence provided' });
    }

    const command = `/usr/local/bin/ichiran-cli -f "${sentence}"`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ success: false, error: stderr });
        }
        res.json({ success: true, data: stdout });
    });
});

const port = process.env.PORT || 5060;
app.listen(port, () => {
    console.log(`Ichiran API service running on port ${port}`);
});
