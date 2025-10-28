require('dotenv').config();
const express = require('express');
const path = require('path');
const prisma = require('./prismaClient');

const app = express();
const port = 3000;

// create a router we can use
// any routes used by this router are prepended by '/api'
const router = express.Router()
app.use('/api', router)

// serve static files from build directory
app.use(express.static(path.join(__dirname, '../client/dist')));

router.get('/example', (req, res) => {
    res.json({ username: 'Riker', rank: 'Commander' });
});

// Health check endpoint that verifies database connectivity
router.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'ok', database: 'connected' });
    } catch (error) {
        res.status(500).json({ status: 'error', database: 'disconnected', error: error.message });
    }
});

// serve the app to any request that doesn't match the above
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

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
