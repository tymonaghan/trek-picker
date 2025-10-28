# Trek Picker
A web app by Ty Monaghan and Sam Stahl. Development assisted by GitHub Co-Pilot.

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- Docker and Docker Compose (for database)

### Setup

1. **Install dependencies:**
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

2. **Set up the database:**
   
   See [DATABASE.md](./DATABASE.md) for detailed database setup instructions.
   
   Quick start:
   ```bash
   # Start PostgreSQL with Docker Compose (from project root)
   docker compose up -d
   
   # Copy environment file
   cd server
   cp .env.example .env
   
   # Run migrations and seed the database
   ./init-db.sh
   ```
   
   Note: When using the devcontainer, the database is automatically migrated and seeded during container creation.

3. **Run the application:**
   ```bash
   # Start the server (from server directory)
   npm run start:server
   
   # In another terminal, start the client (from client directory)
   cd client
   npm run dev
   ```

### Development with VS Code

If using the devcontainer, dependencies will be installed automatically. Otherwise, make sure to run `npm install` in both `client` and `server` directories before using the VS Code launch configurations.

Available launch configurations:
- **start express server** - Starts the backend server
- **run npm start** - Starts the frontend development server
- **dev++** - Starts both frontend and backend

## Documentation

- [DATABASE.md](./DATABASE.md) - Database setup and schema documentation
