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
            db.exec(`CREATE TABLE blog (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, entry TEXT);
                      insert into blog (title, entry)
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
});

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
      // console.log("entry content:\n"+entry);
      db.exec(`
                insert into blog (title, entry)
                values ('${title}','${entry}');`);
      //redirect to homepage
      res.redirect('/');
    }
  );
})

router.post('/editpost', (req, res, next) => {
  var db = new sqlite3.Database('mydb.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      var title = req.body.title;
      var entry = req.body.entry;
      var id = req.body.id;
      title = sanitize(title);
      entry = sanitize(entry);
      id = sanitize(id);
      console.log("editing post " + id);
      db.exec(`update blog
                set title = '${title}', entry = '${entry}'
                where id = '${id}'`);
      //redirect to homepage
      res.redirect('/');
    }
  );
})

router.post('/deletepost', (req, res, next) => {
  var db = new sqlite3.Database('mydb.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      var id = req.body.id;
      id = sanitize(id);
      console.log("deleting post " + id);
      db.exec(`delete from blog
                where id = '${id}'`);
      //redirect to homepage
      res.redirect('/');
    }
  );
})

module.exports = router;

function sanitize(input) {
  let output = input.replace(/\'/g, "\'\'");
  return output;
}