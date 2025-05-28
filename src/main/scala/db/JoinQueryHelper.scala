package db

import util.DBUtils
import java.sql.Connection

/** Helper class for SQL JOIN query operations
  */
object JoinQueryHelper {

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
}
