package db

import java.sql.{Connection, DriverManager, Statement}

/** SQLite操作のためのヘルパークラス
  */
object SQLiteHelper {

  /** SQLiteデータベースに接続する
    * @return
    *   接続オブジェクト
    */
  def connectToSQLite(): Connection = {
    // Use in-memory database
    // For file-based database, use "jdbc:sqlite:database.db" with file path
    val url = "jdbc:sqlite::memory:"

    // Register JDBC driver
    Class.forName("org.sqlite.JDBC")

    // Create connection
    val connection = DriverManager.getConnection(url)
    println("Connected to SQLite database")
    connection
  }

  /** テーブルを作成する
    * @param connection
    *   データベース接続
    */
  def createTable(connection: Connection): Unit = {
    val statement = connection.createStatement()
    try {
      // Create users table
      statement.execute("""
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          age INTEGER
        )
      """)
      println("Table created successfully")
    } finally {
      statement.close()
    }
  }

  /** サンプルデータを挿入する
    * @param connection
    *   データベース接続
    */
  def insertData(connection: Connection): Unit = {
    val statement = connection.createStatement()
    try {
      // Insert sample data
      statement.execute("INSERT INTO users (name, age) VALUES ('John Doe', 25)")
      statement.execute(
        "INSERT INTO users (name, age) VALUES ('Jane Smith', 30)"
      )
      statement.execute(
        "INSERT INTO users (name, age) VALUES ('Bob Johnson', 22)"
      )
      println("Data inserted successfully")
    } finally {
      statement.close()
    }
  }
}
