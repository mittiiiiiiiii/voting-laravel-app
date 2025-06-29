# 投票アプリ
- Laravel + Reactで実装

## 環境構築手順

```bash
$ make for-linux-env # Linux environment only
$ make install

# 権限の設定（必要に応じて）
$ make app-root
$ chown -R 1000:1000 "/home/phper/.npm" # 場合によって 1000 ではない 1001, 1002 など
$ exit

# npm install
$ make app
$ npm install
$ npm run dev
```

## ログ確認

```bash
$ tail -f storage/logs/laravel.log
```

```bash
docker exec -it <php-container-name> bash
```

# できたところまで

- ユーザーが投票テーマを作成
- 他のユーザーが投票できる
- 関係DB設計（ユーザー×テーマ×投票）を構築

# 修正すべきエラー集

- emailの正しく無い形式でのエラー
    - エラーがでない
    - 'required|email:rfc,dns'を入れると正確な値を入れてもエラーが出る
