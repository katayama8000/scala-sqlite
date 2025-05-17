import java.sql.{Connection, DriverManager, ResultSet, Statement}

@main def hello(): Unit =
  println("Hello SQLite from Scala 3!")
  
  // Connect to SQLite database
  val connection: Connection = connectToSQLite()
  
  try {
    // Create table
    createTable(connection)
    
    // Insert sample data
    insertData(connection)
    
    // Query and display data
    queryData(connection)
  } finally {
    connection.close()
  }

def msg = "I was compiled by Scala 3. :)"

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

def insertData(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    // Insert sample data
    statement.execute("INSERT INTO users (name, age) VALUES ('John Doe', 25)")
    statement.execute("INSERT INTO users (name, age) VALUES ('Jane Smith', 30)")
    statement.execute("INSERT INTO users (name, age) VALUES ('Bob Johnson', 22)")
    println("Data inserted successfully")
  } finally {
    statement.close()
  }
}

def queryData(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    // Query data
    val resultSet = statement.executeQuery("SELECT * FROM users")
    
    // Display results
    println("\nUsers list:")
    println("--------------------")
    while (resultSet.next()) {
      val id = resultSet.getInt("id")
      val name = resultSet.getString("name")
      val age = resultSet.getInt("age")
      println(s"ID: $id, Name: $name, Age: $age")
    }
    println("--------------------")
  } finally {
    statement.close()
  }
}
