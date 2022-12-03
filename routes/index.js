var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()

/* GET home page. */
router.get('/', function(req, res, next) {

  var db = new sqlite3.Database('mydb.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      //Query if the table exists if not lets create it on the fly!
      db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='blog'`,
        (err, rows) => {
          if (rows.length === 1) {
            console.log("Table exists!");
            db.all('SELECT rowid AS id, title, entry FROM blog',[], (err, rows) => {
              res.render('index', { title: 'My Blog', data: rows});
            });
          } else {
            console.log("Creating table and inserting some sample data");
            db.exec(`CREATE TABLE blog (title TEXT, entry TEXT);
                      insert into blog
                      values ("Yo waddup", "Here\'s some text"),
                      ("Yo waddup AGAIN","Here\'s some MORE text");`,
              () => {
                db.all('SELECT rowid AS id, title, entry FROM blog',[], (err, rows) => {
                  res.render('index', { title: 'My Blog', data: rows});
                });
              });
          }
    });
  });


  // const db = new sqlite3.Database(':memory:');

  // db.serialize(() => {
  //   db.run(`IF NOT (EXISTS (SELECT * 
  //       FROM INFORMATION_SCHEMA.TABLES 
  //       WHERE TABLE_NAME = 'blog'))
  //     BEGIN
  //       CREATE TABLE blog (title TEXT, entry TEXT)
  //     END`)
  //   // db.run('CREATE TABLE blog (title TEXT, entry TEXT)')

  //   const stmt = db.prepare('INSERT INTO blog VALUES ("Yo waddup", "Here\'s some text"),("Yo waddup AGAIN","Here\'s some MORE text")')
  //   stmt.run()
  //   stmt.finalize()
  //   db.all('SELECT rowid AS id, title, entry FROM blog',[], (err, rows) => {
  //     res.render('index', { title: 'My Blog', data: rows});
  //   })
  // });

  //db.close();
});

module.exports = router;

router.post('/newpost', (req, res, next) => {
  var db = new sqlite3.Database('mydb.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      var title = req.body.title;
      var entry = req.body.entry;
      title = sanitize(title);
      entry = sanitize(entry);
      console.log("inserting " + title);
      db.exec(`insert into blog
                values ('${title}','${entry}');`)
      //redirect to homepage
      res.redirect('/');
    }
  );
})

function sanitize(input) {
  //let output = input.replace(/\\/g, "\\\\");
  let output = input.replace(/\'/g, "\'\'");
  return output;
}