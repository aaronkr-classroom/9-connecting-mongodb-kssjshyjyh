// ./models/subscriber.js
"use strict";

/**
 * @TODO: Listing 14.3 (p. 206)
 * 스키마 정의
 */
const mongoose = require('mongoose'),
    subscriberschema = mongoose.Schema({
        name: String,
        email: String,
        newsletter: Boolean
    });

module.exports = mongoose.model(
    "subscriber",
    subscriberschema
);


// Subscriber 모델 생성
