// seed.js
"use strict";

/**
 * Listing 15.9 (p. 224)
 * 새로운 데이터 생성
 */
// 모듈 가져오기
const mongoose = require('mongoose'),
      subscriber = require("./models/subscriber");

// 데이터베이스 연결 설정

mongoose.connect(
  "mongodb+srv://UT-Node-kssjshyjyh:58V0jYcrpppb11my@ut-node-kssjshyjyh.ryfofzj.mongodb.net/?retryWrites=true&w=majority&appName=UT-Node-kssjshyjyh", // 데이터베이스 연결 설정 Atlas
  { useNewUrlParser: true }
);

mongoose.connection;

// subscribers 배열 생성 (5개 이상)
var subscribers = [
  {
    name: "a",
    email: "aa",
    phoneNumber: "12345",
  },
  {
    name: "b",
    email: "bb",
    phoneNumber: "45678",
  },
  {
    name: "c",
    email: "cc",
    phoneNumber: "78945",
  },
  {
    name: "d",
    email: "dd",
    phoneNumber: "123456",
  },
  {
    name: "e",
    email: "ee",
    phoneNumber: "741852",
  },
  {
    name: "f",
    email: "ff",
    phoneNumber: "936852",
  },
];

// 기존 데이터 제거

Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscribers deleted!");
  });

var commands = [];

// 프라미스 생성을 위한 구독자 객체 루프

subscribers.forEach(s => {
  commands.push(
    Subscriber.create({
      name: s.name,
      email: s.email,
      phoneNumber: s.phoneNumber
    })
  ); 
});
  
// 프라미스 생성 후 로깅 작업

Promise.all(commands)
    .then((r) => {
      console.log(JSON.stringify(r));
      mongoose.connection.close();
    })
    .catch(e => {
      console.log(`Error ${e}`);
    });