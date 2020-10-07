var body = document.getElementsByTagName("body");

var width = window.innerWidth;
var height = window.innerHeight;
var dominant = Math.max(width, height);
var storage = window.localStorage;
var avaliableChallanges = storage.getItem("avaliableChallanges");
if (avaliableChallanges == undefined) avaliableChallanges = false;

var challangesDisplayed = 0;

dateCheck = function() {
  var dater = new Date();

  var storage = window.localStorage;

  var lastDay = storage.getItem("Day");
  if (lastDay == undefined) lastDay = 0;
  var lastMonth = storage.getItem("Month");
  if (lastMonth == undefined) lastMonth = 0;
  var lastYear = storage.getItem("Year");
  if (lastYear == undefined) lastYear = 0;

  var currentDay = dater.getDate();
  var currenMonth = dater.getMonth();
  var currentYear = dater.getYear();

  storage.setItem("Day", currentDay);
  storage.setItem("Month", currenMonth);
  storage.setItem("Year", currentYear);

  if (
    lastDay != currentDay ||
    lastMonth != currenMonth ||
    lastYear != currentYear
  )
    return true;
  else return false;
};

displayChallalngeMenu = function() {
  if (challangesDisplayed == 0) {
    if (ocupied == 1) return;
    else ocupied = 1;
    var body = document.getElementsByTagName("body");
    body[0].appendChild(challengeDisplay);
    getChallenges();
    challangesDisplayed = 1;
    ocupied = 1;
    for (var i = 0; i < 3; i++) {
      challengeButtons[i].childNodes[2].setAttribute(
        "src",
        `img/icons/${challenges[i].difficulty}.png`
      );
	  challengeButtons[i].childNodes[3].innerHTML = challenges[i].initalTime;
	  challengeButtons[i].childNodes[4].innerHTML = challenges[i].goal;
	  challengeButtons[i].childNodes[5].innerHTML = getChallangeSupportText(i);
	  
      challengeProgress[i].style.backgroundColor = "transparent";
      if (challenges[i].sucess == "true")
        challengeProgress[i].style.backgroundColor = "green";
    }
  } else {
    challengeDisplay.remove();
    challangesDisplayed = 0;
    ocupied = 0;
  }
};

challenges = [{}, {}, {}];
for (var i = 0; i < 3; i++) {
  challenges[i].initalTime = 0;
  challenges[i].timeAddOn = 0;
  challenges[i].timeAdd = 0;
  challenges[i].increment = 0;
  challenges[i].goal = 0;
  challenges[i].difficulty = 0;
  challenges[i].sucess = false;
}

resetChallenge = function(i) {
  challenges[i].initalTime = 0;
  challenges[i].timeAddOn = 0;
  challenges[i].timeAdd = 0;
  challenges[i].increment = 0;
  challenges[i].goal = 0;
  challenges[i].difficulty = 0;
  challenges[i].sucess = false;
};

createNewChallange = function(index) {
  temp = Math.floor((Math.random() * 13) / 4);

  if (temp == 0) {
    challenges[index].goal = Math.floor(15 + Math.random() * 20);
    challenges[index].difficulty = Math.floor((Math.random() * 29) / 10);
    challenges[index].initalTime =
      Math.floor(
        challenges[index].goal / Math.abs(challenges[index].difficulty - 3)
      ) + 10;
    challenges[index].increment = 1;
  }
  if (temp == 1) {
    challenges[index].goal = Math.floor(30 + Math.random() * 20);
    challenges[index].initalTime =
      Math.floor(
        5 + challenges[index].goal / Math.floor(Math.random() * 20 + 1)
      ) + 10;
    challenges[index].timeAddOn =
      challenges[index].initalTime - Math.floor(Math.random() * 6);
    challenges[index].timeAdd =
      challenges[index].initalTime - Math.floor(Math.random() * 5) + 1;
    challenges[index].difficulty = Math.floor((Math.random() * 25) / 10);
    challenges[index].increment = 1;
  }
  if (temp == 2) {
    challenges[index].goal = Math.floor(20 + Math.random() * 25);
    challenges[index].difficulty = Math.floor((Math.random() * 25) / 10);
    challenges[index].initalTime = Math.floor(10 + Math.random() * 4);
    challenges[index].timeAddOn =
      challenges[index].initalTime - Math.floor(Math.random() * 6) - 2;
    challenges[index].timeAdd =
      challenges[index].initalTime - Math.floor(Math.random() * 6) - 3;
    challenges[index].increment = 1;
  }
  if (temp == 3) {
    challenges[index].goal = Math.floor(15 + Math.random() * 20);
    challenges[index].increment = Math.floor(1 + Math.random() * 8);
    challenges[index].difficulty = Math.floor((Math.random() * 29) / 10);
    challenges[index].initalTime =
      Math.floor(
        challenges[index].goal / Math.abs(challenges[index].difficulty - 3)
      ) +
      challenges[index].increment +
      10;
  }
  if (temp == 4) {
    challenges[index].goal = Math.floor(15 + Math.random() * 20);
    challenges[index].difficulty = Math.floor((Math.random() * 25) / 10);
    challenges[index].initalTime = Math.floor(10 + Math.random() * 4);
    challenges[index].timeAddOn =
      challenges[index].initalTime - Math.floor(Math.random() * 6);
    challenges[index].timeAdd =
      challenges[index].initalTime - Math.floor(Math.random() * 5) + 2;
    challenges[index].increment = Math.floor(1 + Math.random() * 8);
  }
};

