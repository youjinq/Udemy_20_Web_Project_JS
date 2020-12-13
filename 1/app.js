const form = document.getElementById("form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


// **************************************{Function of event listener}***********************************************

// show Error outline
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// show Success outline
function showSuccess(input) {
  const formControl = input.parentElement;
    // classname include add, classlist add the new one
  formControl.className = "form-control success";
}

// check email if valid

function isValidEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid`);
  }
}

// check reuqired
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    // trim to remove all blank space
    if (input.value.trim() === "") {
      showError(input, `${getFileName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}


// check length
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

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `Password doest not match`);
    console.log("no match");
  }
}

// get file name
function getFileName(input) {
  // capital letter
  // console.log(input);
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);

}


// **************************************{Event listener}***********************************************


// autoloading for error checking
form.addEventListener("submit", function (e) {
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  isValidEmail(email);
  checkPasswordMatch(password, password2);

  e.preventDefault();
});
