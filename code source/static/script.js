loadData();

function loadData(){
	// Requête AJAX get Persons
	httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData1 = JSON.parse(httpRequest.response);
			update_Bars(jsonData1);
		}
	};
	httpRequest.send();

	httpRequest2 = new XMLHttpRequest();
	httpRequest2.open('GET', '/api/data2');
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
			jsonData2 = JSON.parse(httpRequest2.response);
			update_Lines(jsonData2);
		}
	};
	httpRequest2.send();

	httpRequest3 = new XMLHttpRequest();
	httpRequest3.open('GET', '/api/data1');
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
			jsonData3 = JSON.parse(httpRequest3.response);
			update_Pie(jsonData3);
		}
	};
	httpRequest3.send();

	httpRequest4 = new XMLHttpRequest();
	httpRequest4.open('GET', '/api/data4');
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
			jsonData4 = JSON.parse(httpRequest4.response);
			update_BigNumbers(jsonData4);
		}
	};
	httpRequest4.send();
}

function update_Bars(jsonData){

	var labels = jsonData.map(function(e) {
	   return e.ANNEE;
	});

	var data = jsonData.map(function(e) {
	   return e.nbr;
	});

	new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
			{
			  label: "ANNEE",
			  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
			  data: data
			}
		  ]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  legend: { display: false },
		  title: {
			display: false,
			text: 'Le nombre d’étudiants par années.'
		  }
		}
	});
}

function update_Lines(jsonData){
	var labels = jsonData.years;

	for(d of jsonData.datasets){
		d.fill = false;
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;
	}

	var data = jsonData.datasets;

	new Chart(document.getElementById("line-chart"), {
		type: 'line',
		data: {
			labels: labels,
			datasets: data
		},
		options: {
			responsive: false,
			maintainAspectRatio: true,
			title: {
				display: true,
				text: ' L’évolution du nombre d’étudiants dans une spécialité, par années.'
			},
			legend:{
				position:'top'
			}
		}
	});
}

function update_Pie(jsonData){
	var labels = jsonData.map(function(e) {
	   return e.SEXe;
	});

	var data = jsonData.map(function(e) {
	   return e.nbr;
	});

	new Chart(document.getElementById("pie-chart"), {
		type: 'pie',
		data: {
		  labels: labels,
		  datasets: [{
                label: "Nombre",
			backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#d3b37e","#c45850"],
			data: data
		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  title: {
			display: true,
			text: 'La distrubution d’étudiants selon le sexe.'
		  },
		  legend:{
			position:'right'
		  }
		}
	});
}

function update_BigNumbers(jsonData){
	var i=1;
	for(d of jsonData){
		ann = document.getElementById("ann"+i);

		label = ann.getElementsByClassName("annLabel")[0];
		label_ = ann.getElementsByClassName("annPop")[0];

		label.innerText = d["ANNEE"];
		label_.innerText = d["nbr"];

		i++;
	}
}