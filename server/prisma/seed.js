require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Read the seed data from JSON file
  const seedDataPath = path.join(__dirname, 'seed-data.json');
  const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));

  // Clear existing data (in reverse order of dependencies)
  console.log('Clearing existing data...');
  await prisma.characterAppearance.deleteMany({});
  await prisma.character.deleteMany({});
  await prisma.episode.deleteMany({});
  await prisma.season.deleteMany({});
  await prisma.series.deleteMany({});
  console.log('Existing data cleared.');

  // Seed Characters
  console.log('Seeding characters...');
  const characterMap = new Map();
  for (const characterData of seedData.characters) {
    const character = await prisma.character.create({
      data: {
        name: characterData.name,
        species: characterData.species,
        affiliation: characterData.affiliation,
        description: characterData.description,
      },
    });
    characterMap.set(characterData.name, character);
    console.log(`  Created character: ${character.name}`);
  }

  // Seed Series with Seasons and Episodes
  console.log('Seeding series, seasons, and episodes...');
  for (const seriesData of seedData.series) {
    console.log(`  Creating series: ${seriesData.name}`);
    
    const series = await prisma.series.create({
      data: {
        name: seriesData.name,
        abbreviation: seriesData.abbreviation,
        description: seriesData.description,
        releaseYear: seriesData.releaseYear,
        seasons: {
          create: seriesData.seasons.map(seasonData => ({
            seasonNumber: seasonData.seasonNumber,
            episodes: {
              create: seasonData.episodes.map(episodeData => ({
                title: episodeData.title,
                episodeNumber: episodeData.episodeNumber,
                airDate: episodeData.airDate ? new Date(episodeData.airDate) : null,
                description: episodeData.description,
              })),
            },
          })),
        },
      },
      include: {
        seasons: {
          include: {
            episodes: true,
          },
        },
      },
    });

    console.log(`    Created ${series.seasons.length} seasons with ${series.seasons.reduce((acc, s) => acc + s.episodes.length, 0)} episodes`);
  }

  console.log('Database seed completed successfully!');
  
  // Print summary
  const seriesCount = await prisma.series.count();
  const seasonCount = await prisma.season.count();
  const episodeCount = await prisma.episode.count();
  const characterCount = await prisma.character.count();
  
  console.log('\nDatabase Summary:');
  console.log(`  Series: ${seriesCount}`);
  console.log(`  Seasons: ${seasonCount}`);
  console.log(`  Episodes: ${episodeCount}`);
  console.log(`  Characters: ${characterCount}`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
