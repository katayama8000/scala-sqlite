package util

import java.sql.ResultSet

/** Database utilities
  */
object DBUtils {

  /** Helper function to display ResultSet contents in a formatted table
    * @param resultSet
    *   The ResultSet to display
    */
  def printAllResultSetContents(resultSet: ResultSet): Unit = {
    val metaData = resultSet.getMetaData
    val columnCount = metaData.getColumnCount

    // Map for calculating maximum width for each column
    var maxWidths = Map.empty[Int, Int]

    // Get column names and set their lengths as initial max widths
    val headers = for (i <- 1 to columnCount) yield {
      val columnName = metaData.getColumnName(i)
      maxWidths = maxWidths + (i -> columnName.length)
      columnName
    }

    // Get all data, cache it, and calculate maximum widths
    val allRows = scala.collection.mutable.ArrayBuffer.empty[Vector[String]]

    while (resultSet.next()) {
      val rowData = for (i <- 1 to columnCount) yield {
        val value =
          Option(resultSet.getObject(i)).map(_.toString).getOrElse("null")
        // Update width if needed
        val currentMaxWidth = maxWidths.getOrElse(i, 0)
        if (value.length > currentMaxWidth) {
          maxWidths = maxWidths + (i -> value.length)
        }
        value
      }
      allRows += rowData.toVector
    }

    // Draw separator line function
    def drawSeparator(): Unit = {
      val separator = (1 to columnCount).map { i =>
        "+" + "-" * (maxWidths(i) + 2)
      }.mkString + "+"
      println(separator)
    }

    // Draw header row
    drawSeparator()
    val headerRow = (1 to columnCount).map { i =>
      val paddedHeader = headers(i - 1).padTo(maxWidths(i), ' ')
      "| " + paddedHeader + " "
    }.mkString + "|"
    println(headerRow)
    drawSeparator()

    // Draw data rows
    for (row <- allRows) {
      val formattedRow = (1 to columnCount).map { i =>
        val value = row(i - 1)
        // Right-align numbers, left-align text
        val paddedValue = if (value.matches("\\d+(\\.\\d+)?")) {
          " " * (maxWidths(i) - value.length) + value
        } else {
          value.padTo(maxWidths(i), ' ')
        }
        "| " + paddedValue + " "
      }.mkString + "|"
      println(formattedRow)
    }

    // Final separator
    drawSeparator()
  }
}
