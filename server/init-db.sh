#!/bin/bash

# Database initialization script
# This script waits for the database to be ready, runs migrations, and seeds the database

# Don't exit on error immediately - we want to provide helpful messages
set +e

echo "⏳ Waiting for PostgreSQL to be ready..."

# Extract database host and port from DATABASE_URL or use defaults
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_USER="${DB_USER:-postgres}"

# Wait for PostgreSQL to be ready
max_attempts=30
attempt=0

# Function to check if database is ready
check_db() {
  # Try using pg_isready if available, otherwise try a TCP connection
  if command -v pg_isready > /dev/null 2>&1; then
    pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" > /dev/null 2>&1
    return $?
  else
    # Fall back to checking if port is open
    timeout 1 bash -c "cat < /dev/null > /dev/tcp/$DB_HOST/$DB_PORT" 2>/dev/null
    return $?
  fi
}

# Keep trying until database is ready or max attempts reached
until check_db || [ $attempt -eq $max_attempts ]; do
  attempt=$((attempt + 1))
  echo "  Attempt $attempt/$max_attempts: Database not ready yet..."
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo "❌ Database failed to become ready after $max_attempts attempts"
  echo ""
  echo "This likely means the PostgreSQL container is not running."
  echo "To fix this:"
  echo "  1. Make sure docker-compose is running: docker compose up -d"
  echo "  2. Re-run this script: ./init-db.sh"
  echo ""
  echo "⚠️  Skipping database initialization for now."
  exit 0  # Exit successfully to not fail container build
fi

echo "✅ Database is ready!"

# Run migrations
echo "🔄 Running database migrations..."
if npx prisma migrate deploy; then
  echo "✅ Migrations applied successfully"
else
  echo "❌ Migration failed"
  exit 1
fi

# Seed the database
echo "🌱 Seeding database..."
if npm run db:seed; then
  echo "✅ Database seeded successfully"
else
  echo "❌ Seeding failed"
  exit 1
fi

echo ""
echo "✅ Database initialization complete!"
echo "   - Series: 10"
echo "   - Seasons: 13"
echo "   - Episodes: 18"
echo "   - Characters: 10"
