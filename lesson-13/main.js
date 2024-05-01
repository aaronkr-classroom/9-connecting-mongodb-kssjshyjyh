// main.js
"use strict";

const port = 3000,
  express = require("express"),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  app = express(),
  // @TODO: 몽고DB 모듈의 요청
  MongoDB = require("mongodb").MongoClient,
  dbURL = 'mongodb+srv://UT-Node-kssjshyjyh:58V0jYcrpppb11my@ut-node-kssjshyjyh.ryfofzj.mongodb.net/?retryWrites=true&w=majority&appName=UT-Node-kssjshyjyh',
  dbName = 'UT-Node-kssjshyjyh';
// @TODO: 로컬 MongoDB 데이터베이스 서버 연결 설정

MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;

  let db = client.db(dbName);  // UT-Node-ksjshyjyh
  db.collection("contacts")
  .find()
  .toArray((error,client) => {  // contacts 컬렉션
    if (error) throw error;
    console.log(data);
  });
  db.collection("contacts")
  .insertOne({
    name: "Andrew",
    job: "Doctor",
    location: "seoul"
    }, (error, result) => {
      if (error) throw error;
      console.log("result");
    });
})
.then(() => {
  console.log("DB connected!");
})
.catch((error) => {
  console.log("DB connection FAILED!");
  console.log(error);
  process.exit(1);
});

app.set("port", process.env.PORT || port);
app.set("view engine", "ejs");

app.use(layouts);
app.use(express.static("public"));

app.get("/", homeController.getHomePage);
app.get("/name/:myName", homeController.respondWithName2);

/**
 * Listing 11.4 (p. 169)
 * 사용자 정의 메시지를 통한 에러와 없는 라우트 처리
 */
app.use(errorController.logErrors);
app.use(errorController.resNotFound); // main.js에 에러 처리 미들웨어 추가
app.use(errorController.resInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
