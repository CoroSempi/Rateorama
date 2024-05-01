const email = document.getElementById("Email");
const warn = document.getElementById("alert");
const warn2 = document.getElementById("alert2");
const done = document.getElementById("done");
const mailUser1 = document.getElementById("mailUser");

const usernameInput = document.getElementsByName("userName")[0];
const emailTInput = document.getElementsByName("mailwww")[0];

email.addEventListener("submit", function (event) {
  event.preventDefault();

  const oneuser = mailUser1.classList.contains("none1");
  const data = {
    username: usernameInput.value,
    email: emailTInput.value,
    oneuse: oneuser,
  };

  fetch("/dashboard/mails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      // Handle the response from the server

      if (responseData === "No Such User") {
        warn.classList.remove("none1");
        warn2.classList.add("none1");
        done.classList.add("none1");
      } else if (responseData === "fill") {
        warn2.classList.remove("none1");
        done.classList.add("none1");
        warn.classList.add("none1");
      } else if (responseData === "done") {
        done.classList.remove("none1");
        warn2.classList.add("none1");
        warn.classList.add("none1");
      }
      usernameInput.value = "";
      emailTInput.value = "";
      return;
      console.log(responseData);
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error("Error:", error);
    });
});
