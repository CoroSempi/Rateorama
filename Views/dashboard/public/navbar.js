const siteifo = document.getElementById("siteInformation");
const mails = document.getElementById("sendMails");
const addmovies = document.getElementById("addMovies");
const addseries = document.getElementById("addSeries");
const addtvshows = document.getElementById("addTvShows");

const infoForm = document.getElementById("infoForm");
const mailForm = document.getElementById("mailsForm");
const movieForm = document.getElementById("movieForm");
const seriesForm = document.getElementById("seriesForm");
const tvInfo = document.getElementById("tvInfo");

siteifo.onclick = function () {
  this.classList.add("selected");
  mails.classList.remove("selected");
  addmovies.classList.remove("selected");
  addseries.classList.remove("selected");
  addtvshows.classList.remove("selected");

  infoForm.classList.remove("none");
  mailForm.classList.add("none");
  movieForm.classList.add("none");
  seriesForm.classList.add("none");
  tvInfo.classList.add("none");
};

mails.onclick = function () {
  this.classList.add("selected");
  siteifo.classList.remove("selected");
  addmovies.classList.remove("selected");
  addseries.classList.remove("selected");
  addtvshows.classList.remove("selected");

  mailForm.classList.remove("none");
  infoForm.classList.add("none");
  movieForm.classList.add("none");
  seriesForm.classList.add("none");
  tvInfo.classList.add("none");
};

addmovies.onclick = function () {
  this.classList.add("selected");
  siteifo.classList.remove("selected");
  mails.classList.remove("selected");
  addseries.classList.remove("selected");
  addtvshows.classList.remove("selected");

  movieForm.classList.remove("none");
  infoForm.classList.add("none");
  mailForm.classList.add("none");
  seriesForm.classList.add("none");
  tvInfo.classList.add("none");
};

addseries.onclick = function () {
  this.classList.add("selected");
  siteifo.classList.remove("selected");
  mails.classList.remove("selected");
  addmovies.classList.remove("selected");
  addtvshows.classList.remove("selected");

  seriesForm.classList.remove("none");
  infoForm.classList.add("none");
  mailForm.classList.add("none");
  movieForm.classList.add("none");
  tvInfo.classList.add("none");
};

addtvshows.onclick = function () {
  this.classList.add("selected");
  siteifo.classList.remove("selected");
  mails.classList.remove("selected");
  addmovies.classList.remove("selected");
  addseries.classList.remove("selected");

  tvInfo.classList.remove("none");
  infoForm.classList.add("none");
  mailForm.classList.add("none");
  movieForm.classList.add("none");
  seriesForm.classList.add("none");
};
