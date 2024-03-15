const express = require('express');
const path = require('path')

const app = express();
const port = 3000;
const router = express.Router()

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/api', router)

router.get('/example', (req, res) => {
    res.json({ username: 'Riker', rank: 'Commander' });
});

// Catch-all handler for any request that doesn't match the above, to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`)
    }
    else {
        console.log(error);
    }
});