getChallenges = function() {
  if (dateCheck() || avaliableChallanges == false) {
    for (var i = 0; i < 3; i++) {
      resetChallenge(i);
      createNewChallange(i);
    }
    console.log(challenges);
    avaliableChallanges = true;
    storage.setItem("avaliableChallanges", true);
    saveChallenges();
    for (var i = 0; i < 3; i++) {
      challengeProgress[i].style.backgroundColor = "#8b0000";
    }
  } else readChallanges();
};

var challengeDisplay = document.createElement("DIV");
challengeDisplay.setAttribute("class", "challengeDisplay");
challengeDisplay.style.position = "absolute";
challengeDisplay.style.width = width * 0.8;
challengeDisplay.style.height = height * 0.8;
challengeDisplay.width = width * 0.9;
challengeDisplay.height = height * 0.8;
challengeDisplay.dominant = Math.max(
  challengeDisplay.height,
  challengeDisplay.width
);
challengeDisplay.style.backgroundColor = "whitesmoke";
challengeDisplay.style.border = "0";
challengeDisplay.style.borderRadius = "20px";

challengeButtons = [{}, {}, {}];
for (var i = 0; i < 3; i++) {
  var initalTimeImg = document.createElement("IMG");
  initalTimeImg.setAttribute("src", "img/icons/timer.png");
  initalTimeImg.setAttribute("class", "initialTmeImg");
  initalTimeImg.style.position = "absolute";
  initalTimeImg.style.width = challengeDisplay.width * 0.07;
  initalTimeImg.style.height = "auto";
  initalTimeImg.style.top = challengeDisplay.height * 0.01;
	
  var initalTimeText = document.createElement("PARAGRAPH");
  initalTimeText.style.position = "absolute";
  initalTimeText.style.width = challengeDisplay.width * 0.07;
  initalTimeText.style.height = "auto";
  initalTimeText.style.top = challengeDisplay.height * 0.01;
  initalTimeText.style.left = challengeDisplay.width * 0.09;
	
  var goalImg = document.createElement("img");
  goalImg.setAttribute("src", "img/icons/cup.png");
  goalImg.setAttribute("class", "goalImg");
  goalImg.setAttribute("align", "middle");
  goalImg.style.position = "absolute";
  goalImg.style.width = challengeDisplay.width * 0.07;
  goalImg.style.height = "auto";
  goalImg.style.top = challengeDisplay.height * 0.01;
  
   var goalText = document.createElement("PARAGRAPH");
   goalText.style.position = "absolute";
   goalText.style.width = challengeDisplay.width * 0.07;
   goalText.style.height = "auto";
   goalText.style.top = challengeDisplay.height * 0.01;
   goalText.style.left = challengeDisplay.width * 0.37;
   
   var supportText = document.createElement("PARAGRAPH");
   supportText.style.position = "absolute";
   supportText.style.width = challengeDisplay.width * 0.6;
   supportText.style.height = "auto";
   supportText.style.top = challengeDisplay.height * 0.10;
   supportText.style.left = challengeDisplay.width * 0.01;

  var difficultyImg = document.createElement("img");
  difficultyImg.setAttribute(
    "src",
    `img/icons/${challenges[i].difficulty}.png`
  );
  difficultyImg.setAttribute("class", "difficultyImg");
  difficultyImg.style.position = "absolute";
  difficultyImg.style.width = challengeDisplay.dominant * 0.07;
  difficultyImg.style.height = "auto";
  difficultyImg.style.top = challengeDisplay.height * 0.01;

  challengeButtons[i] = document.createElement("DIV");
  challengeButtons[i].style.position = "absolute";
  challengeButtons[i].style.left = challengeDisplay.width * 0.03 + "px";
  challengeButtons[i].style.top =
    challengeDisplay.height * 0.15 + i * challengeDisplay.height * 0.28 + "px";
  challengeButtons[i].style.borderColor = "#FFFFFF";
  challengeButtons[i].style.width = challengeDisplay.width * 0.6;
  challengeButtons[i].style.height = challengeDisplay.height * 0.25;
  challengeButtons[i].style.backgroundColor = "#ddd";
  challengeButtons[i].style.fontSize = dominant * 0.02;
  challengeButtons[i].setAttribute("onclick", "startCustomGame(" + i + ");");
  challengeButtons[i].appendChild(initalTimeImg);
  challengeButtons[i].appendChild(goalImg);
  challengeButtons[i].appendChild(difficultyImg);
  challengeButtons[i].appendChild(initalTimeText);
  challengeButtons[i].appendChild(goalText);
  challengeButtons[i].appendChild(supportText);
  challengeDisplay.appendChild(challengeButtons[i]);
}

