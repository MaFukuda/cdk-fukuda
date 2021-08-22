# CloudWatch Logs Insights

## 検索クエリ

parse '* - * [*] "* * *" * * * *' as host, identity, dateTimeString, httpVerb, url, protocol, statusCode, bytes, referrer, userAgent
| filter statusCode like /(4\d\d)/

## 公式ドキュメント

Amazon CloudWatch ユーザーガイド > CloudWatch Logs Insights を使用したログデータの分析 > サポートされるログと検出されるフィールド
https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/logs/CWL_AnalyzeLogData-discoverable-fields.html