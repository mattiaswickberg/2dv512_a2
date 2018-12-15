const Lbl = require('line-by-line')
const database = require('./database')
var comments = []

var readFile = function (file) {
  const lr = new Lbl(file)
  var count = 0
  var totalcount = 0
  var startTime = Date.now()

  lr.on('error', function (err) {
    console.log(err)
  })

  lr.on('line', function (line) {
    count += 1
    comments.push(insertComment(line))

    if (count === 1000) {
      lr.pause()
      database.insertComments(comments)
      comments = []
      count = 0
      totalcount += 1000
      lr.resume()
    }
  })

  lr.on('end', function () {
    totalcount += count
    database.insertComments(comments)
    var time = Date.now() - startTime
    console.log('Done in ' + time + ' milliseconds with ' + totalcount + ' rows inserted!')
  })
}

var insertComment = function (line) {
  var comment = JSON.parse(line)
  return [
    comment.id,
    comment.parent_id,
    comment.link_id,
    comment.name,
    comment.author,
    comment.body,
    comment.subreddit_id,
    comment.subreddit,
    comment.score,
    comment.created_utc
  ]
}

module.exports.readFile = readFile
