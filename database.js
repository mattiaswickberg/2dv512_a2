var mysql = require('mysql')

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'mattias',
  password: 'hubbabubba',
  database: '2dv513',
  acquireTimeout: 100000
})

var insertComments = function (comments) {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err)
    }
    var sql = 'INSERT INTO reddit_comments (id, parent_id, link_id, name, author, body, subreddit_id, subreddit, score, created_utc) VALUES ?'
    connection.query(sql, [comments], function (err, result) {
      if (err) throw err
      console.log('Number of rows inserted: ' + result.affectedRows)
      connection.release()
    })
  })
}

module.exports.insertComments = insertComments
