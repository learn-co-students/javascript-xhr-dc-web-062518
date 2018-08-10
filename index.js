// function getRepositories() {
//   const req = new XMLHttpRequest();
//   req.open("GET", "http://api.github.com/users/octocat/repos");
//   req.send();
// }
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/octocat/repos");
  req.send();
}

function showRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  let repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        r.name +
        ' - <a href="https://api.github.com/users/octocat//repos/:owner/:repo/commits" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join("")}</ul>`;
  //
  // for (var i = 0; i < this.responseText.length; i++) {
  //   repoList += "<li>" + this.responseText[i]["name"] + "</li>";
  // }
  // repoList += "</ul>";
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits");
  req.send();
}
