const postHelpers = require('./postHelpers'),
      config = require('./config');

const myUser = {
  "id": 4,
  "client": true,
  "verified": false
};

const $postEntry = document.querySelector('.postEntry'),
      $postSubmit = document.querySelector('.postSubmit'),
      $postList = document.querySelector('.posts');

const handleSubmit = e => {
  let entry = $postEntry.value.trim();

  if (entry === '') {
    alert('Post cannot be empty!');
  }
  else {
    let post = {
      id: 12345,
      message: entry,
      user: myUser.id,
      ts: Math.round((new Date()).getTime() / 1000)
    };

    fetch(config.apiServer.url, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(post)
    })
    .then(res => res.json())
    .then(res => {
      console.log(`posted to api and got response:`);
      console.log(res);

      let postHtml = postHelpers.makePost(post, myUser);
      let tempPost = document.createElement("li");
      tempPost.innerHTML = postHtml.trim();
      let postDOM = tempPost.firstChild;
  
      $postList.appendChild(postDOM);
      $postEntry.value = '';
      $postEntry.focus();
      window.scrollTo(0,document.body.scrollHeight);
    });
  }
};

$postEntry.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    handleSubmit();
  }
});
$postSubmit.addEventListener('click', handleSubmit);

$postEntry.focus();