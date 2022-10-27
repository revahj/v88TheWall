/* Users data */
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

/* Topics data */
let topics = [
    {
        "id":"T1666838655621",
        "user_id": 1666801681673,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum nec feugiat massa adipiscing. Sit at placerat nisi, sed lorem porttitor nulla aliquam fermentum. Mi curabitur consequat congue consectetur erat sed.",
        "responses": ["R1666838880315", "R1666838890083"],
        "created_at": "01/01/2022"
    },
    {
        "id":"T1666838967363",
        "user_id": 1666801679810,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum nec feugiat massa adipiscing. Sit at placerat nisi, sed lorem porttitor nulla aliquam fermentum. Mi curabitur consequat congue consectetur erat sed.",
        "responses": ["R1666838880315", "R1666838890083", "R1666840702976", "R1666840723287"],
        "created_at": "01/02/2022"
    }
]

window.onload = function() {

    let login_btn                   = document.querySelector(".login_btn");
    let signup_btn                  = document.querySelector(".signup_btn");
    let signup_form                 = document.querySelector("#signup_form");
    let login_form                  = document.querySelector("#login_form");
    let forum_post_form             = document.querySelector("#forum_post_form");

    /* To switch to login dashboard */
    login_btn.onclick = toLogIn.bind(login_btn);

    /* To switch to signup dashboard */
    signup_btn.onclick = toSignUp.bind(signup_btn);

    /* To process the signup form */
    signup_form.onsubmit = submitSignupForm.bind(signup_form);

    /* To process the login form*/
    login_form.onsubmit = submitloginForm.bind(login_form);

    /* To show the logout button */
    profile_dropdown.onclick = toShowLogoutBtn.bind(profile_dropdown);

    /* To logout user */
    logout_btn.onclick = logOutUser.bind(logout_btn);

    /* To post a topic */
    forum_post_form.onsubmit = toPostTopic.bind(forum_post_form);

    /* To display all forums on load*/
    diplayAllForumTopics();
}


/**
* DOCU: To switch to login dashboard
* Triggered: on click to login button
* Last Updated Date: October 26, 2022
* @author Jhaver
*/
function toLogIn(event) {
    signup_container.setAttribute("class", "hidden");
    login_container.setAttribute("class", "signup_login_container");
    signup_form.reset();

    /* To remove all validation error */
    let validation_error= signup_container.querySelectorAll(".validation_error");
    for(let validation_error_index=0; validation_error_index < validation_error.length; validation_error_index++) {
        validation_error[validation_error_index].setAttribute("class", "signup_input");
    }
}

/**
* DOCU: To switch to signup dashboard
* Triggered: on submit to signup button
* Last Updated Date: October 26, 2022
* @author Jhaver
*/
function toSignUp(event) {
    signup_container.setAttribute("class", "signup_login_container");
    login_container.setAttribute("class", "hidden");
    login_form.reset();

    /* To remove all validation error */
    let validation_error= login_container.querySelectorAll(".validation_error");
    for(let validation_error_index=0; validation_error_index < validation_error.length; validation_error_index++) {
        validation_error[validation_error_index].setAttribute("class", "login_input");
    }
}

