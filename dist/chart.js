var options = {
	series: [
		{
			name: "Bitcoin",
			data: [31, 40, 28, 51, 42, 109, 100],
		},
		{
			name: "Ethereum",
			data: [11, 32, 45, 32, 34, 52, 41],
		},
		{
			name: "Litcoing",
			data: [11, 25, 30, 50, 40, 45, 48],
		},
		{
			name: "DogCoin",
			data: [11, 50, 60, 45, 20, 30, 60],
		},
	],
	chart: {
		height: 300,
		type: "area",
		foreColor: "#ddd",
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: "smooth",
	},
	xaxis: {
		type: "datetime",
		categories: [
			"2018-09-19T00:00:00.000Z",
			"2018-09-19T01:30:00.000Z",
			"2018-09-19T02:30:00.000Z",
			"2018-09-19T03:30:00.000Z",
			"2018-09-19T04:30:00.000Z",
			"2018-09-19T05:30:00.000Z",
			"2018-09-19T06:30:00.000Z",
		],
	},
	tooltip: {
		x: {
			format: "dd/MM/yy HH:mm",
		},
	},
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
