const movie1Form = document.getElementById("moviesForm");

const done1 = document.getElementById("Malert");
const failed = document.getElementById("Malert2");

movie1Form.addEventListener("submit", function (event) {
  event.preventDefault();

  const Mname = document.getElementsByName("movieName")[0].value;
  const release = document.getElementsByName("movieRelease")[0].value;
  const date = document.getElementsByName("MdateRelease")[0].value;
  const link = document.getElementsByName("MtrailerLink")[0].value;
  const overview = document.getElementsByName("movieOverview")[0].value;
  const genres = document.getElementsByName("movieGenres")[0].value;

  const poster = document.getElementsByName("moviePoster")[0];
  const posterFile = poster.files[0];

  const bg = document.getElementsByName("movieBgPic")[0];
  const bgFile = bg.files[0];

  const rate = document.getElementsByName("movieRate")[0].value;
  const ratingsNumber =
    document.getElementsByName("movieRatingsNumber")[0].value;
  const adult = document.getElementsByName("movieAdults")[0].checked;

  const formData = new FormData();
  formData.append("Mname", Mname);
  formData.append("release", release);
  formData.append("date", date);
  formData.append("link", link);
  formData.append("overview", overview);
  formData.append("genres", genres);
  formData.append("poster", posterFile);
  formData.append("bg", bgFile);
  formData.append("rate", rate);
  formData.append("ratingsNumber", ratingsNumber);
  formData.append("adult", adult);

  console.log(formData);
  fetch("/dashboard/movies", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data == "uploaded") {
        done1.classList.remove("none1");
        failed.classList.add("none1");
        console.log(data);
        movie1Form.reset();
        return;
      }
      if (data == "failed") {
        done1.classList.add("none1");
        failed.classList.remove("none1");
        console.log(data);
        movie1Form.reset();
        return;
      }
      done1.classList.add("none1");
      failed.classList.remove("none1");
      failed.innerText = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
