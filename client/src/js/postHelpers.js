const timeHelpers = require('./timeHelpers');

const makePost = post => {
  const timeSince = `${timeHelpers.timeSince(post.ts)} ago`;

  return `
  <li>
    <p>${timeSince}</p>
    <p>${post.message}</p>
  </li>`;
};

const makeList = data => {
  let list = '<ul class="messages">';

  for (let i = 0; i < data.posts.length; i++) {
    list += makePost(data.posts[i]);
  }

  list += '</ul>';
  return list;
};

module.exports = {
  makePost,
  makeList
};