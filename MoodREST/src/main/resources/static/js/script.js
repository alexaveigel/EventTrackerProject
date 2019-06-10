window.addEventListener('load', function(e) {
	console.log('document loaded');
	init();
});

function init() {
	document.moodForm.lookup.addEventListener('click', function(e) {
		e.preventDefault();
		var moodId = document.moodForm.moodId.value;
		if (!isNaN(moodId) && moodId > 0) {
			getMood(moodId);
		}
	});
	document.allMoodsForm.lookup.addEventListener('click', function(e) {
		e.preventDefault();
		getAllMoods();

	});
	document.deleteMoodForm.lookup.addEventListener('click', function(e) {
		e.preventDefault();
		var moodId = document.deleteMoodForm.moodId.value;
		if (!isNaN(moodId) && moodId > 0) {
			deleteMood(moodId);
		}
	});
	document.editMoodForm.lookup.addEventListener('click', function(e) {
		e.preventDefault();
		var moodId = document.editMoodForm.moodId.value;
		console.log(moodId);
		if (!isNaN(moodId) && moodId > 0) {
			editMoodForm(moodId);
		}
	});

	document.addMoodForm.submit.addEventListener('click', addMood);
};

function getAllMoods() {

	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/moods/', true);

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status < 400) {
			var moods = JSON.parse(xhr.responseText);
			displayAllMood(moods);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			var dataDiv = document.getElementById('moodData');
			let div = document.createElement('div');
			div.textContent = 'Moods not found.';
			dataDiv.appendChild(div);

		}
	};

	xhr.send(null);
};

function displayAllMood(moods) {
	var dataDiv = document.getElementById('moodData');
	dataDiv.textContent = '';

	var table = document.createElement('table');
	var total = 0;
	var count = 0;
	console.log(total);

	for (var i = 0; i < moods.length; i++) {

		let tr = document.createElement('tr');

		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		let td4 = document.createElement('td');
		let td5 = document.createElement('td');
		let td6 = document.createElement('td');
		let td7 = document.createElement('td');

		td1.textContent = 'Id: ' + moods[i].id;
		td2.textContent = 'Name: ' + moods[i].name;
		td3.textContent = 'Intensity: ' + moods[i].intensity;
		td4.textContent = 'Length: ' + moods[i].length;
		td5.textContent = 'Place: ' + moods[i].place;
		td6.textContent = 'Date: ' + moods[i].moodDate;
		td7.textContent = 'Description: ' + moods[i].description;
 		
		total += moods[i].intensity;
		count++;
		console.log("Avg intensity: " + total);


		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);
		tr.appendChild(td7);

		table.appendChild(tr);
		dataDiv.appendChild(table);
		
		
	};
	
	var avg = total / count;
	let h = document.createElement('h3');
	h.textContent = "Avg intensity: " + avg;
	dataDiv.appendChild(h);

};

function getMood(moodId) {

	var xhr = new XMLHttpRequest();
	var mood;

	xhr.open('GET', 'api/moods/' + moodId, true);

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status < 400) {
			mood = JSON.parse(xhr.responseText);
			displayMood(mood);

		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			var dataDiv = document.getElementById('moodData');
			let div = document.createElement('div');
			div.textContent = 'Mood not found.';
			dataDiv.appendChild(div);

		}
	};

	xhr.send(null);
	return mood;
};

function displayMood(mood) {
	var dataDiv = document.getElementById('moodData');
	dataDiv.textContent = '';

	let ul = document.createElement('ul');

	let id = document.createElement('li');
	id.textContent = 'Id: ' + mood.id;
	ul.appendChild(id);

	let name = document.createElement('li');
	name.textContent = 'Name: ' + mood.name;
	ul.appendChild(name);

	let intensity = document.createElement('li');
	intensity.textContent = 'Intensity: ' + mood.intensity;
	ul.appendChild(intensity);

	let length = document.createElement('li');
	length.textContent = 'Length: ' + mood.length;
	ul.appendChild(length);

	let place = document.createElement('li');
	place.textContent = 'Place: ' + mood.place;
	ul.appendChild(place);

	let moodDate = document.createElement('li');
	moodDate.textContent = 'Date: ' + mood.moodDate;
	ul.appendChild(moodDate);

	let description = document.createElement('li');
	description.textContent = 'Description: ' + mood.description;
	ul.appendChild(description);

	dataDiv.appendChild(ul);

};