/**
* DOCU: To process the signup form
* Triggered: on submit to signup form
* Last Updated Date: October 26, 2022
* @author Jhaver
*/
function submitSignupForm(event) {
    event.preventDefault();

    let signup_input = signup_container.querySelectorAll(".signup_input");

    /* Looping for inpput validation */
    for(let signup_input_index = 0; signup_input_index < signup_input.length; signup_input_index++) {

        let signup_input_element = signup_input[signup_input_index];

        /* To check of input value */
        if(signup_input_element.value == "") {
            signup_input_element.setAttribute("class", "signup_input validation_error")
        }
        else {
            signup_input_element.setAttribute("class", "signup_input")
        }
    }
    
    /* To process signup */
    if(signup_container.querySelectorAll(".validation_error").length == 0) {
        submit_signup.setAttribute("class", "processing_btn");
        document.querySelector(".signup_processing").textContent="Processing...";

        /* To add user data */
        let first_name_input        = document.querySelector("#first_name_input");
        let last_name_input         = document.querySelector("#last_name_input");
        let email_input             = document.querySelector("#email_input");
        let password_input          = document.querySelector("#password_input");
        let new_user                = {};

        new_user["id"]              = Date.now();
        new_user["first_name"]      = first_name_input.value;
        new_user["last_name"]       = last_name_input.value;
        new_user["email"]           = email_input.value;
        new_user["password"]        = password_input.value;
        new_user["is_login"]        = true;

        users.push(new_user);

        /* To switch to forum dashboard */
        setTimeout(() => {
            signup_container.setAttribute("class", "hidden");
            forum_dashboard.setAttribute("class", "");
            submit_signup.setAttribute("class", "");
            document.querySelector(".signup_processing").textContent="Signup";
            signup_form.reset();
        }, 3000);

        updateUserLoginData();
    };
}

/**
* DOCU: To process the login form
* Triggered: on submit to login form
* Last Updated Date: October 26, 2022
* @author Jhaver
*/
function submitloginForm(event) {
    event.preventDefault();

    let email_login_input           = login_container.querySelector("#email_login_input");
    let password_login_input        = login_container.querySelector("#password_login_input");

    /* To check email validation */
    if(users.some(item => item.email === email_login_input.value) == false){
        email_login_input.setAttribute("class", "login_input validation_error");
        password_login_input.setAttribute("class", "login_input validation_error");
    }
    else {

        email_login_input.setAttribute("class","login_input");
        
        /* To check password validation */
        let email_login_index = users.findIndex(item=> item.email === email_login_input.value);
        if(password_login_input.value == users[email_login_index].password) {
            password_login_input.setAttribute("class","login_input");
            submit_login.setAttribute("class", "processing_btn");
            document.querySelector(".login_processing").textContent="Processing...";

            users[email_login_index].is_login = true;

            setTimeout(() => {
                login_container.setAttribute("class", "hidden");
                forum_dashboard.setAttribute("class", "");
                submit_login.setAttribute("class", "");
                document.querySelector(".login_processing").textContent="Login";
                login_form.reset();
            }, 3000);
            updateUserLoginData()
        }
        else {
            password_login_input.setAttribute("class", "login_input validation_error");
        }
    }
};

/**
* DOCU: To show the logout button
* Triggered: on click to profile button
* Last Updated Date: October 26, 2022
* @author Jhaver
*/
function toShowLogoutBtn(event) {
    let logout_btn = document.querySelector("#logout_btn");
    logout_btn.setAttribute("class", "show_logout_btn");
}

/**
* DOCU: To logout user
* Triggered: on click to logout button
* Last Updated Date: October 26, 2022
* @author Jhaver
*/
function logOutUser(event) {
    /* To switch to login dashboard */
    this.setAttribute("class","");
    forum_dashboard.setAttribute("class", "hidden");
    login_container.setAttribute("class", "signup_login_container");

    /* To change is_login to false */
    let login_user_index = users.findIndex(item=> item.is_login === true);
    users[login_user_index].is_login = false; 
}

