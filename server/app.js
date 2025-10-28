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

// Get all series
router.get('/series', async (req, res) => {
    try {
        const series = await prisma.series.findMany({
            orderBy: {
                releaseYear: 'asc'
            },
            include: {
                seasons: {
                    orderBy: {
                        seasonNumber: 'asc'
                    }
                }
            }
        });
        res.json(series);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch series', message: error.message });
    }
});

// Get a specific series by ID
router.get('/series/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const series = await prisma.series.findUnique({
            where: { id: parseInt(id) },
            include: {
                seasons: {
                    orderBy: {
                        seasonNumber: 'asc'
                    },
                    include: {
                        episodes: {
                            orderBy: {
                                episodeNumber: 'asc'
                            }
                        }
                    }
                }
            }
        });
        
        if (!series) {
            return res.status(404).json({ error: 'Series not found' });
        }
        
        res.json(series);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch series', message: error.message });
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
