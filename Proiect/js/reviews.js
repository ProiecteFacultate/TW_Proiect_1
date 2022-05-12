const commentForm = document.getElementById("commentForm")
const nameInput = document.getElementById("nameInput")
const commentInput = document.getElementById("commentInput")
const reviewsList = document.getElementById("reviewsList")

commentForm.onsubmit = () => {
  let name = nameInput.value
  let comment = commentInput.value
  let reqObject = {
    'name': name,
    'comment': comment
  }

  const Http = new XMLHttpRequest();
  const url = 'http://localhost:8080/test';
  Http.open("POST", url, true);

  Http.onreadystatechange = (event) => {
    event.preventDefault()

    if (Http.readyState == 4) {
      if (Http.status == 200) {
        let authorH3 = document.createElement('h3')
        authorH3.innerHTML = "Marcel:"
        authorH3.classList.add("commentAuthor")
        let commentText = document.createElement('p')
        commentText.innerHTML = "Commmment"
        commentText.classList.add("commentText")

        let commentDiv = document.createElement('div')
        commentDiv.append(authorH3)
        commentDiv.append(commentText)

        reviewsList.append(commentDiv)
      }
      else
        alert("ERROR")
    }
  }

  Http.setRequestHeader("Content-Type", "application/json")
  Http.send(JSON.stringify(reqObject));
}