#!/bin/bash

# Database initialization script
# This script waits for the database to be ready, runs migrations, and seeds the database

set -e

echo "⏳ Waiting for PostgreSQL to be ready..."

# Wait for PostgreSQL to be ready using pg_isready through docker
max_attempts=30
attempt=0
until docker exec trek-picker-db pg_isready -U postgres > /dev/null 2>&1 || [ $attempt -eq $max_attempts ]; do
  attempt=$((attempt + 1))
  echo "  Attempt $attempt/$max_attempts: Database not ready yet..."
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo "❌ Database failed to become ready after $max_attempts attempts"
  exit 1
fi

echo "✅ Database is ready!"

# Run migrations
echo "🔄 Running database migrations..."
npx prisma migrate deploy

# Seed the database
echo "🌱 Seeding database..."
npm run db:seed

echo "✅ Database initialization complete!"
