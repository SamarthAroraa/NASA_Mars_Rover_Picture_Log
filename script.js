var datepicker = $("#date");
var getbutton = $("button");
mdc.ripple.MDCRipple.attachTo(document.querySelector(".foo-button"));

function displayimg(data) {
  let imgarr = data.photos;
  if (imgarr.length == 0) {
    alert("No images available for selected date!");
    return;
  }
  for (let i in imgarr) {
    let imgtag = $(document.createElement("img")).attr(
      "src",
      imgarr[i].img_src
    );
    $(".wrapper").append(imgtag);
  }
}

datepicker.datepicker({ showAnim: "fold" });
getbutton.click(function () {
  let dateval = datepicker.val();
  if (dateval == "") {
    window.alert("Please enter a date.");
    return;
  }

  let dd = dateval.slice(3, 5);
  let mm = dateval.slice(0, 2);
  let yyyy = dateval.slice(6);

  (function () {
    $.ajax({
      url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
      success: displayimg,
      data: {
        earth_date: String(yyyy + "-" + mm + "-" + dd),
        api_key: "E6h1hv2lKqLhAGpijeZRC1Pr9myh2mQUaR1wtgU8",
      },
    });
  })();
});
