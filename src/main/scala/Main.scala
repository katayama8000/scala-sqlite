import db.SQLiteHelper
import util.DBUtils
import java.sql.Connection

/** Main application
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
    println("\n===== All Data =====")
    queryDataWithTableFormat(connection)

    // Query with WHERE clause
    println("\n===== Filtered Data (Age > 30, sorted by salary) =====")
    queryWhere(connection)
  } finally {
    connection.close()
  }

/** Query data and display in table format
  * @param connection
  *   Database connection
  */
def queryDataWithTableFormat(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    // Query data
    val resultSet = statement.executeQuery("SELECT * FROM users")

    // Display results
    println("\nUsers list:")

    // Display all data in table format
    DBUtils.printAllResultSetContents(resultSet)

  } finally {
    statement.close()
  }
}

def queryWhere(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    // Query data
    val resultSet =
      statement.executeQuery(
        "SELECT * FROM users WHERE age > 30 ORDER BY salary DESC"
      )

    // Display results
    println("\nUsers list:")

    // Display all data in table format
    DBUtils.printAllResultSetContents(resultSet)

  } finally {
    statement.close()
  }
}

def msg = "I was compiled by Scala 3. :)"
