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
        "responses": ["R1666880797718"],
        "created_at": "01/01/2022"
    },
    {
        "id":"T1666838967363",
        "user_id": 1666801679810,
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum nec feugiat massa adipiscing. Sit at placerat nisi, sed lorem porttitor nulla aliquam fermentum. Mi curabitur consequat congue consectetur erat sed.",
        "responses": ["R1666880910858", "R1666880951120", "R1666880962504"],
        "created_at": "01/02/2022"
    }
]

/* Responses data */
let responses = [
    {
        "id": "R1666880797718",
        "user_id": "1666801681673",
        "content": "That is a great prototype",
        "responses": [],
        "created_at": "01/01/2022"
    },
    {
        "id": "R1666880910858",
        "user_id": "1666801679810",
        "content": "I agree on that",
        "responses": [],
        "created_at": "01/01/2022"
    },
    {
        "id": "R1666880951120",
        "user_id": "1666801681673",
        "content": "Awesome prototype",
        "responses": [],
        "created_at": "01/01/2022"
    },
    {
        "id": "R1666880962504",
        "user_id": "1666801679810",
        "content": "The UX is amazing",
        "responses": [],
        "created_at": "01/01/2022"
    }
]

window.onload = function() {

    let login_btn                   = document.querySelector(".login_btn");
    let signup_btn                  = document.querySelector(".signup_btn");
    let signup_form                 = document.querySelector("#signup_form");
    let login_form                  = document.querySelector("#login_form");
    let forum_post_form             = document.querySelector("#forum_post_form");
    let close_modal_btn             = document.querySelector("#close_modal_btn");
    let response_form               = document.querySelector("#response_form");
    
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

    /* To close forum modal */
    close_modal_btn.onclick = toCloseForumModal.bind(close_modal_btn);

    /* To display all forums on load*/
    diplayAllForumTopics();

    response_form.onsubmit = toPostResponse.bind(response_form);

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
        }, 1000);

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
            }, 1000);
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
        forum_topic_item_clone.querySelector("button").setAttribute("id", topic_id);
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
        toGetLoginUserData();

        let clone_container                 = document.querySelector("#clone_container");
        let forum_topic_item                = clone_container.querySelector(".forum_topic_item");
        let forum_topic_list                = document.querySelector("#forum_topic_list");
        let topic_content                   = topic_textarea.value;
        let created_at                      = new Date().toLocaleDateString();
        let topic_id                        = "T" + Date.now();
    
        /* To clone topic template */
        let forum_topic_item_clone          = forum_topic_item.cloneNode(true);
    
        /* To display topic data */
        forum_topic_item_clone.querySelector("button").setAttribute("id", topic_id);
        forum_topic_item_clone.querySelector(".profile_initial").textContent= is_login_user_first_name.charAt(0) + is_login_user_last_name.charAt(0);
        forum_topic_item_clone.querySelector(".topic_profile").textContent = is_login_user_first_name + " " + is_login_user_last_name + " (" + created_at + ") ";
        forum_topic_item_clone.querySelector(".response_info").textContent = "0 Responses";
        forum_topic_item_clone.querySelector("p").textContent = topic_content;
    
        /*To prepend topic item*/
        forum_topic_list.insertBefore(forum_topic_item_clone, forum_topic_list.children[0]);

        /* To reset forum post form*/
        this.reset();
        topic_textarea.setAttribute("class", "");

        /* To add new topic data */
        let new_topic                       = {};
        new_topic["id"]                     = topic_id;
        new_topic["user_id"]                = is_login_user_id;
        new_topic["content"]                = topic_content;
        new_topic["responses"]              = [];
        new_topic["created_at"]             = created_at;

        topics.push(new_topic);
    }
}

/**
* DOCU: To close forum modal
* Triggered: on click to close btn
* Last Updated Date: October 27, 2022
* @author Jhaver
*/
function toCloseForumModal(event) {
    let forum_modal = document.querySelector("#forum_modal");
    forum_modal.setAttribute("class", "hidden");
}

