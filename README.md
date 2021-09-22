# TraceLabs Ethereum Transactions Crawler Task 

This application allows a user to view transaction data from the blockchain with a specific address and a starting block.

The application saves the blockchain transactions if found in the database to not be fetched next time if request from the blockchain, it also saves the last block searched in the blockchain to optimize the searching in the ethereum blockchain.

## Before Running

## Backend

Copy .env.sample to .env to create an environment file for the project 

Replace the INFURA_TOKEN

Add a MONGO_DB value with represents the database name that will be created

### `cp .env.sample .env`

## Frontend

Go to frontend directory and:

Copy .env.sample to .env to create an environment file for the project and replace the IP_HERE with the machine ip

### `cp .env.sample .env`

In package.json, replace proxy 'localhost' in the line 5 with the IP of the machine 


## Available Scripts

**Please make sure docker and docker-compose are installed.**

To run this project with docker, this command will build the images before running the containers:

### `docker-compose up -d --build`

## Usage

To access the application UI, use the the port `3001` of the IP Machine

To check the current running servers:

### `docker-compose ps`

To stop the servers:

### `docker-compose down`

To check the current running servers logs:

### `docker-compose logs`

Or by a container name (app, nodejs, db):

### `docker-compose logs CONTAINER_NAME`

