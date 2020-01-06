const makePost = post => {
  return `<li>${post.message}</li>`;
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