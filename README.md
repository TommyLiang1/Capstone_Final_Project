# Capstone_Final_Project

## Dependancy Installations
- following commands needs to be done in each server and client directory once
- `npm install` for the node package manager
- `npm install pm2@latest` for the process manager we use

## To run server:
- cd into server directory
- use `pm2 start server.js` to start the server on pm2

## To run client:
- cd into client directory
- use `npm build` to build client
- use `pm2 serve build 8080` in client folder to host built site on port 8080