/**
* DOCU: To show forum modal
* Triggered: on click to topic button
* Last Updated Date: October 27, 2022
* @author Jhaver
*/
function toShowForumModal(clicked_id) {
    /* To show the modal */
    let forum_modal = document.querySelector("#forum_modal");
    forum_modal.setAttribute("class", "");

    /* To get topic data */
    let topic_id                            = clicked_id;
    let topic_index                         = topics.findIndex(item=> item.id === topic_id);
    let topic_user_id                       = topics[topic_index].user_id;
    let topic_content                       = topics[topic_index].content;
    let topic_created_at                    = topics[topic_index].created_at;
    let topic_user_index                    = users.findIndex(item=> item.id === topic_user_id);
    let topic_user_full_name                = users[topic_user_index].first_name + " " + users[topic_user_index].last_name;
    let topic_user_initial                  = users[topic_user_index].first_name.charAt(0) + users[topic_user_index].last_name.charAt(0)
    let topic_responses                     = topics[topic_index].responses;
    let forum_reponse_list                  = document.querySelector("#forum_reponse_list");

    /* To display topic data to the modal */
    forum_modal.querySelector(".topic_profile").textContent = topic_user_full_name + " (" + topic_created_at + ")";
    forum_modal.querySelector(".forum_info").querySelector(".profile_initial").textContent = topic_user_initial;
    forum_modal.querySelector("h2").textContent = topic_content;
    forum_modal.querySelector("h3").textContent = "Responses (" + topic_responses.length + ")";
    
    /* To display responses */
    forum_reponse_list.replaceChildren();
    for(let topic_response_index = 0; topic_response_index < topic_responses.length; topic_response_index++) {

        /* To clone response template */
        let forum_reponse_item_clone = document.querySelector("#clone_container").querySelector(".forum_reponse_item").cloneNode(true);

        /* To get response data */
        let response_id                     = topic_responses[topic_response_index]
        let response_index                  = responses.findIndex(item=> item.id === response_id);
        let response_user_id                = responses[response_index].user_id;
        let response_content                = responses[response_index].content;
        let response_created_at             = responses[response_index].created_at;
        let response_user_index             = users.findIndex(item=> item.id === parseInt(response_user_id));
        let response_user_first_name        = users[response_user_index].first_name;
        let response_user_last_name         = users[response_user_index].last_name;
        let response_user_initials          = response_user_first_name.charAt(0) + response_user_last_name.charAt(0);

        /* To display response data */
        forum_reponse_item_clone.querySelector(".profile_initial").textContent = response_user_initials;
        forum_reponse_item_clone.querySelector(".topic_profile").textContent = response_user_first_name + " " + response_user_last_name + " (" + response_created_at + ")";
        forum_reponse_item_clone.querySelector("p").textContent = response_content;
        forum_modal.setAttribute("data-topic-id", topic_id);

        /* To prepend response */
        forum_reponse_list.appendChild(forum_reponse_item_clone);
    }
}

/**
* DOCU: To post a response
* Triggered: on ubmit to response form
* Last Updated Date: October 28, 2022
* @author Jhaver
*/
function toPostResponse(event) {
    event.preventDefault();
    
    let response_textarea = this.querySelector("#response_textarea");

    // console.log(response_textarea.value);

    /* To validate response form */
    if (response_textarea.value == "") {
        response_textarea.setAttribute("class", "validation_error");
    }
    else {
        
        toGetLoginUserData();
        let forum_reponse_item_clone    = document.querySelector("#clone_container").querySelector(".forum_reponse_item").cloneNode(true);
        let forum_reponse_list          = document.querySelector("#forum_reponse_list");

        /* To display the new response */
        forum_reponse_item_clone.querySelector(".profile_initial").textContent = is_login_user_first_name.charAt(0) + is_login_user_last_name.charAt(0);
        forum_reponse_item_clone.querySelector(".topic_profile").textContent = is_login_user_first_name + " " + is_login_user_last_name + " (" + new Date().toLocaleDateString() + ")";
        forum_reponse_item_clone.querySelector("p").textContent = response_textarea.value;

        

        forum_reponse_list.appendChild(forum_reponse_item_clone);



        /* To push response data */
        let new_response = {};
        let new_response_id = "R" + Date.now()
        new_response["id"] = new_response_id;
        new_response["user_id"] = is_login_user_id;
        new_response["content"] = response_textarea.value;
        new_response["responses"] = [];
        new_response["created_at"] = new Date().toLocaleDateString();
        responses.push(new_response);

        let data_topic_id = document.querySelector("#forum_modal").getAttribute("data-topic-id");
        let data_topic_index = topics.findIndex(item=> item.id === data_topic_id);
        topics[data_topic_index].responses.push(new_response_id);
        document.querySelector("#forum_modal").querySelector("h3").textContent = "Responses (" + topics[data_topic_index].responses.length + ")";

        /* To reset the reponse form */
        response_textarea.setAttribute("class", "");
        this.reset();
    }
}

/**
* DOCU: To get data of login user
* Triggered: On posting a topic and response
* Last Updated Date: October 28, 2022
* @author Jhaver
*/
function toGetLoginUserData() {
    let is_login_user_index      = users.findIndex(item=> item.is_login === true);
    is_login_user_first_name     = users[is_login_user_index].first_name;
    is_login_user_last_name      = users[is_login_user_index].last_name;
    is_login_user_id             = users[is_login_user_index].id;
}
