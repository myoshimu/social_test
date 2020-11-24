# Twitter 感情分析サンプル
Google Cloud Platform の BigQuery, AppEngine, データポータル、Natural Language API を使ったソーシャル感情分析ダッシュボードのデモです。
Twitter API 経由で特定のハッシュタグを含むツイートを受け取ると Natural Language API 経由で感情分析した結果を BigQuery にストリーミングします。
詳細は[こちら](https://medium.com/google-cloud-jp/appengine-%E3%81%A8-nlp-api-%E3%81%A8-bigquery-%E3%81%A7-1-%E6%99%82%E9%96%93%E3%81%A7%E3%82%BD%E3%83%BC%E3%82%B7%E3%83%A3%E3%83%AB%E5%88%86%E6%9E%90%E3%83%80%E3%83%83%E3%82%B7%E3%83%A5%E3%83%9C%E3%83%BC%E3%83%89%E3%82%92%E4%BD%9C%E6%88%90%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B-9b42f8f05f17)を参照ください。

## 事前準備
* git のインストール - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
* node のインストール - https://nodejs.org/en/
* Google Cloud Compute Engine 上で動作させるためには API のスコープを適切に設定してください。


## 設定
1. GCP コンソールで以下を有効にする
    * Cloud Natural Language API
    * BigQuery API

2. ``git clone https://github.com/myoshimu/social_test.git``
3. ``npm install``
4. https://apps.twitter.com/ で Twitter API キーを発行し .env ファイルに記述します。
5. Big Query にデータセットとテーブル作成
    * ``bq mk twitter``
    * ``bq mk --schema HashTag:STRING,Tweet:STRING,SentimentScore:FLOAT,SentimentMagnitude:FLOAT,InsertDate:STRING -t twitter.twitter_stream``
6. .env ファイルの GCP プロジェクト ID を BigQuery のテーブルを含んでいるものに更新
7. ``app.js`` のハッシュタグを変更


## アプリケーション実行
VM もしくは AppEngine でそれぞれ以下のように起動してください。

### VM で起動する場合
``node app.js``

### App Engine で起動する場合
``gcloud app deploy``
