# Database Setup

This project uses PostgreSQL with Prisma ORM.

## Local Development Setup

### Prerequisites
- Docker and Docker Compose installed

### Steps

1. **Start the PostgreSQL database using Docker Compose:**
   ```bash
   docker-compose up -d
   ```

   This will start a PostgreSQL database on `localhost:5432` with:
   - Database name: `trek_picker`
   - Username: `postgres`
   - Password: `postgres`

2. **Copy the environment file:**
   ```bash
   cd server
   cp .env.example .env
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run Prisma migrations to create the database schema:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

6. **Start the server:**
   ```bash
   npm run start:server
   ```

7. **Verify database connection:**
   Open your browser and navigate to `http://localhost:3000/api/health`
   You should see: `{"status":"ok","database":"connected"}`

## Production Setup (AWS RDS)

For production deployment with AWS RDS PostgreSQL:

1. Create a PostgreSQL RDS instance in AWS
2. Update the `DATABASE_URL` environment variable in your production environment:
   ```
   DATABASE_URL="postgresql://username:password@your-rds-endpoint.region.rds.amazonaws.com:5432/trek_picker"
   ```
3. Run migrations in production:
   ```bash
   npx prisma migrate deploy
   ```

## Database Schema

The database includes the following entities:

### Series
- Represents a Star Trek series (e.g., TOS, TNG, DS9, VOY, ENT)
- Fields: id, name, abbreviation, description, releaseYear

### Season
- Represents a season within a series
- Fields: id, seasonNumber, seriesId
- Relationship: Each Season belongs to one Series

### Episode
- Represents an individual episode
- Fields: id, title, episodeNumber, seasonId, airDate, description
- Relationship: Each Episode belongs to one Season

### Character
- Represents a character in the Star Trek universe
- Fields: id, name, species, affiliation, description
- Relationship: Characters can appear in multiple episodes across any series

### CharacterAppearance
- Junction table linking Characters to Episodes
- Fields: id, characterId, episodeId
- Relationship: Many-to-many relationship between Characters and Episodes

## Useful Prisma Commands

- **View database in Prisma Studio:**
  ```bash
  npx prisma studio
  ```

- **Reset database (WARNING: deletes all data):**
  ```bash
  npx prisma migrate reset
  ```

- **Generate Prisma Client after schema changes:**
  ```bash
  npx prisma generate
  ```

- **Create a new migration:**
  ```bash
  npx prisma migrate dev --name your_migration_name
  ```

## Stopping the Local Database

To stop the Docker container:
```bash
docker-compose down
```

To stop and remove all data:
```bash
docker-compose down -v
```
