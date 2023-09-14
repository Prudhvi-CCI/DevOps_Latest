#!/bin/bash

# Update package lists and install PostgreSQL
sudo apt-get update
sudo apt-get install -y postgresql

# Start the PostgreSQL service
sudo service postgresql start

# Create a PostgreSQL user and database for the Notes application
sudo -u postgres psql -c "CREATE USER notes_user WITH PASSWORD 'password';"
sudo -u postgres psql -c "CREATE DATABASE notes_database;"
sudo -u postgres psql -c "ALTER ROLE notes_user SET client_encoding TO 'utf8';"
sudo -u postgres psql -c "ALTER ROLE notes_user SET default_transaction_isolation TO 'read committed';"
sudo -u postgres psql -c "ALTER ROLE notes_user SET timezone TO 'UTC';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE notes_database TO notes_user;"

# Create a 'notes' table in the 'notes_database' database
sudo -u postgres psql -d notes_database -c "CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    password INT
);"

# Configure PostgreSQL to listen on all IP addresses
echo "host notes_database postgres 192.168.0.106/32 scram-sha-256" | sudo tee -a /etc/postgresql/$(ls /etc/postgresql)/main/pg_hba.conf
echo "listen_addresses = '*'" | sudo tee -a /etc/postgresql/$(ls /etc/postgresql)/main/postgresql.conf

# Allow external access to the 'notes_database' database from another VM
echo "ALTER DATABASE notes_database CONNECTION LIMIT -1;" | sudo -u postgres psql
echo "GRANT ALL PRIVILEGES ON DATABASE notes_database TO notes_user;" | sudo -u postgres psql

# Restart PostgreSQL to apply the changes
sudo service postgresql restart

# Print PostgreSQL version and status
echo "PostgreSQL Version:"
sudo -u postgres psql -c "SELECT version();"
echo "PostgreSQL Status:"
sudo service postgresql status
