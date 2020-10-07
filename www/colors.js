
var pallets = [
	["#C6D8AF","#DBD8B3","#FCC8B2","#EFA48B","#EF626C","#BCAB79","#D5573B","#C6ECAE","#94C9A9"],
	["#D68FD6","#DEFFF2","#6EF4D9","#EFE9F4","#08B2E3","#D68FD6","#CAE5FF","#ACEDFF","#F3FFC6"],
	["#C3EB78","#F9F4F5","#C8B8DB","#70EE9C","#B5F44A","#F3B61F","#77FF94","#A1E44D","#CCFCCB"],
	["#E6BCCD","#D295BF","#EFF1ED","#BCBD8B","#C8C8C8","#FFE1C6","#FFF7AE","#FFC6D9","#F0F3F5"],
	["#98DFEA","#EFD9CE","#C874D9","#E0FF4F","#FEFFFE","#DDC9B4","#EAEAEA","#CBC5EA","#ADCAD6"],
]

var backgroundColors = ["#685369","#4C5B5C","#6F1D1B","#29274C","#033F63"]


var palete = 0;



getRandomColor = function(){
	var numberOfColors = pallets[palete].length;
	index = Math.round(Math.random()*numberOfColors) - 1;
	if(index < 0) 
		index = 0;
	
	return pallets[palete][index];
}

getRandomPallete = function(){
	palete = Math.round((Math.random()*backgroundColors.length*8 - 4)/8);
	var body = document.getElementsByTagName("body");
	body[0].style.backgroundColor = backgroundColors[palete];
}






