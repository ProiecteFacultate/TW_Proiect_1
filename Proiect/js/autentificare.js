window.onload = () => {
    const signInDiv = document.getElementById("signInDiv")
    const signInForm = document.getElementById("signInForm")
    const signInUsernameInput = document.getElementById("signInUsernameInput")
    const signInPasswordInput = document.getElementById("signInPasswordInput")
    const signInResponseH3 = document.getElementById("signInResponseH3")
    const switchToSignUpButton = document.getElementById("switchToSignUpButton")

    const signUpDiv = document.getElementById("signUpDiv")
    const signUpForm = document.getElementById("signUpForm")
    const signUpUsernameInput = document.getElementById("signUpUsernameInput")
    const signUpPasswordInput = document.getElementById("signUpPasswordInput")
    const signUpResponseH3 = document.getElementById("signUpResponseH3")
    const switchToSignInButton = document.getElementById("switchToSignInButton")

    signUpDiv.style.display = "none"
}


signInForm.onsubmit = (event) => {
    event.preventDefault()

    let usernameValue = signInUsernameInput.value
    let passwordValue = signInPasswordInput.value
    let reqObject = {
        'Username': usernameValue,
        'Password': passwordValue
    }
    //   console.log(reqObject)

    const Http = new XMLHttpRequest();
    const url = 'http://localhost:8080/signIn';
    Http.open("POST", url, false);

    Http.onreadystatechange = () => {
        if (Http.readyState == 4) {
            if (Http.status == 200) {
                let resObject = Http.responseText
                if (resObject == "Succes")
                    window.location.href = "home.html"
                else
                    signInResponseH3.innerHTML = resObject

            }
            else
                alert("ERROR")
        }
    }

    Http.setRequestHeader("Content-Type", "application/json")
    Http.send(JSON.stringify(reqObject));
}


///////////////////////////////////////////////////////////////////////////

signUpForm.onsubmit = (event) => {
    event.preventDefault()

    let usernameValue = signUpUsernameInput.value
    let passwordValue = signUpPasswordInput.value
    let reqObject = {
        'Username': usernameValue,
        'Password': passwordValue
    }
    //   console.log(reqObject)

    const Http = new XMLHttpRequest();
    const url = 'http://localhost:8080/signUp';
    Http.open("POST", url, false);

    Http.onreadystatechange = () => {
        if (Http.readyState == 4) {
            if (Http.status == 200) {
                let resObject = Http.responseText
                if (resObject == "Succes")
                    window.location.href = "home.html"
                else
                    signUpResponseH3.innerHTML = resObject

            }
            else
                alert("ERROR")
        }
    }

    Http.setRequestHeader("Content-Type", "application/json")
    Http.send(JSON.stringify(reqObject));
}

//////////////////////////////////////////////////////

switchToSignUpButton.onclick = () =>
{
    signInDiv.style.display = "none"
    signUpDiv.style.display = "flex"
}

switchToSignInButton.onclick = () =>
{
    signUpDiv.style.display = "none"
    signInDiv.style.display = "flex"
}