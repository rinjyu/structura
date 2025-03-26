#!/bin/bash
echo "⏳ MongoDB 샤드 클러스터 설정 시작..."

# 1️⃣ MongoDB가 실행될 때까지 대기
until mongosh --host mongo-router --eval "db.runCommand({ ping: 1 })" &>/dev/null; do
  echo "⏳ MongoDB가 아직 시작되지 않았습니다. 대기 중..."
  sleep 5
done

echo "✅ MongoDB 시작됨!"

# 2️⃣ 샤드 초기화 스크립트 실행
mongosh --host mongo-router --file "/docker-entrypoint-initdb.d/init-shard.js"

echo "✅ MongoDB 샤드 클러스터 설정 완료!"
