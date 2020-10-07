var width = window.innerWidth;
var height = window.innerHeight;

var helpButton = document.createElement("IMG");
helpButton.setAttribute("src", "img/icons/info.png");
helpButton.innerHTML = "info";
helpButton.style.position = "absolute";
helpButton.style.width = width * 0.09;
helpButton.style.height = "auto";
helpButton.style.top = height * 0.02;
helpButton.style.left = width * 0.02;

var infoDisplayed = 0;

var helpDisplay = document.createElement("DIV");
helpDisplay.style.position = "absolute";
helpDisplay.style.width = width * 0.9;
helpDisplay.style.height = height * 0.8;
helpDisplay.style.top = height * 0.1;
helpDisplay.style.left = width * 0.05;
helpDisplay.style.backgroundColor = "#FFFFFF";
helpDisplay.style.border = "solid";
helpDisplay.innerHTML = "Help coming soon";

displayHelp = function() {
  if (infoDisplayed == 0) {
    if (ocupied == 1) return;
    else ocupied = 1;
    var body = document.getElementsByTagName("body");
    body[0].appendChild(helpDisplay);
    infoDisplayed = 1;
  } else {
    helpDisplay.remove();
    infoDisplayed = 0;
    ocupied = 0;
  }
};

helpButton.onclick = displayHelp;
