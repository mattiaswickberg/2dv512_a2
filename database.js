var mysql = require('mysql')

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'mattias',
  password: 'hubbabubba',
  database: '2dv513'
})

conn.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
})

var insertComment = function (comment) {
//TODO
}
