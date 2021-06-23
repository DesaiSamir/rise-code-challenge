const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const dbFile = './db/data.json';

const db = JSON.parse(fs.readFileSync(dbFile));

function server() {
	const app = express()
	const port = process.env.PORT || 5000

	app.use(morgan('dev'));

	app.get('/api/tab-blocks', (req, res) => res.send(db.tabBlocks));
	app.put('/api/tab-blocks/:tabId', (req, res) => {
		const tabs = db.tabBlocks[0].tabs;
		const tabId = parseInt(req.params.tabId);
		tabs.forEach(tab => {
			tab.selected = tab.id === tabId;
		});
		const dbData = JSON.stringify(db, null, 4);
		fs.writeFile(dbFile, dbData, callback);
		function callback(err){
		}
	});
	app.get('/flashcard-blocks', (req, res) => res.send(db.flashcardBlocks));
	app.get('/knowledge-check-blocks', (req, res) => res.send(db.knowledgeCheckBlocks));

	app.start = app.listen.bind(app, port, () => console.log(`Listening on port ${port}`));

	return app;
}

if (require.main === module) server().start();

module.exports = server;
