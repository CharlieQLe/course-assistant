// User data for log in - {name, email, password}
// -Create for making new user
// -Read for displaying current user data
// -Update for editing user profile
// -Delete for potential deletion of account?

//HOME PAGE  

//LOG IN CLICKED

//FUNCTION FOR READING USERS PROFILE ON LOGIN

function readProfile(name, res) {
    reload(filename)
    res.write("<h1> counter [" + name + "] = " + counter[name] + " </h1>");
}

document.getElementById("loginButton").addEventListener('click', () => {

    //popup login modal --> already taken care of via bootstrap
    //Then send a GET request to server for user's profile and read their profile's data
    //If remember me is clicked, stay logged in?

    

})

//SIGN UP CLICKED

document.getElementById("signupButton").addEventListener('click', () => {

    // popup sign up modal --> already taken care of via bootstrap
    //CREATE new user on sign up

})







