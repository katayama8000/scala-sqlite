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
          age INTEGER,
          email TEXT,
          department TEXT,
          salary REAL,
          hire_date TEXT,
          is_manager BOOLEAN
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
      // サンプルデータ挿入（全てのフィールドを含む）
      statement.execute("""
        INSERT INTO users (name, age, email, department, salary, hire_date, is_manager) 
        VALUES ('John Doe', 25, 'john.doe@example.com', '開発部', 450000.0, '2020-01-15', 0)
      """)
      statement.execute("""
        INSERT INTO users (name, age, email, department, salary, hire_date, is_manager) 
        VALUES ('Jane Smith', 30, 'jane.smith@example.com', '人事部', 550000.0, '2018-05-20', 1)
      """)
      statement.execute("""
        INSERT INTO users (name, age, email, department, salary, hire_date, is_manager) 
        VALUES ('Bob Johnson', 22, 'bob.johnson@example.com', '開発部', 380000.0, '2022-10-05', 0)
      """)
      statement.execute("""
        INSERT INTO users (name, age, email, department, salary, hire_date, is_manager) 
        VALUES ('Alice Brown', 35, 'alice.brown@example.com', '営業部', 620000.0, '2015-03-01', 1)
      """)
      statement.execute("""
        INSERT INTO users (name, age, email, department, salary, hire_date, is_manager) 
        VALUES ('Charlie Davis', 28, 'charlie.davis@example.com', '開発部', 480000.0, '2019-07-12', 0)
      """)
      statement.execute("""
        INSERT INTO users (name, age, email, department, salary, hire_date, is_manager) 
        VALUES ('Emma Wilson', 32, 'emma.wilson@example.com', '営業部', 530000.0, '2017-11-30', 0)
      """)
      statement.execute("""
        INSERT INTO users (name, age, email, department, salary, hire_date, is_manager) 
        VALUES ('Frank Miller', 45, 'frank.miller@example.com', '経理部', 720000.0, '2010-04-18', 1)
      """)
      statement.execute("""
        INSERT INTO users (name, age, email, department, salary, hire_date, is_manager) 
        VALUES ('Grace Lee', 27, 'grace.lee@example.com', '開発部', 460000.0, '2021-02-28', 0)
      """)
      statement.execute("""
        INSERT INTO users (name, age, email, department, salary, hire_date, is_manager) 
        VALUES ('Henry Garcia', 33, 'henry.garcia@example.com', '経理部', 540000.0, '2018-09-14', 0)
      """)
      statement.execute("""
        INSERT INTO users (name, age, email, department, salary, hire_date, is_manager) 
        VALUES ('Ivy Robinson', 29, 'ivy.robinson@example.com', '人事部', 490000.0, '2019-12-03', 0)
      """)

      println("Data inserted successfully")
    } finally {
      statement.close()
    }
  }
}
