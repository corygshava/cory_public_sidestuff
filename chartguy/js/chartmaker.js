function makebarchart(data, title, thalabels) {
	thalabels = thalabels || 10;
	// assumes that data is an array of numbers

	// make the div to hold the chart
	let theholder = document.createElement('div');
	theholder.dataset.role = 'chart_container';
	theholder.innerHTML = `<h2>${title}</h2>`;

	// make a div
	let mydiv = document.createElement('div');
	mydiv.className = 'chartguy';
	mydiv.dataset.role = 'chart';

	// initialize the chart data
	let labels = '';
	let barshtml = '';
	let vals = '';

	// make the y-axis labels
	let maxguy = Math.max(...data);
	let minguy = Math.min(...data);
	let gap = (maxguy - minguy) / thalabels;

	labels += `<div data-role="chartlabel">${Math.floor(maxguy + gap)}</div>`;
	for(let c=0;c<thalabels;c++){
		let ltxt = Math.floor(maxguy - (gap * c));
		labels += `<div data-role="chartlabel">${ltxt}</div>`;
	}
	labels += `<div data-role="chartlabel">${Math.floor(minguy - gap)}</div>`;

	// make the data bars
	data.forEach((el,id) => {
		let f = getFactor(minguy - gap, maxguy + gap, el);
		let h = f * 100;
		barshtml += `<div data-role="chartbar" style="height:${h}%" data-myval="${el}">.</div>`;
		vals += `<div>${el}</div>`;
	});

	mydiv.innerHTML = `
	<div class="line top">
		<div class="y axis">${labels}</div>
		<div class="chartarea">${barshtml}</div>
	</div>`;

	// put the div inside the holder
	theholder.appendChild(mydiv);

	return theholder.outerHTML;
}

// code that returns the factor of an item based on linear interpolation
function getFactor(min,max,value) {
	let f = (value - min) / (max - min);
	return f;
}