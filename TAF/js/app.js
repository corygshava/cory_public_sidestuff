var parsed_data = undefined;

var ui_items = document.querySelector('.items');
var themodal = document.querySelector('#themodal');
var ui_filters = document.querySelector('.filterguy');
var ui_thefilters = ui_filters.querySelectorAll('a');
var ui_thecounter = document.querySelector('.thecount');

// for animations
let timing = {
	duration: 700,
	delay:100,
	easing: 'ease-out',
	fill: 'forwards'
}
let keyframes = [
	{opacity: 0},
	{opacity: 1}
]

function mekItems() {
	let dataguy = getthedata2();

	dataguy.then((res) => {
		thedata = res;

		parsed_data = thedata;
		let data = parsed_data;
		let template = data[0];

		ui_items.innerHTML = ``;

		data.forEach((el,id) => {
			let item = document.createElement('div');

			let payld = el.Birthday.split("/").reverse().join("/");
			let yearsdate = `${payld}/ 2025`;
			let bdate = new Date(yearsdate);
			let timerem = daysUntil(bdate);
			let specialclass = timerem != "tomorrow" && timerem != "today" && timerem != "passed" ? "incoming" : timerem;

			item.className = `item ${specialclass} _is`;
			item.innerHTML = `
				<div>${el.Name}</div>
				<div class="bdata">
					birthday <b class="w3-tag">${bdate.toLocaleDateString()}</b><br>
					<b class="w3-hide">${el.daysto}</b><br>
					<b class="themetxt">${timerem}</b>
				</div>
			`;

			ui_items.appendChild(item);

			// add click event
			item.addEventListener('click',() => {
				viewinfo(id);
			})

			// play animation
			item.animate(keyframes,timing);
			timing.delay += 200;
		})

		setupfilters();
		ui_thecounter.innerHTML = data.length;
	})
}

async function getthedata2() {
	let rawdata = `[]`;

	try{
		let req = await fetch('data.json');

		if(!req.ok){
			throw new Error("request failed");
		}

		let res = await req.text();
		let rawlist = JSON.parse(res);
		let today = new Date();

		// this function gets days to a date
		const daystill = (dte) => {
			// console.log("sys: ",today);
			let yy = today.getFullYear();
			let moon = Number(dte.split("/")[1]);
			let day = Number(dte.split("/")[0]);
			let bdate = new Date(yy,moon - 1,day);

			// console.log("them: ",bdate)

			if(bdate < today){
				bdate = new Date(yy + 1,moon - 1,day);
			}

			let timegap = bdate - today;
			let days = timegap / (1000 * 60 * 60 * 24);

			return Math.ceil(days);
		};

		// add the days remaining to each item
		rawlist.forEach((el,id) => {
			rawlist[id]["daysto"] = daystill(el.Birthday);
		});

		// console.log("running getter: ",rawdata,rawlist);

		// sort the list of names
		let sorted = [...rawlist].sort((a,b) => {
			let diff = a.daysto - b.daysto;

			return diff;
		});

		// console.log("sorted: ",sorted);

		return sorted;
	} catch(err){
		console.log(err);

		return [];
	}
}

async function getthedata(){
	try {
		let res = await fetch('data.json');
		return await res.text();
	} catch (err) {
		console.error(err);
	}
}

function setupfilters() {
	ui_thefilters.forEach(el => {
		if(el.dataset.myfilter != '*'){
			let count = ui_items.querySelectorAll(`.item.${el.dataset.myfilter}`).length;

			if(count > 0){
				el.innerHTML += ` <b class="w3-tag">${count}</b>`;
			}
		}
	})
}

function highlightfilter(m) {
	ui_thefilters.forEach(el => {
		let theclass = "themebg";

		if(el.dataset.myfilter == m){
			el.classList.add(theclass);
		} else {
			el.classList.remove(theclass);
		}
	})
}

function viewinfo(n) {
	let info = parsed_data[n];

	Object.keys(info).forEach(el => {
		let _ui = themodal.querySelector(`.${el}`);

		if(_ui != undefined){
			_ui.innerHTML = ` ${info[el]}`;
		}
	});

	toggleShow(`#${themodal.id}`);
}

window.addEventListener('load',() => {
	mekItems();
});

function filterItems(m) {
	let items = ui_items.querySelectorAll('.item');
	let found = 0;

	highlightfilter(m);
	m = m == "*" ? "_is" : m;

	items.forEach((el,id) => {
		let show = el.className.includes(m) ? "flex" : "none";
		el.style.display = show;

		found += show == 'flex' ? 1 : 0;
	})

	let nada = ui_items.querySelector('.item.nada');

	if(nada == undefined){
		console.log("making nada");

		nada = document.createElement('div');

		nada.className = "item nada";
		nada.innerHTML = "<i>No items for this category</i>";

		ui_items.appendChild(nada);
		timing.delay = 300;
		nada.animate(keyframes,timing);
	} else {
		nada.animate(keyframes,timing);
	}

	console.log(nada);
	nada.style.display = found == 0 ? "flex" : "none";
}