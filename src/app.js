import "./index.html";
import "./styles/main.scss";
const cities = require("./cities.json");
const univerList =
  "http://universities.hipolabs.com/search?country=United+Kingdom";

const form = document.getElementById("form");
const sendBtn = document.getElementById("sendButton");
const statusBtn = document.getElementById("statusButton");
const citySelect = document.getElementById("city");
const univerSelect = document.getElementById("university");
const setStatus = document.getElementById("setStatus");
const showStatus = document.getElementById("showStatus");
const setStatusBlock = document.getElementById("set-status");

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  // hour: "numeric",
  // minute: "numeric",
  // second: "numeric",
  timezone: "UTC",
};

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateForm(form)) {
    const now = new Date();
    const date = now.toLocaleString("ru", options);
    const time = now.toLocaleTimeString();

    const fullDate = `последние изменения ${date} в ${time}`;
    sendBtn.nextElementSibling.textContent = fullDate;
    localStorage.setItem("fullDate", fullDate);

    const data = {
      city: form.elements.city.value,
      university: form.elements.university.value,
      password: form.elements.password.value,
      confirmPassword: form.elements.confirmPassword.value,
      email: form.elements.email.value,
      checkbox: form.elements.agreement.checked,
    };

    console.log(JSON.stringify(data));
  }
});

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.city)) {
    valid = false;
  }
  if (!validateField(form.elements.university)) {
    valid = false;
  }
  if (!validateField(form.elements.email)) {
    valid = false;
  }
  if (!validateField(form.elements.password)) {
    valid = false;
  }
  if (!validateField(form.elements.confirmPassword)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {
  if (field.checkValidity() && checkPasswords(field)) {
    field.classList.remove("form__input_error");

    if (
      field.nextElementSibling &&
      field.nextElementSibling.classList.contains("form__error")
    ) {
      field.nextElementSibling.remove();
    }

    return true;
  } else {
    let message = !checkPasswords(field) ? "The passwords do not match" : "";

    field.setCustomValidity(message);

    field.classList.add("form__input_error");
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("form__error");
    errorDiv.textContent = field.validationMessage;

    if (
      !field.nextElementSibling ||
      !field.nextElementSibling.classList.contains("form__error")
    ) {
      field.insertAdjacentElement("afterend", errorDiv);
    } else {
      field.nextElementSibling.textContent = field.validationMessage;
    }

    field.setCustomValidity("");
    return false;
  }
}

function checkPasswords(field) {
  const password = document.getElementById("password").value;
  const confPassword = document.getElementById("confirmPassword").value;

  if (password === confPassword || field.type !== "password") {
    return true;
  } else {
    return false;
  }
}

cities.sort((city1, city2) => city2.population - city1.population);
const firstCity = cities.splice(0, 1);

const sortedCities = cities
  .filter((city) => city.population >= 50000)
  .sort((a, b) => a.city.localeCompare(b.city));

sortedCities.splice(0, 0, ...firstCity);

sortedCities.forEach((el) => {
  const option = document.createElement("option");
  option.textContent = el.city;
  citySelect.append(option);
});

async function getUniver(source) {
  let response = await fetch(source);
  const universities = await response.json();

  universities.forEach((el) => {
    const option = document.createElement("option");
    option.textContent = el.name;
    univerSelect.append(option);
  });
}

getUniver(univerList);

setStatus.addEventListener("click", changeStatus);
statusBtn.addEventListener("click", printStatus);

function changeStatus() {
  const setStatusInput = setStatusBlock.querySelector(".set-status__input");

  setStatusInput.value = showStatus.textContent;
  setStatusBlock.classList.toggle("set-status_active");
}

function printStatus() {
  const setStatusInput = setStatusBlock.querySelector(".set-status__input");
  const newStatus = setStatusInput.value;

  localStorage.setItem("status", newStatus);
  showStatus.textContent = newStatus;
  setStatusBlock.classList.toggle("set-status_active");
}

showStatus.textContent = localStorage.getItem("status");
sendBtn.nextElementSibling.textContent = localStorage.getItem("fullDate");
