# TODOアプリ
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
