# 用語

- 行
  - レコード
- 列
  - カラム

## SQL

### データ

#### メンバー

| id  | 名前 | 年齢 | 性別 | 職業           | 年収    |
| --- | ---- | ---- | ---- | -------------- | ------- |
| 1   | 山田 | 25   | 男性 | エンジニア     | 600 万  |
| 2   | 佐藤 | 30   | 女性 | デザイナー     | 500 万  |
| 3   | 鈴木 | 22   | 男性 | 学生           | 0 万    |
| 4   | 高橋 | 28   | 男性 | マネージャー   | 800 万  |
| 5   | 田中 | 35   | 女性 | マーケティング | 700 万  |
| 6   | 渡辺 | 40   | 男性 | 経営者         | 1000 万 |
| 7   | 伊藤 | 27   | 女性 | エンジニア     | 650 万  |
| 8   | 中村 | 32   | 男性 | デザイナー     | 550 万  |
| 9   | 小林 | 29   | 女性 | 学生           | 0 万    |
| 10  | 山本 | 31   | 男性 | マネージャー   | 900 万  |

### SELECT

```sql
SELECT * FROM テーブル名;
```

````sql
SELECT 名前, 年齢 FROM メンバー

### AS

```sql
SELECT カラム名 AS 別名 FROM テーブル名;
````

```sql
SELECT 名前 AS 氏名, 年齢 AS 年齢 FROM メンバー;
```

### WHERE

```sql
SELECT * FROM テーブル名 WHERE 条件;
```

年齢が 20 歳以上の人を選ぶ場合:

```sql
SELECT * FROM メンバー WHERE 年齢 >= 20;
```

名前が "山田" の人を選ぶ場合:

```sql
SELECT * FROM メンバー WHERE 名前 = '山田';
```

### ORDER BY

```sql
SELECT * FROM テーブル名 ORDER BY カラム名 [ASC|DESC];
```

複数のカラムでソートする場合:

```sql
SELECT * FROM テーブル名 ORDER BY カラム1 ASC, カラム2 DESC;
```

```sql
SELECT * FROM メンバー ORDER BY 年齢 ASC, 年収 DESC;
```

### GROUP BY

```sql
SELECT カラム名, COUNT(*) FROM テーブル名 GROUP BY カラム名;
```

```sql
SELECT 職業, COUNT(*) FROM メンバー GROUP BY 職業;
```

Where 句と組み合わせる場合:

```sql
SELECT カラム名, COUNT(*) FROM テーブル名 WHERE 条件 GROUP BY カラム名;
```

```sql
SELECT 職業, COUNT(*) FROM メンバー WHERE 年齢 >= 25 GROUP BY 職業;
```

### Having

```sql
SELECT カラム名, COUNT(*) FROM テーブル名 GROUP BY カラム名 HAVING COUNT(*) > 条件;
```

Where との違い:

- `WHERE` はグループ化前にフィルタリングを行う。
- `HAVING` はグループ化後にフィルタリングを行う。

```sql
SELECT 職業, COUNT(*) FROM メンバー GROUP BY 職業 HAVING COUNT(*) > 1;
```
