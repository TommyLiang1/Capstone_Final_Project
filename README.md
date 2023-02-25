# Capstone_Final_Project
## To run server:
- cd into server directory
- `npm install` to install dependencies (only need to do once)
- use `npm run dev` to run server (back-end)

## To run client:
- cd into server directory
- `npm install` to install dependencies (only need to do once)
- use `npm start` to run client

## Creating Our Database
- get to psql shell (instructions below)
- `CREATE DATABASE capstonefinalproject;` (CAPS for psql defined commands is convention and NOT mandatory, "capstonefinalproject" is dbname(name it whatever you want), and ";" is at the end of psql commands) 
- go to server directory and find database.sql
- copy and paste `CREATE TABLE` with everything in parentheses and run the command. This will create the table for each of the elements we need

### To install psql database (WSL)
- Get psql version 15.2 `https://www.linuxtechi.com/how-to-install-postgresql-on-ubuntu/#:~:text=PostgreSQL%2015%20package%20is%20not,package%20repository%20using%20following%20commands`
- Stop after step 2 (beginning of step 3)

### To operate postgres database
- Check status of db = `sudo service postgresql status` 
- Start running database = `sudo service postgresql start`
- Stop running database = `sudo service postgresql stop`

### To use PostgreSQL with psql shell
- `sudo service postgresql start`
- `sudo service postgres psql` (postgresql database must be running aka use above command first or check status to see if its running)

### Additional psql commands
- to quit psql shell = `\q` 
- to connect to database = `\c dbname`
More psql commands below
`https://www.geeksforgeeks.org/postgresql-psql-commands/`

### To change admin user (postgres) password
- `sudo passwd postgres`
- Enter new password
- restart terminal
More postgres details below
`https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql`