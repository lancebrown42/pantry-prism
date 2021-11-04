var Connection = require('tedious').Connection
var Request = require('tedious').Request
var env = require('../env.json');

var config = env.db;


var connection = new Connection(config)



connection.on('connect', function (err) {

  if (err) {
    console.log(err)
  } else {
    executeStatement()
  }
})
connection.connect();
function executeStatement () {

  request = new Request("select TOP 10 * from db_owner.TInventories", function (err, rowCount) {
      console.log(rowCount);
    if (err) {
      console.log(err)
    } else {
      console.log(rowCount + ' rows')
    }
    connection.close()
  })

  request.on('row', function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log('NULL')
      } else {
        console.log(column.value)
      }
    })
  })

  connection.execSql(request)
}