challengeProgress = {};
for (var i = 0; i < 3; i++) {
  challengeProgress[i] = document.createElement("img");
  if (challenges[i].sucess == false)
    challengeProgress[i].setAttribute("src", "img/icons/check.png");
  else challengeProgress[i].setAttribute("src", "img/icons/tick.png");
  challengeProgress[i].style.position = "absolute";
  challengeProgress[i].style.left = challengeDisplay.width * 0.65 + "px";
  challengeProgress[i].style.top =
    challengeDisplay.height * 0.15 + i * challengeDisplay.height * 0.28 + "px";
  challengeProgress[i].style.border = "none";
  challengeProgress[i].style.width = challengeDisplay.width * 0.2;
  challengeProgress[i].style.height = "auto";
  challengeProgress[i].style.margin = "0 auto";
  challengeProgress[i].style.fontSize = dominant * 0.02;
  challengeProgress[i].setAttribute("class", "challengeProgressButton");
  challengeProgress[i].style.borderRadius = "50%";
  challengeDisplay.appendChild(challengeProgress[i]);
}


//test stuff
challengeProgress[0].setAttribute("onclick"," avaliableChallanges = false; ");

closeButton = document.createElement("img");
closeButton.setAttribute("src", "img/icons/exit.png");
closeButton.style.position = "absolute";
closeButton.style.left = challengeDisplay.width * 0.03 + "px";
closeButton.style.top = challengeDisplay.height * 0.03 + "px";
closeButton.style.width = challengeDisplay.dominant * 0.09;
closeButton.style.height = "auto";
closeButton.style.fontSize = dominant * 0.02;
closeButton.onclick = displayChallalngeMenu;
challengeDisplay.appendChild(closeButton);

challengeButton = document.createElement("BUTTON");
challengeButton.innerHTML = "DAILY<br>CHALLENGES";
challengeButton.style.position = "absolute";
challengeButton.style.backgroundColor = "#ECF0F1";
challengeButton.style.fontWeight = "400";
challengeButton.style.letterSpacing = "1px";
challengeButton.style.border = "0px";
challengeButton.style.borderRadius = "20px";
challengeButton.style.left = (width - width * 0.3) / 2 + "px";
challengeButton.style.top = height * 0.25 + "px";
challengeButton.style.width = width * 0.3;
challengeButton.style.height = height * 0.1;
challengeButton.style.fontSize = dominant * 0.02;
challengeButton.onclick = displayChallalngeMenu;
challengeButton.style.boxShadow = "0px 15px 30px 17px rgba(0,0,0,0)";

saveChallenges = function() {
  for (var i = 0; i < 3; i++) {
    storage.setItem("initalTime" + i, challenges[i].initalTime);
    storage.setItem("timeAddOn" + i, challenges[i].timeAddOn);
    storage.setItem("timeAdd" + i, challenges[i].timeAdd);
    storage.setItem("increment" + i, challenges[i].increment);
    storage.setItem("goal" + i, challenges[i].goal);
    storage.setItem("difficulty" + i, challenges[i].difficulty);
    storage.setItem("sucess" + i, challenges[i].sucess);
  }
};

readChallanges = function() {
  for (var i = 0; i < 3; i++) {
    challenges[i].initalTime = storage.getItem("initalTime" + i);
    challenges[i].timeAddOn = storage.getItem("timeAddOn" + i);
    challenges[i].timeAdd = storage.getItem("timeAdd" + i);
    challenges[i].increment = storage.getItem("increment" + i);
    challenges[i].goal = storage.getItem("goal" + i);
    challenges[i].difficulty = storage.getItem("difficulty" + i);
    challenges[i].sucess = storage.getItem("sucess" + i);
  }
};

getChallangeSupportText = function(index){
	supportTextArray = []
	if(challenges[index].timeAdd == 0)
		supportTextArray[0] = 0;
	else
		supportTextArray[0] = "You get " + challenges[index].timeAdd + " every " + challenges[index].timeAddOn + " points.";
	
	if(challenges[index].increment == 1)
		supportTextArray[1] = 0;
	else
		supportTextArray[1] = "Your number is increasing by " + challenges[index].increment;
	
	if(supportTextArray[0] == 0 && supportTextArray[1] == 0)
		return "";
	if(supportTextArray[0] == 0)
		return supportTextArray[1];
	if(supportTextArray[1] == 0)
		return supportTextArray[0];
	
	return supportTextArray[0] + "<br>" + supportTextArray[1];
}
