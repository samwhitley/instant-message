const timeHelpers = require('./timeHelpers');

const getUsers = data => {
  let users = {};

  for (let i = 0; i < data.users.length; i++) {
    let user = data.users[i];

    users[user.id] = {
      "username": user.username,
      "real_name": user.real_name,
      "verified": user.verified
    }
  }

  return users;
};

const makePost = (post, user) => {
  const timeSince = `${timeHelpers.timeSince(post.ts)} ago`;
  const userHeading = `${user.real_name} - @${user.username}`;
  const userImg = `<img src='images/${user.username}.jpg' alt='${user.real_name}' />`;

  return `
  <li>
    <p>${userImg}</p>
    <p>${userHeading}</p>
    <p>${timeSince}</p>
    <p>${post.message}</p>
  </li>`;
};

const makeList = data => {
  const users = getUsers(data);
  let list = '<ul class="messages">';

  for (let i = 0; i < data.posts.length; i++) {
    let post = data.posts[i];
    list += makePost(post, users[post.user]);
  }

  list += '</ul>';
  return list;
};

module.exports = {
  makePost,
  makeList
};