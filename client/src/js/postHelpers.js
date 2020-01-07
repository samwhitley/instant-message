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
  const clientClass = user.client ? `class='client'` : '';
  const timeSince = `<span class='timeHeading'>${timeHelpers.timeSince(post.ts)}</span>`;
  let userHeading = ``;
  let userImg = ``;

  if (user.username && user.real_name) {
    userHeading = `<span class='userHeading'>${user.real_name} - @${user.username}</span>`;
    userImg = `<div class='imgWrap'><img src='images/${user.username}.jpg' alt='${user.real_name}' /></div>`;
  }
  else {
    userImg = `<div class='imgWrap anon'><img src='images/better-icon.svg' alt='anonymous user' /></div>`;
  }

  return `
  <li ${clientClass}>
    ${userImg}
    <div class='messageWrap'>
      <div class='postMeta'>
        ${userHeading} ${timeSince}
      </div>
      <div class='postContent'>
        <p>${post.message}</p>
      </div>
    </div>
  </li>`;
};

const makeList = data => {
  const users = getUsers(data);
  let list = '<ul class="posts">';

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