function addMood(e) {

	e.preventDefault();

	var xhr = new XMLHttpRequest();

	xhr.open('POST', 'api/moods', true);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status < 400) {
			let mood = JSON.parse(xhr.responseText);
			getMood(mood.id);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			var dataDiv = document.getElementById('moodData');
			let div = document.createElement('div');
			div.textContent = 'Your mood was NOT saved because there was an error.';
			dataDiv.appendChild(div);

		}
	};

	let mood = {
		name : document.addMoodForm.name.value,
		intensity : document.addMoodForm.intensity.value,
		length : document.addMoodForm.length.value,
		place : document.addMoodForm.place.value,
		moodDate : document.addMoodForm.moodDate.value,
		description : document.addMoodForm.description.value
	};

	xhr.send(JSON.stringify(mood));

	var form = document.addMoodForm;

	form.reset();
};

function editMood(mood) {

	var xhr = new XMLHttpRequest();

	xhr.open('PUT', 'api/moods/' + mood.id, true);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status < 400) {
			let mood = JSON.parse(xhr.responseText);

			let updatedMood = {
//					id : moodId.target.id,
					name : document.editMoodForm.name.value,
					intensity : document.editMoodForm.intensity.value,
					length : document.editMoodForm.length.value,
					place : document.editMoodForm.place.value,
					moodDate : document.editMoodForm.moodDate.value,
					description : document.editMoodForm.description.value
				};
			
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			var dataDiv = document.getElementById('moodData');
			let div = document.createElement('div');
			div.textContent = 'Your mood was NOT saved because there was an error.';
			dataDiv.appendChild(div);

		}
	};

	console.log(document.editMoodForm.name.value);
	

	xhr.send(JSON.stringify(updatedMood));

	var form = document.editMoodForm;

	form.reset();
};

function editMoodForm(moodId) {
	
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/moods/' + moodId, true);

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status < 400) {
			var mood = JSON.parse(xhr.responseText);
			var dataDiv = document.getElementById('moodData');

			console.log(mood);
			let form = document.createElement('form');
			
			form.id = 'editMoodForm';
			
			
			let name = document.createElement('input');
			name.name = 'name';
			name.value = mood.name;
			let sp1 = document.createElement('span');
			sp1.textContent = 'Name: ';
			form.appendChild(sp1);
			form.appendChild(name);
			form.appendChild(document.createElement('br'));			

			let intensity = document.createElement('input');
			intensity.name = 'intensity';
			intensity.value = mood.intensity;
			let sp2 = document.createElement('span');
			sp2.textContent = 'Intensity: ';
			form.appendChild(sp2);
			form.appendChild(intensity);
			form.appendChild(document.createElement('br'));	
			
			let length = document.createElement('input');
			length.name = 'length';
			length.value = mood.length;
			let sp3 = document.createElement('span');
			sp3.textContent = 'Length (hrs): ';
			form.appendChild(sp3);
			form.appendChild(length);
			form.appendChild(document.createElement('br'));	

			let place = document.createElement('input');
			place.name = 'place';
			place.value = mood.place;
			let sp4 = document.createElement('span');
			sp4.textContent = 'Place: ';
			form.appendChild(sp4);
			form.appendChild(place);
			form.appendChild(document.createElement('br'));	

			let moodDate = document.createElement('input');
			moodDate.name = 'moodDate';
			moodDate.value = mood.moodDate;
			let sp5 = document.createElement('span');
			sp5.textContent = 'Date: ';
			form.appendChild(sp5);
			form.appendChild(moodDate);
			form.appendChild(document.createElement('br'));	

			let description = document.createElement('input');
			description.name = 'description';
			description.value = mood.description;
			let sp6 = document.createElement('span');
			sp6.textContent = 'Description: ';
			form.appendChild(sp6);
			form.appendChild(description);
			form.appendChild(document.createElement('br'));	

			let submit = document.createElement('input');
			submit.type = 'submit';
			submit.id = moodId;
			form.appendChild(submit);
			
			submit.addEventListener('click', editMood(mood));

			
			dataDiv.appendChild(form);
	
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			var dataDiv = document.getElementById('moodData');
			let div = document.createElement('div');
			div.textContent = 'Mood not found.';
			dataDiv.appendChild(div);

		}
	};

	xhr.send(null);
	
	
};

function deleteMood(moodId) {

	var xhr = new XMLHttpRequest();

	xhr.open('DELETE', 'api/moods/' + moodId, true);

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status < 400) {
			var dataDiv = document.getElementById('moodData');
			let div = document.createElement('div');
			div.textContent = 'Mood has been deleted.';
			dataDiv.appendChild(div);

		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			var dataDiv = document.getElementById('moodData');
			let div = document.createElement('div');
			div.textContent = 'Mood was NOT deleted.';
			dataDiv.appendChild(div);

		}
	};

	xhr.send(null);
};