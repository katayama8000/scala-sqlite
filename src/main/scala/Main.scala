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

    // Create JOIN tables
    SQLiteHelper.createJoinTables(connection)

    // Insert JOIN data
    SQLiteHelper.insertJoinData(connection)

    // Query and display data with table format
    println("\n===== All Users Data =====")
    queryAllUsers(connection)

    // Display all departments
    println("\n===== All Departments =====")
    queryAllDepartments(connection)

    // INNER JOIN example
    println("\n===== INNER JOIN: Users and Their Departments =====")
    queryUsersWithDepartments(connection)

    // LEFT JOIN example
    println("\n===== LEFT JOIN: All Departments with Users =====")
    queryDepartmentsWithUsers(connection)

    // RIGHT JOIN example (SQLite doesn't support RIGHT JOIN natively, simulated with LEFT JOIN)
    println("\n===== RIGHT JOIN (Simulated): All Users with Departments =====")
    queryUsersWithDepartmentsRightJoin(connection)

    // FULL OUTER JOIN example (SQLite doesn't support FULL OUTER JOIN natively, simulated with UNION)
    println(
      "\n===== FULL OUTER JOIN (Simulated): All Users and All Departments ====="
    )
    queryFullOuterJoin(connection)

  } finally {
    connection.close()
  }

/** Query all users
  * @param connection
  *   Database connection
  */
def queryAllUsers(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    // Query data
    val resultSet = statement.executeQuery("SELECT * FROM users")

    // Display all data in table format
    DBUtils.printAllResultSetContents(resultSet)

  } finally {
    statement.close()
  }
}

/** Query with WHERE clause
  * @param connection
  *   Database connection
  */
def queryWhere(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    // Query data
    val resultSet =
      statement.executeQuery(
        "SELECT * FROM users WHERE age > 30 ORDER BY salary DESC"
      )

    // Display all data in table format
    DBUtils.printAllResultSetContents(resultSet)

  } finally {
    statement.close()
  }
}

/** Query with GROUP BY clause
  * @param connection
  *   Database connection
  */
def queryGroupBy(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    // Query data
    val resultSet =
      statement.executeQuery(
        "SELECT department, COUNT(*) FROM users GROUP BY department"
      )

    // Display all data in table format
    DBUtils.printAllResultSetContents(resultSet)

  } finally {
    statement.close()
  }
}

/** Query with GROUP BY and AVG
  * @param connection
  *   Database connection
  */
def queryAverageSalaryGroupByDepartment(
    connection: Connection
): Unit = {
  val statement = connection.createStatement()
  try {
    // Query data
    val resultSet =
      statement.executeQuery(
        "SELECT department, AVG(salary) FROM users GROUP BY department"
      )

    // Display all data in table format
    DBUtils.printAllResultSetContents(resultSet)

  } finally {
    statement.close()
  }
}

/** Query highest salary
  * @param connection
  *   Database connection
  */
def queryHighestSalary(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    // Query data
    val resultSet =
      statement.executeQuery("SELECT * FROM users ORDER BY salary DESC LIMIT 1")

    // Display all data in table format
    DBUtils.printAllResultSetContents(resultSet)

  } finally {
    statement.close()
  }
}

/** Query with HAVING clause
  * @param connection
  *   Database connection
  */
def queryHaving(
    connection: Connection
): Unit = {
  val statement = connection.createStatement()
  try {
    // Query data
    val resultSet =
      statement.executeQuery(
        "SELECT department, COUNT(*) FROM users GROUP BY department HAVING COUNT(*) > 2"
      )

    // Display all data in table format
    DBUtils.printAllResultSetContents(resultSet)

  } finally {
    statement.close()
  }
}

/** Query all departments
  * @param connection
  *   Database connection
  */
def queryAllDepartments(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    val resultSet = statement.executeQuery("SELECT * FROM departments")
    DBUtils.printAllResultSetContents(resultSet)
  } finally {
    statement.close()
  }
}

/** Query users with their departments using INNER JOIN
  * @param connection
  *   Database connection
  */
def queryUsersWithDepartments(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    val resultSet = statement.executeQuery("""
      SELECT u.id, u.name, u.age, d.department_name, d.location
      FROM users u
      INNER JOIN departments d ON u.department = d.department_name
      ORDER BY u.id
    """)
    DBUtils.printAllResultSetContents(resultSet)
  } finally {
    statement.close()
  }
}

/** Query departments with users using LEFT JOIN
  * @param connection
  *   Database connection
  */
def queryDepartmentsWithUsers(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    val resultSet = statement.executeQuery("""
      SELECT d.department_name, d.location, u.id, u.name
      FROM departments d
      LEFT JOIN users u ON d.department_name = u.department
      ORDER BY d.department_name, u.id
    """)
    DBUtils.printAllResultSetContents(resultSet)
  } finally {
    statement.close()
  }
}

/** Query users with departments using RIGHT JOIN (simulated with LEFT JOIN)
  * SQLite doesn't support RIGHT JOIN natively, so we simulate it by swapping
  * table order in LEFT JOIN
  * @param connection
  *   Database connection
  */
def queryUsersWithDepartmentsRightJoin(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    val resultSet = statement.executeQuery("""
      SELECT u.id, u.name, u.department, d.department_name, d.location
      FROM departments d
      LEFT JOIN users u ON d.department_name = u.department
      ORDER BY u.id, d.department_name
    """)
    DBUtils.printAllResultSetContents(resultSet)
  } finally {
    statement.close()
  }
}

/** Query all users and all departments using FULL OUTER JOIN (simulated with
  * UNION) SQLite doesn't support FULL OUTER JOIN natively, so we simulate it
  * with UNION of LEFT JOIN and RIGHT JOIN
  * @param connection
  *   Database connection
  */
def queryFullOuterJoin(connection: Connection): Unit = {
  val statement = connection.createStatement()
  try {
    val resultSet = statement.executeQuery("""
      -- LEFT JOIN part
      SELECT u.id, u.name, u.department, d.department_name, d.location
      FROM users u
      LEFT JOIN departments d ON u.department = d.department_name
      
      UNION
      
      -- RIGHT JOIN part (simulated with LEFT JOIN with tables swapped)
      SELECT u.id, u.name, u.department, d.department_name, d.location
      FROM departments d
      LEFT JOIN users u ON d.department_name = u.department
      WHERE u.id IS NULL
      
      ORDER BY id, department_name
    """)
    DBUtils.printAllResultSetContents(resultSet)
  } finally {
    statement.close()
  }
}

def msg = "I was compiled by Scala 3. :)"
