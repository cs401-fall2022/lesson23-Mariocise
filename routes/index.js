var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database(':memory:');

  db.serialize(() => {
    db.run('CREATE TABLE blog (title TEXT, entry TEXT)')

    const stmt = db.prepare('INSERT INTO blog VALUES ("Yo waddup", "Here\'s some text")')
    stmt.run()
    stmt.finalize()

    const stmt2 = db.prepare('INSERT INTO blog VALUES ("Yo waddup AGAIN","Here\'s some MORE text")')
    stmt2.run()
    stmt2.finalize()

    db.all('SELECT rowid AS id, title, entry FROM blog',[], (err, rows) => {
      // console.log("hi");
      // var entries = []
      // rows.forEach((row) => {
      //   console.log(row.entry);
      //   entries.push(row.entry);
      // });
      console.log(rows[0].title);
      res.render('index', { title: 'My Blog', data: rows});
    })
  });

  db.close();
});

module.exports = router;
