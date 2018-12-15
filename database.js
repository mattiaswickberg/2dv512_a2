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
      connection.release()
    })
  })
}

var redditQuery = function() {
  var time = Date.now();
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err)
    }
    var sql = "SELECT c.author, c.number FROM (SELECT COUNT(`subreddit_id`) AS 'number', `author` FROM `reddit_comments_V0` GROUP BY `author` ORDER BY COUNT(`subreddit_id`) LIMIT 100) c WHERE c.number = 1"
    connection.query(sql, function (err, result) {
      if (err) throw err
      console.log(result)
      console.log('Query took ' + (Date.now() - time) + ' milliseconds')
      connection.release()
    })
  })
}

module.exports.insertComments = insertComments
module.exports.redditQuery = redditQuery
