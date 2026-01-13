// ===== ELEMENT REFERENCES =====
const lengthSlider = document.getElementById("lengthSlider");
const lengthInput = document.getElementById("lengthInput");
const lengthValue = document.getElementById("lengthValue");

const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const specialEl = document.getElementById("special");

const customWordEl = document.getElementById("customWord");
const resultEl = document.getElementById("result");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const strengthBar = document.getElementById("strengthBar");

lengthValue.textContent = lengthSlider.value;

lengthSlider.addEventListener("input", () => {
  lengthInput.value = lengthSlider.value;
  lengthValue.textContent = lengthSlider.value;
  updateStrength();
});

lengthInput.addEventListener("input", () => {
  let value = parseInt(lengthInput.value);

  if (isNaN(value)) value = 4;
  if (value < 4) value = 4;
  if (value > 32) value = 32;

  lengthInput.value = value;
  lengthSlider.value = value;
  lengthValue.textContent = value;
  updateStrength();
});

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {
  if (
    !lowercaseEl.checked &&
    !uppercaseEl.checked &&
    !numbersEl.checked &&
    !specialEl.checked
  ) {
    alert("Select at least one character type!");
    return;
  }

  const requestData = {
    length: parseInt(lengthSlider.value),
    lowercase: lowercaseEl.checked,
    uppercase: uppercaseEl.checked,
    numbers: numbersEl.checked,
    special: specialEl.checked,
    customWord: customWordEl.value
  };

  fetch("http://localhost:8080/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  })
    .then(response => response.text())
    .then(password => {
      resultEl.value = password;
      updateStrength();
    })
    .catch(error => {
      console.error(error);
      alert("Backend is not running!");
    });
}

copyBtn.addEventListener("click", copyPassword);

function copyPassword() {
  if (!resultEl.value) return;

  navigator.clipboard.writeText(resultEl.value).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1500);
  });
}

function updateStrength() {
  let strength = 0;

  const length = parseInt(lengthSlider.value);

  if (length >= 8) strength += 25;
  if (length >= 12) strength += 25;
  if (length >= 16) strength += 20;

  if (lowercaseEl.checked) strength += 10;
  if (uppercaseEl.checked) strength += 10;
  if (numbersEl.checked) strength += 10;
  if (specialEl.checked) strength += 15;

  if (strength > 100) strength = 100;

  strengthBar.style.width = strength + "%";

  if (strength < 40) {
    strengthBar.style.background = "red";
  } else if (strength < 70) {
    strengthBar.style.background = "orange";
  } else {
    strengthBar.style.background = "lime";
  }
}

[
  lowercaseEl,
  uppercaseEl,
  numbersEl,
  specialEl
].forEach(el => el.addEventListener("change", updateStrength));

