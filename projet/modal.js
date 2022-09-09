function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const btnCloseModal = document.getElementById("close");
const btnCloseModal2 = document.getElementById("closeVerif");
const btnCrossModal2 = document.getElementById("closeVerif2");
const modalbg2 = document.querySelector(".modalValideReserve");

//  validation form
function validation(event) {
  event.preventDefault();

  //  DOM elements form
  var problems = 0;

  var first = document.forms["reserve"]["first"];
  var last = document.forms["reserve"]["last"];
  var email = document.forms["reserve"]["email"];
  var birthdate = document.forms["reserve"]["birthdate"];
  var quantity = document.forms["reserve"]["quantity"];
  var cities = document.querySelectorAll('input[type="radio"]');
  var acceptedConditionsUtilisation = document.forms["reserve"]["checkbox1"];

  var today = new Date();
  const email_regex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //  Validation firstname
  if (first.value.trim().length < 2) {
    problems = errorMessage(
      "errFirst",
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
      problems
    );
    first.style.borderColor = "red";
  }else{
    console.log(first.value.trim().length);
    document.getElementById("errFirst").innerHTML = "";
  }

  //  Validation lastname
  if (last.value.trim().length < 2) {
    problems = errorMessage(
      "errLast",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
      problems
    );
    last.style.borderColor = "red";
  }else{
    document.getElementById("errLast").innerHTML = "";
  }

  //  Validation email
  if (!email_regex.test(email.value.trim())) {
    problems = errorMessage(
      "errEmail",
      "Veuillez entrez une adresse mail valide.",
      problems
    );
    email.style.borderColor = "red";
  }else{
    document.getElementById("errEmail").innerHTML = "";

  }

  //  Validation birthday
  if (
    birthdate.value === "" ||
    +birthdate.value.slice(0, 4) < today.getFullYear() - 100 ||
    +birthdate.value.slice(0, 4) > today.getFullYear() - 10
  ) {
    problems = errorMessage(
      "errBirthday",
      "Vous devez entrer votre date de naissance.",
      problems
    );
    birthdate.style.borderColor = "red";
  }else{
    document.getElementById("errBirthday").innerHTML = "";
  }

  //  Validation nb participation
  if (
    quantity.value.trim() === "" ||
    +quantity.value.trim() > 99 ||
    +quantity.value.trim() < 0
  ) {
    problems = errorMessage(
      "errQuantity",
      "Veuillez entrer un nombre entre 0 et 99 pour ce champ.",
      problems
    );
    quantity.style.borderColor = "red";
  }else{
    document.getElementById("errQuantity").innerHTML = "";
  }

  //  Validation cities
  var i = 0;
  var checkCity = false;
  while (i < cities.length) {
    if (cities[i].checked) {
      checkCity = true;
      break;
    } else {
      i++;
    }
  }
  if (!checkCity) {
    problems = errorMessage(
      "errCities",
      "<br>Vous devez choisir une option.",
      problems
    );
  }else{
    document.getElementById("errCities").innerHTML = "";
  }

  //  Validation of the privacy policy
  if (!acceptedConditionsUtilisation.checked) {
    problems = errorMessage(
      "errConditionsUtilisation",
      "<br>Vous devez vérifier que vous acceptez les termes et conditions.",
      problems
    );
  } else {
    document.getElementById("errConditionsUtilisation").innerHTML = "";
  }

  //  Validation of the form if everything is ok
  if (problems === 0) {
    document.forms["reserve"].reset();
    document.querySelector(".modalValideReserve").style.display = "block";
    document.querySelector(".bground").style.display = "none";
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
btnCloseModal.addEventListener("click", closeModal);
btnCloseModal2.addEventListener("click", closeModal);
btnCrossModal2.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
  modalbg2.style.display = "none";
}

// return error message __ count and declare error
function errorMessage(elementById, ErrorMessage, nbERROR) {
  document.getElementById(elementById).innerHTML = ErrorMessage;
  nbERROR++;
  return nbERROR;
}