/**
* DOCU: To display all forum topics
* Triggered: Upon page onload
* Last Updated Date: October 27, 2022
* @author Jhaver
*/
function diplayAllForumTopics() {

    let clone_container = document.querySelector("#clone_container");
    let forum_topic_item = clone_container.querySelector(".forum_topic_item");
    let forum_topic_list = document.querySelector("#forum_topic_list");

    for(topic_index = 0; topic_index < topics.length; topic_index++) {
        let topic_content               = topics[topic_index].content;
        let topic_id                    = topics[topic_index].id;
        let user_id                     = topics[topic_index].user_id;
        let created_at                  = topics[topic_index].created_at;
        let topic_responses_length      = (topics[topic_index].responses).length;
        let user_index                  = users.findIndex(item=> item.id === user_id);
        let user_first_name             = users[user_index].first_name;
        let user_last_name              = users[user_index].last_name;
        let user_full_name              = user_first_name + " " + user_last_name;

        /* To clone topic template */
        let forum_topic_item_clone = forum_topic_item.cloneNode(true);
        
        /* To display topic data */
        forum_topic_item_clone.setAttribute("data-topic-id", topic_id);
        forum_topic_item_clone.querySelector(".profile_initial").textContent= (user_first_name.charAt(0) + user_last_name.charAt(0));
        forum_topic_item_clone.querySelector(".topic_profile").textContent = user_full_name + " (" + created_at + ") ";
        forum_topic_item_clone.querySelector(".response_info").textContent = topic_responses_length + " Responses";
        forum_topic_item_clone.querySelector("p").textContent = topic_content;

        /*To prepend topic item*/
        forum_topic_list.insertBefore(forum_topic_item_clone, forum_topic_list.children[0]);
    };
}

/**
* DOCU: To update user login data
* Triggered: on signup or login
* Last Updated Date: October 26, 2022
* @author Jhaver
*/
function updateUserLoginData() {
    let login_profile_initials          = document.querySelectorAll(".login_profile_initials");
    let login_user_index                = users.findIndex(item=> item.is_login === true);
    let login_user_first_name           = users[login_user_index].first_name;
    let login_user_last_name            = users[login_user_index].last_name;
    let profile_name                    = document.querySelector(".profile_name");
    let profile_greeting                = document.querySelector(".profile_greeting");

    /* To update login user full name */
    profile_name.textContent = login_user_first_name + " " + login_user_last_name;
    profile_greeting.textContent = login_user_first_name+ ",";

    /* To update login user initials */
    for(login_profile_initials_index = 0; login_profile_initials_index < login_profile_initials.length; login_profile_initials_index++) {
        let login_profile_initials_item = login_profile_initials[login_profile_initials_index];
        login_profile_initials_item.textContent=(login_user_first_name.charAt(0) + login_user_last_name.charAt(0));
    }
}

/**
* DOCU: To post a topic
* Triggered: on submit to forum post form
* Last Updated Date: October 27, 2022
* @author Jhaver
*/
function toPostTopic(event) {
    event.preventDefault();
    
    let topic_textarea                      = document.querySelector("#topic_textarea");

    /* To validate forum post form */
    if (topic_textarea.value  == "") {
        topic_textarea.setAttribute("class", "validation_error");
    }
    else {
        let login_user_index                = users.findIndex(item=> item.is_login === true);
        let clone_container                 = document.querySelector("#clone_container");
        let forum_topic_item                = clone_container.querySelector(".forum_topic_item");
        let forum_topic_list                = document.querySelector("#forum_topic_list");
        let topic_content                   = topic_textarea.value;
        let user_first_name                 = users[login_user_index].first_name;
        let user_last_name                  = users[login_user_index].last_name;
        let created_at                       = new Date().toLocaleDateString();
        let topic_id                        = "T" + Date.now();
        let user_full_name              = user_first_name + " " + user_last_name;
    
        /* To clone topic template */
        let forum_topic_item_clone          = forum_topic_item.cloneNode(true);
    
        /* To display topic data */
        forum_topic_item_clone.setAttribute("data-topic-id", topic_id);
        forum_topic_item_clone.querySelector(".profile_initial").textContent= (user_first_name.charAt(0) + user_last_name.charAt(0));
        forum_topic_item_clone.querySelector(".topic_profile").textContent = user_full_name + " (" + created_at + ") ";
        forum_topic_item_clone.querySelector(".response_info").textContent = "0 Responses";
        forum_topic_item_clone.querySelector("p").textContent = topic_content;
    
        /*To prepend topic item*/
        forum_topic_list.insertBefore(forum_topic_item_clone, forum_topic_list.children[0]);

        /*To reset forum post form*/
        this.reset();
        topic_textarea.setAttribute("class", "");
    }
}
