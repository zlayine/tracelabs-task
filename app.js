const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const controller = require('./controllers');
const cors = require('cors')
require('dotenv').config();

router.get('/api/transactions',
	controller.getTransactions
);

router.get('/api/block',
	controller.getBlock
);

app.use(router);
app.use(cors);

let url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
if (process.env.NODE_ENV == "development")
	url = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Database Connected!")
		app.listen({ port: process.env.SERVER_PORT }, () =>
			console.log(`🚀 Server ready at http://localhost:${process.env.SERVER_PORT}/api`)
		)
	}).catch(err => {
		console.log(err)
	})