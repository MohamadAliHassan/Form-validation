const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show input error message
function showError(input, message) {
  //Försök nå form control diven från HTML
  const formControl = input.parentElement;
  //Overwrite the class
  formControl.className = "form-control error";

  //Ändra error message small tagen till något annat using innerText. querySelector takes in class, id and tags.
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// check email validation
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//Match password
function matchedPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

//Check required fields and email validation
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldNames(input)} is required`);
    } else if (!validateEmail(email.value.trim())) {
      showError(input, `${getFieldNames(input)} is not valid`);
    } else {
      showSuccess(input);
    }
  });
}

//Check the input lenght
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldNames(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > min) {
    showError(
      input,
      `${getFieldNames(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//Gör att alla input fields har ett stort bokstav i ordet.
function getFieldNames(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1); //We´re adding the rest of the word without the first word and thats why we are using slice. We are not including the first which is a 0 indexed.
}

//Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault(); //Prevent it from sending a request to the backend.

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15); //A minimum of 3 and max 15 for the lenght of the username
  checkLength(password, 5, 20);
  validateEmail();
  matchedPassword(password, password2);
});
