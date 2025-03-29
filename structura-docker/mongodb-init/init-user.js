// admin 데이터베이스에 연결
db = db.getSiblingDB("admin");

// ✅ 관리자 사용자 생성 (권한 부여)
if (db.getUsers().length === 0) {
  db.createUser({
    user: "admin",
    pwd: "admin2025",
    roles: [
      { role: "root", db: "admin" }
    ]
  });
  print("✅ 관리자 사용자(admin) 생성 완료!");
} else {
  print("⚠️ 관리자가 이미 생성되었습니다.");
}

// ✅ MongoDB 클러스터에 필요한 사용자 생성
db = db.getSiblingDB("structura");

if (db.getUsers().length === 0) {
  db.createUser({
    user: "structura",
    pwd: "structura2025",
    roles: [
      { role: "readWrite", db: "structura" }
    ]
  });
  print("✅ structura 데이터베이스 사용자(structura) 생성 완료
