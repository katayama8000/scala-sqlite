package db

import util.DBUtils
import java.sql.Connection

/** Helper class for SQL query operations
  */
object QueryHelper {

  /** Query data and display in table format
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
        statement.executeQuery(
          "SELECT * FROM users ORDER BY salary DESC LIMIT 1"
        )

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
}
