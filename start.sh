#!/bin/sh
# start.sh

echo "Running migrations..."
npx npx prisma migrate deploy --config ./prisma.config.ts

echo "Starting Next.js..."
node server.js