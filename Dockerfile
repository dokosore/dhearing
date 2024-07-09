# Dockerfile
FROM node:18-alpine

# アプリケーションディレクトリを作成
WORKDIR /app

# アプリケーションの依存関係をインストール
# ワイルドカードを使用して、package.json と package-lock.json の両方をコピー（どちらかが存在する場合）
COPY package*.json ./

RUN npm install
RUN npm install -g firebase-tools

# アプリケーションのソースをバンドル
COPY . .

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
