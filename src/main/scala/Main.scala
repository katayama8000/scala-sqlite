import db.SQLiteHelper
import util.DBUtils
import java.sql.Connection

/** メインアプリケーション
  */
@main def hello(): Unit =
  println("Hello SQLite from Scala 3!")

  // Connect to SQLite database
  val connection: Connection = SQLiteHelper.connectToSQLite()

  try {
    // Create table
    SQLiteHelper.createTable(connection)

    // Insert sample data
    SQLiteHelper.insertData(connection)

    // Query and display data with table format
    // queryDataWithTableFormat(connection)

    // Query with WHERE clause
    queryWhere(connection)
  } finally {
    connection.close()
  }

/** データを取得して表形式で表示する
  * @param connection
  *   データベース接続
  */
def queryDataWithTableFormat(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    // Query data
    val resultSet = statement.executeQuery("SELECT id, name FROM users")

    // Display results
    println("\nUsers list:")
    println("--------------------")

    // 表形式で全データを表示
    DBUtils.printAllResultSetContents(resultSet)

    println("--------------------")
  } finally {
    statement.close()
  }
}

def queryWhere(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    // Query data
    val resultSet =
      statement.executeQuery("SELECT id, name FROM users WHERE age > 25")

    // Display results
    println("\nUsers list:")
    println("--------------------")

    // 表形式で全データを表示
    DBUtils.printAllResultSetContents(resultSet)

    println("--------------------")
  } finally {
    statement.close()
  }
}

def msg = "I was compiled by Scala 3. :)"
