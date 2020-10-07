var width = window.innerWidth;
var height = window.innerHeight;

var body = document.getElementsByTagName("body");

var settingsButton = document.createElement("IMG");
settingsButton.setAttribute("src", "img/icons/settings.png");
settingsButton.style.position = "absolute";
settingsButton.style.width = width * 0.09;
settingsButton.style.height = "auto";
settingsButton.style.top = height * 0.02;
settingsButton.style.left = width * 0.88 + "px";
settingsButton.style.backgroundColor = "transparent";
settingsButton.style.border = "0";
settingsButton.style.transform = "translateY(0px)";
settingsButton.style.borderRadius = "50px";

var musicButton = document.createElement("IMG");
musicButton.setAttribute("src", "img/icons/music.png");
musicButton.style.position = "absolute";
musicButton.style.display = "block";
musicButton.style.width = settingsButton.style.width;
musicButton.style.height = "auto";
musicButton.style.top = height * 0.02;
musicButton.style.left = width * 0.88;
musicButton.classList.add("buttonTransition");

var musicButtonClicked = 0;
function musicButtonMode() {
  if (musicButtonClicked == 0) {
    musicButton.setAttribute("src", "img/icons/music_OFF.png");

    musicButtonClicked = 1;
    console.log("MUSIC BUTTON: ON");
  } else {
    musicButton.setAttribute("src", "img/icons/music.png");

    musicButtonClicked = 0;
    console.log("MUSIC BUTTON: OFF");
  }
}
musicButton.onclick = musicButtonMode;

var soundButton = document.createElement("IMG");
soundButton.setAttribute("src", "img/icons/headset.png");
soundButton.style.position = "absolute";
soundButton.style.width = settingsButton.style.width;
soundButton.style.height = "auto";
soundButton.style.top = height * 0.02;
soundButton.style.left = width * 0.88;
soundButton.style.transition = "all .2s linear";

var soundButtonClicked = 0;
function soundButtonMode() {
  if (soundButtonClicked == 0) {
    soundButton.setAttribute("src", "img/icons/headset_OFF.png");

    soundButtonClicked = 1;
    console.log("SOUND BUTTON: ON");
  } else {
    soundButton.setAttribute("src", "img/icons/headset.png");

    soundButtonClicked = 0;
    console.log("SOUND BUTTON: OFF");
  }
}
soundButton.onclick = soundButtonMode;

var settingsDisplayed = 0;

removeMusicButton = function() {
  musicButton.removeEventListener("transitionend", removeMusicButton);
  musicButton.remove();
  console.log("kur");
};

removeSoundButton = function() {
  soundButton.removeEventListener("transitionend", removeSoundButton);
  soundButton.remove();
};

addMusicButton = function() {};

addSoundButton = function() {};

displaySettings = function() {
  if(ocupied == 1)
	  return;
  if (settingsDisplayed == 0) {
    body[0].appendChild(soundButton);
    setTimeout(function() {
      soundButton.style.top = width * 0.15;
    }, 40);

    body[0].appendChild(musicButton);
    setTimeout(function() {
      musicButton.style.left = width * 0.75;
    }, 20);

    settingsButton.setAttribute("class", "rotate-in-center");

    settingsDisplayed = 1;

    console.log("SETTINGS: ON");
  } else {
    setTimeout(function() {
      musicButton.style.left = width * 0.88;
    }, 0);
    setTimeout(function() {
      soundButton.style.top = height * 0.02;
    }, 40);

    musicButton.addEventListener("transitionend", removeMusicButton);
    soundButton.addEventListener("transitionend", removeSoundButton);

    settingsButton.setAttribute("class", "rotate-in-center-reverse");

    settingsDisplayed = 0;

    console.log("SETTINGS: OFF");
  }
};

forceCloseSettings = function(){
	settingsDisplayed = 0;
	musicButton.remove();
	soundButton.remove();
	settingsButton.setAttribute("class","");
}

settingsButton.onclick = displaySettings;
