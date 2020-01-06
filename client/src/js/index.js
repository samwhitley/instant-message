const messages = require('./messages');

let dummyPost = {
  "id": 2374237842,
  "user": 1,
  "message": "Take this! My love, my anger, and all of my sorrow!",
  "ts": 1337774582
};

console.log('index with messages!');
console.log(messages.makePost(dummyPost));