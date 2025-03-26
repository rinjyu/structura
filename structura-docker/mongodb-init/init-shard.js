db = db.getSiblingDB("admin");

// ✅ 샤드 추가
if (sh.status().shards.length === 0) {
  sh.addShard("shard1ReplSet/mongo-shard1:27018");
  sh.addShard("shard2ReplSet/mongo-shard2:27020");
  print("✅ 샤드 추가 완료!");
} else {
  print("⚠️ 샤드가 이미 추가되었습니다.");
}

// ✅ 샤딩 활성화
if (!sh.status().databases.structura) {
  sh.enableSharding("structura");
  print("✅ structura 데이터베이스에 샤딩 활성화 완료!");
} else {
  print("⚠️ structura 데이터베이스는 이미 샤딩이 활성화되었습니다.");
}

// ✅ 샤드 키를 설정하여 컬렉션 샤딩
db = db.getSiblingDB("structura");

// 컬렉션 존재 여부 확인 후 샤딩 진행
if (!db.getCollectionNames().includes("user")) {
  db.createCollection("user");
  print("✅ user 컬렉션 생성 완료!");
}

// 샤드 키 인덱스 생성
db.user.createIndex({ _id: "hashed" });

// 컬렉션에 샤딩 적용
sh.shardCollection("structura.user", { _id: "hashed" });

print("✅ MongoDB 샤드 및 컬렉션 설정 완료!");
