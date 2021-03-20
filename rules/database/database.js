'using strict';

const sqlite3 = require('sqlite3');

let dbFunctions = {};

let db = new sqlite3.Database('find.sl3', (err) => {
	if (err) {
		console.error(err);
	}
});

dbFunctions.addFilter = function(data) {
	db.serialize(() => {
		let req = db.prepare(`insert into Filters 
			(editedby, editdate, filter, name, description) 
			values (?, ?, ?, ?, ?)`);

		req.run([
			data.editedby,
			data.editdate,
			data.filter,
			data.name,
			data.description
		]);
	});
};

dbFunctions.getFiltersByWiki = function(wiki) {
	db.serialize(() => {
		let req = db.prepare("select * from Filters where id = ?");
		req.all([wiki], (err, row) => {
			console.log(row);
		});
	});
};

// Close the db on exit
process.on('SIGINT', () => {
    db.close();
});

dbFunctions.addFilter({
	editedby: 'Test1',
	editdate: new Date().toISOString(),
	filter: 'return true;',
	name: 'test1',
	description: 'test1'
});
dbFunctions.getFiltersByWiki();

module.exports = dbFunctions;