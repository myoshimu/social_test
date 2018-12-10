# Twitter 感情分析サンプル
Google Cloud Platform の BigQuery, AppEngine, データポータル、Natural Language API を使ったソーシャル感情分析ダッシュボードのデモです。

Twitter API 経由で特定のハッシュタグを含むツイートを受け取ると Natural Language API 経由で感情分析した結果を BigQuery にストリーミングします。

## 事前準備
* git のインストール - https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
* node のインストール - https://nodejs.org/en/
* Google Cloud Compute Engine 上で動作させるためには API のスコープを適切に設定してください。


## 設定
1. ``git clone https://github.com/myoshimu/social_test.git``
2. ``npm install``
3. https://apps.twitter.com/ で Twitter API キーを発行し .env ファイルに記述します。
4. Big Query にデータセットとテーブル作成
    * ``bq mk twitter``
    * ``bq mk --schema HashTag:STRING,Tweet:STRING,SentimentScore:FLOAT,SentimentMagnitude:FLOAT,InsertDate:STRING -t twitter.twitter_stream``
5. .env ファイルの GCP プロジェクト ID を BigQuery のテーブルを含んでいるものに更新
6. ``app.js`` のハッシュタグを変更

## アプリケーション実行
VM もしくは AppEngine でそれぞれ以下のように起動してください。

### VM で起動する場合
``node app.js``

### App Engine で起動する場合
``gcloud app deploy``
