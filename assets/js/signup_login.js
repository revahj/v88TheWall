

// window.localStorage.clear();


/* Initial users data */
let users = [
    {
        "id": 1666801681673,
        "first_name": "Jhaver",
        "last_name": "Gurtiza",
        "email": "jgurtiza@village88.com",
        "password": "Jhaver!",
        "is_login": false
    },
    {
        "id": 1666801679810,
        "first_name": "Demy",
        "last_name": "Balanza",
        "email": "dbalanza@village88.com",
        "password": "Demy!",
        "is_login": false
    }
];

/* Local storage handling of uers data*/
if (window.localStorage.getItem('users_data') == null) {
    window.localStorage.setItem('users_data', JSON.stringify(users));
}

console.log(window.localStorage.getItem('users_data'));


window.onload = function() {

    document.querySelector("#signup_form").addEventListener("submit", submitSignUpForm)         /* To submit signup form */






}


/**
* DOCU: To submit signup form
* Triggered: on submit to signup form
* Last Updated Date: October 26, 2022
* @author Jhaver
*/
function submitSignUpForm(e) {
    e.preventDefault();

    let signup_input = signup_container.querySelectorAll(".signup_input");

    /* Looping for input validation */
    for(let signup_input_index = 0; signup_input_index < signup_input.length; signup_input_index++) {

        let signup_input_element = signup_input[signup_input_index];

        /* To check of input value */
        if(signup_input_element.value == "") {
            signup_input_element.setAttribute("class", "signup_input validation_error");
        }
        else {
            signup_input_element.setAttribute("class", "signup_input");
        }
    }

    /* To process signup */
    if(signup_container.querySelectorAll(".validation_error").length == 0) {
        submit_signup.setAttribute("class", "processing_btn");
        document.querySelector(".signup_processing").textContent="Processing...";

        let new_user = {
            "id": Date.now(),
            "first_name": document.querySelector("#first_name_input").value,
            "last_name": document.querySelector("#last_name_input").value,
            "email": document.querySelector("#email_input").value,
            "password": document.querySelector("#password_input").value,
            "is_login": true
        };


        /* To switch to forum dashboard */
        setTimeout(() => {
            // document.querySelector("#forum_dashboard_link").click();
        }, 3000);
    };
}

