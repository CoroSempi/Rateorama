const series1Form1 = document.getElementById("seriessForm");

const Sdone = document.getElementById("Salert");
const Sfailed = document.getElementById("Salert2");

series1Form1.addEventListener("submit", function (event) {
  event.preventDefault();

  const Sname = document.getElementsByName("Sname")[0].value;
  const Srelease = document.getElementsByName("Srelease")[0].value;
  const Sdate = document.getElementsByName("SdateRelease")[0].value;
  const Slink = document.getElementsByName("StrailerLink")[0].value;
  const Soverview = document.getElementsByName("Soverview")[0].value;
  const Sgenres = document.getElementsByName("seriesGenres")[0].value;

  const Sposter = document.getElementsByName("SPoster")[0];
  const SposterFile = Sposter.files[0];

  const Sbg = document.getElementsByName("SbgPic")[0];
  const SbgFile = Sbg.files[0];

  const Srate = document.getElementsByName("SRate")[0].value;
  const SratingsNumber = document.getElementsByName("SRatingsNumber")[0].value;
  const Sadult = document.getElementsByName("Sadults")[0].checked;

  const SformData = new FormData();
  SformData.append("Sname", Sname);
  SformData.append("Srelease", Srelease);
  SformData.append("Sdate", Sdate);
  SformData.append("Slink", Slink);
  SformData.append("Soverview", Soverview);
  SformData.append("Sgenres", Sgenres);
  SformData.append("Sposter", SposterFile);
  SformData.append("Sbg", SbgFile);
  SformData.append("Srate", Srate);
  SformData.append("SratingsNumber", SratingsNumber);
  SformData.append("Sadult", Sadult);

  console.log(SformData);
  fetch("/dashboard/series", {
    method: "POST",
    body: SformData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data == "uploaded") {
        Sdone.classList.remove("none1");
        Sfailed.classList.add("none1");
        console.log(data);
        series1Form1.reset();
        return;
      }
      if (data == "failed") {
        Sdone.classList.add("none1");
        Sfailed.classList.remove("none1");
        console.log(data);
        series1Form1.reset();
        return;
      }
      Sdone.classList.add("none1");
      Sfailed.classList.remove("none1");
      Sfailed.innerText = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
