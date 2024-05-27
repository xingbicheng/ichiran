#!/bin/bash

echo "Checking postgres server status..."
while : ; do
    pg_isready -h pg > /dev/null && break;
    sleep 1;
done

echo "Postgres is ready, starting main container init."
init-all;

echo "Starting Node.js service..."
node /app/api/index.js &

echo "All set, awaiting commands."
sleep infinity;
