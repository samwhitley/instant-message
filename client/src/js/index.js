const postHelpers = require('./postHelpers');

const myUser = {
  "id": 4,
  "username": "baratunde",
  "real_name": "Baratunde",
  "verified": false
};

const $postEntry = document.querySelector('.postEntry'),
      $postSubmit = document.querySelector('.postSubmit'),
      $postList = document.querySelector('.posts');

const handleSubmit = e => {
  let entry = $postEntry.value;

  if (entry === '') {
    alert('Post cannot be empty!');
  }
  else {
    let post = postHelpers.makePost({
      id: 12345,
      message: entry,
      user: myUser.id,
      ts: 1337968739
    }, myUser);

    let tempPost = document.createElement("li");
    tempPost.innerHTML = post.trim();
    let postHtml = tempPost.firstChild;

    $postList.appendChild(postHtml);
    $postEntry.value = '';
  }
};

$postSubmit.addEventListener('click', handleSubmit);