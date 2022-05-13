const commentForm = document.getElementById("commentForm")
const nameInput = document.getElementById("nameInput")
const commentInput = document.getElementById("commentInput")
const reviewsList = document.getElementById("reviewsList")

commentForm.onsubmit = (event) => {
  event.preventDefault()
  
  let nameValue = nameInput.value
  let commentValue = commentInput.value
  let reqObject = {
    'Author': nameValue,
    'Comment': commentValue
  }
  console.log(reqObject)

  const Http = new XMLHttpRequest();
  const url = 'http://localhost:8080/test';
  Http.open("POST", url, true);

  Http.onreadystatechange = () => {
    if (Http.readyState == 4) {
      if (Http.status == 200) {
        let resObject = JSON.parse(Http.responseText)

        let authorH3 = document.createElement('h3')
        authorH3.innerHTML = "Author: " + resObject['Author']
        authorH3.classList.add("commentAuthor")

        let commentText = document.createElement('p')
        commentText.innerHTML = resObject['Comment']
        commentText.classList.add("commentText")

        let commentDiv = document.createElement('div')
        commentDiv.classList.add("commentDiv")
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