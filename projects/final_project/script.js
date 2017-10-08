$(document).ready( function(){
	var baseURL = 'https://accesscontrolalloworiginall.herokuapp.com/https://sarah-vids.herokuapp.com/';
	var allVideos = [];
	var totalSearchDays = 1;  // totalDays is counting up with each render
	var searchDay = 1; // tracking days for months
	var searchMonth = 'january';
	var renderDay = 1;
	var renderMonth = 'january';
	var year = 365;
	var id;
	
	var NumDays = {
		jan : 31,
		feb : 28,
		mar : 31,
		apr : 30,
		may : 31,
		jun : 30,
		jul : 31,
		aug : 31,
		sep : 30,
		oct : 31,
		nov : 30,
		dec : 31,
	};

	// start it off
	searchForVid();
	
	// search for videos on a 10-sec timer
	for (var i = totalSearchDays; i <= year; i++){
		setTimeout(searchForVid, (10000 * i));
	}

	// render videos on a 20-sec timer
	for (var i = 1; i <= year; i++){
		setTimeout(renderVid, (25000 * i));
	}

	// ----------------------------------------------- set the current month, then
	// ----------------------------------------------- query data using current month & day
	function searchForVid(){
		setSearchDate();
		queryData(searchMonth, searchDay);
		//console.log('searching: ' + searchMonth + ' ' + searchDay);
	}

	// ----------------------------------------------- call the API 
	// ----------------------------------------------- if it works, run the success function
	// ----------------------------------------------- if it fails, restart search immediately
	function queryData(month,day){
		var url = (baseURL + month + '-' + day +'-' + 'birthday');
		//console.log(url);
		$.get(url).done(onSuccess).fail(searchForVid); 
	}
	
	// ----------------------------------------------- if the query is successful, save the data
	function onSuccess(res) {
		//console.log(res)

		// ----------------------------------------------- get the video id
		// ----------------------------------------------- save the video id to an array
		var totalItems = res.items.length;
		var randomVid = Math.floor(Math.random() * totalItems);

		if(randomVid === null){
			var randomVid = Math.floor(Math.random() * totalItems);
		} else {
			allVideos.push(res.items[randomVid].id.videoId);
		}

		// ----------------------------------------------- render the video for the first day only
		if(totalSearchDays === 1){
			renderVid();
		}

		// ----------------------------------------------- increase the day counters
		searchDay++;
		totalSearchDays++;
	}

	// ----------------------------------------------- render the video using the video id from the array
	function renderVid(){
		setRenderDate();

		// ----------------------------------------------- remove previous iframe after initial iframe render
		if (totalSearchDays > 1){
			$('iframe:first-of-type').remove();
		 }


		console.log(renderDay)

		id = allVideos[renderDay - 1];
		//console.log(allVideos)
		//console.log('rendering: ' + renderMonth + ' ' + renderDay);


		var source = '"https://www.youtube.com/embed/' + id + '?autoplay=1;rel=0&amp;showinfo=0"';
		//console.log(source)
		$('.video-container').append('<iframe src=' + source + 'frameborder="0" allowfullscreen></iframe>');

		// ----------------------------------------------- remove previous date 
		$('.title').empty();
		// ----------------------------------------------- render new date 
		if(renderDay < 10){
			// ----------------------------------------------- add a 0 to single-digit dates
			$('.title').append('<h1>' + monthNum + '/0' + renderDay + '/' + '2016</h1>');
			$('.title').append('<h1>' + monthNum + '/0' + renderDay + '/' + '2016</h1>');
			$('.title').append('<h1>' + monthNum + '/0' + renderDay + '/' + '2016</h1>');
			$('.title').append('<h1>' + monthNum + '/0' + renderDay + '/' + '2016</h1>');
		} else {
			$('.title').append('<h1>' + monthNum + '/' + renderDay + '/' + '2016</h1>');
			$('.title').append('<h1>' + monthNum + '/' + renderDay + '/' + '2016</h1>');
			$('.title').append('<h1>' + monthNum + '/' + renderDay + '/' + '2016</h1>');
			$('.title').append('<h1>' + monthNum + '/' + renderDay + '/' + '2016</h1>');
		}

		renderDay++;
		console.log(renderDay)
	}

	// ----------------------------------------------- set the searchMonth 
	// ----------------------------------------------- reset the searchDay after the month ends
	function setSearchDate(){
		if (searchMonth === 'january' && searchDay > NumDays.jan){
			searchDay = 1;
			searchMonth = 'february';
		} else if (searchMonth === 'february' && searchDay > NumDays.feb){
			searchDay = 1;
			searchMonth = 'march';
		} else if (searchMonth === 'march' && searchDay > NumDays.mar){
			searchDay = 1;
			searchMonth = 'april';
		} else if (searchMonth === 'april' && searchDay > NumDays.apr){
			searchDay = 1;
			searchMonth = 'may';
		} else if (searchMonth === 'may' && searchDay > NumDays.may){
			searchDay = 1;
			searchMonth = 'june';
		} else if (searchMonth === 'june' && searchDay > NumDays.jun){
			searchDay = 1;
			searchMonth = 'july';
		} else if (searchMonth === 'july' && searchDay > NumDays.jul){
			searchDay = 1;
			searchMonth = 'august';
		} else if (searchMonth === 'august' && searchDay > NumDays.aug){
			searchDay = 1;
			searchMonth = 'september';
		} else if (searchMonth === 'september' && searchDay > NumDays.sep){
			searchDay = 1;
			searchMonth = 'october';
		} else if (searchMonth === 'october' && searchDay > NumDays.oct){
			searchDay = 1;
			searchMonth = 'november';
		} else if (searchMonth === 'november' && searchDay > NumDays.nov){
			searchDay = 1;
			searchMonth = 'december';
		} else if (searchMonth === 'december' && searchDay > NumDays.dec){
			searchDay = 1;
			searchMonth = 'january';
		}
	}

	function setRenderDate(){
		if (renderMonth === 'january' && renderDay > NumDays.jan){
			renderDay = 1;
			renderMonth = 'february';
		} else if (renderMonth === 'february' && renderDay > NumDays.feb){
			renderDay = 1;
			renderMonth = 'march';
		} else if (renderMonth === 'march' && renderDay > NumDays.mar){
			renderDay = 1;
			renderMonth = 'april';
		} else if (renderMonth === 'april' && renderDay > NumDays.apr){
			renderDay = 1;
			renderMonth = 'may';
		} else if (renderMonth === 'may' && renderDay > NumDays.may){
			renderDay = 1;
			renderMonth = 'june';
		} else if (renderMonth === 'june' && renderDay > NumDays.jun){
			renderDay = 1;
			renderMonth = 'july';
		} else if (renderMonth === 'july' && renderDay > NumDays.jul){
			renderDay = 1;
			renderMonth = 'august';
		} else if (renderMonth === 'august' && renderDay > NumDays.aug){
			renderDay = 1;
			renderMonth = 'september';
		} else if (renderMonth === 'september' && renderDay > NumDays.sep){
			renderDay = 1;
			renderMonth = 'october';
		} else if (renderMonth === 'october' && renderDay > NumDays.oct){
			renderDay = 1;
			renderMonth = 'november';
		} else if (renderMonth === 'november' && renderDay > NumDays.nov){
			renderDay = 1;
			renderMonth = 'december';
		} else if (renderMonth === 'december' && renderDay > NumDays.dec){
			renderDay = 1;
			renderMonth = 'january';
		}

		if (renderMonth === 'january'){
			monthNum = '01';
		} else if (renderMonth === 'february'){
			monthNum = '02';
		} else if (renderMonth === 'march'){
			monthNum = '03';
		} else if (renderMonth === 'april'){
			monthNum = '04';
		} else if (renderMonth === 'may'){
			monthNum = '05';
		} else if (renderMonth === 'june'){
			monthNum = '06';
		} else if (renderMonth === 'july'){
			monthNum = '07';
		} else if (renderMonth === 'august'){
			monthNum = '08';
		} else if (renderMonth === 'september'){
			monthNum = '09';
		} else if (renderMonth === 'october'){
			monthNum = '10';
		} else if (renderMonth === 'november'){
			monthNum = '11';
		} else if (renderMonth === 'december'){
			monthNum = '12';
		}      
	}
});
