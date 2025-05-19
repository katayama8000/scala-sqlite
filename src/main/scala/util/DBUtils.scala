package util

import java.sql.ResultSet

/** データベース関連のユーティリティ
  */
object DBUtils {

  /** ResultSetの全内容を見やすく表形式で出力するヘルパー関数
    * @param resultSet
    *   表示するResultSet
    */
  def printAllResultSetContents(resultSet: ResultSet): Unit = {
    val metaData = resultSet.getMetaData
    val columnCount = metaData.getColumnCount

    // 列名を出力
    val headers = for (i <- 1 to columnCount) yield {
      metaData.getColumnName(i)
    }
    println(headers.mkString("| ", " | ", " |"))
    println("-" * (headers.mkString(" | ").length + 2))

    // 全ての行を処理
    while (resultSet.next()) {
      val rowData = for (i <- 1 to columnCount) yield {
        Option(resultSet.getObject(i)).map(_.toString).getOrElse("null")
      }
      println(rowData.mkString("| ", " | ", " |"))
    }
  }
}
