const tvshows1Form1 = document.getElementById("tvshowssForm");

const Tdone = document.getElementById("Talert");
const Tfailed = document.getElementById("Talert2");

tvshows1Form1.addEventListener("submit", function (event) {
  event.preventDefault();

  const Tname = document.getElementsByName("Tname")[0].value;
  const Trelease = document.getElementsByName("Trelease")[0].value;
  const Tdate = document.getElementsByName("RdateRelease")[0].value;
  const Tlink = document.getElementsByName("TtrailerLink")[0].value;
  const Toverview = document.getElementsByName("Toverview")[0].value;
  const Tgenres = document.getElementsByName("tvshowsGenres")[0].value;

  const Tposter = document.getElementsByName("Tposter")[0];
  const TposterFile = Tposter.files[0];

  const Sbg = document.getElementsByName("TbgPic")[0];
  const TbgFile = Sbg.files[0];

  const Trate = document.getElementsByName("Trate")[0].value;
  const TratingsNumber = document.getElementsByName("TratingsNumber")[0].value;
  const Tadult = document.getElementsByName("Tadults")[0].checked;

  const TformData = new FormData();
  TformData.append("Tname", Tname);
  TformData.append("Trelease", Trelease);
  TformData.append("Tdate", Tdate);
  TformData.append("Tlink", Tlink);
  TformData.append("Toverview", Toverview);
  TformData.append("Tgenres", Tgenres);
  TformData.append("Tposter", TposterFile);
  TformData.append("Tbg", TbgFile);
  TformData.append("Trate", Trate);
  TformData.append("TratingsNumber", TratingsNumber);
  TformData.append("Tadult", Tadult);

  fetch("/dashboard/tvshows", {
    method: "POST",
    body: TformData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data == "uploaded") {
        Tdone.classList.remove("none1");
        Tfailed.classList.add("none1");
        console.log(data);
        tvshows1Form1.reset();
        return;
      }
      if (data == "failed") {
        Tdone.classList.add("none1");
        Tfailed.classList.remove("none1");
        console.log(data);
        tvshows1Form1.reset();
        return;
      }
      Tdone.classList.add("none1");
      Tfailed.classList.remove("none1");
      Tfailed.innerText = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
