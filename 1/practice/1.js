const form = document.getElementById("form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function checkRequired(input) {
  if (input.value.trim() === "" || input.value == null) {
    showError(input, `${getFileName(input)} is required`);
  } else {
    showSuccess(input);
  }
}

function getFileName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function isValidEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    console.log(input.value);
    showSuccess(input);
  } else {
    showError(input, `Email is not valid`);
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFileName(input)} must be at least ${min} characters `
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFileName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function PsasswordMatch(input) {
  const pw = password.value.trim();
  if (input.value.trim() !== pw) {
    showError(input, `Password does not match`);
  }
}

function showError(input, msg) {
  const error = input.nextElementSibling;
  input.parentElement.classList.add("error");
  error.innerText = msg;
}

function showSuccess(input) {

    // classlist add success but sometimes the class aldy got error so still error
    console.log(input.parentElement);
    input.parentElement.className="form-control success";
}

// dom init loading
function DOMinit(e) {
  e.preventDefault();

  const arry = [username, email, password, password2];
  arry.forEach(checkRequired);

  isValidEmail(email);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  PsasswordMatch(password2);
}

// initalize and eventlistener
form.addEventListener("submit", DOMinit);
