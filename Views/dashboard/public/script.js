const selected = document.getElementById("selected");
const one = document.getElementById("one");
const every = document.getElementById("every");
const mailUser = document.getElementById("mailUser");

function check() {
  if (selected.innerHTML == `One User <img src="./pics/Vector.png">`) {
    mailUser.classList.remove("none1");
  } else {
    mailUser.classList.add("none1");
  }
}

selected.onclick = function () {
  one.classList.toggle("none1");
  every.classList.toggle("none1");
};

one.onclick = function () {
  selected.innerHTML = `One User <img src="./pics/Vector.png" />`;
  check();
};

every.onclick = function () {
  selected.innerHTML = `Every One <img src="./pics/Vector.png" />`;
  check();
};
