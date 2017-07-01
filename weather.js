const https = require("https");
const api = require("./api.json");

//print temp detail
printweather = (weather)=>{
	const result = `Details : 
	County name : ${weather.location.country_name} :: City name : ${weather.location.city} 
	Current temperature : ${weather.current_observation.temp_f} F / /  ${weather.current_observation.temp_c} C `;
	console.log(result);
}
//fucntion to print error
printerror = (error) =>{
	console.error(error.message);
}




function get(query){
	//take out underscore for readability
	const readableQuery = query.replace('_',' ');
	try{
	const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`,response=>{

		if(response.statusCode === 200){
		let body = "";

		//read data 
		response.on('data',chunk =>{
			body+=chunk;
		});
		response.on('end',()=>{
			try{
			// console.log(body);
			//parse data
			const weather =  JSON.parse(body);
			//condition check if location found or not
			if(weather.location){
				//print data
			printweather(weather);
			}else{
				const queryError =new Error (`location ${readableQuery} was not found`);
				printerror(queryError);
			}
		}catch(error){
			printerror(error);
		}
		});
	}else{const errormessage = `for ${username} = ${http.STATUS_CODES[response.statusCode]}`;
	const statuserror = new Error(errormessage);
	printerror(statuserror);
}
});

request.on('error',printerror);
}catch(error){
	printerror(error);
}
}

module.exports.get = get;