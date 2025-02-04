var thenpt = document.getElementById('expression');
var theans = document.querySelector('#result');
var cholder = document.querySelector('.calcsholder');
var logreport = document.querySelector('.loggedreport');

var prefname = "calculamatrix-logged_calculations";
var svd = [];
var hugenumber = `2000000000000000000000000000`;
var lastresult = 0;

function evaluateExpression() {

    const expression = thenpt.value;
    let result = getres(expression);

    result = isNaN(result) ? result : result.toLocaleString();

    if(result != 'ERROR!'){
        theans.animate([
            {opacity: 0,translate: '0 -40px'},
            {opacity: 1,translate: '0 0'}
        ],{
            duration: 300,
            easing: "ease-out"
        })
    }

    result = String(result).length > hugenumber.length ? `<marquee>${result}</marquee>` : result;
    document.getElementById('result').innerHTML = result;
}

function cleanExpression() {
    let exp = thenpt.value;
    let theres = lastresult == "ERROR!" ? 0 : Number(lastresult);

    // replace ans with the number
    exp = exp.replaceAll("ans",`${theres}`);
    thenpt.value = '';

    setTimeout(() => {
        thenpt.value = exp;
    },200);
}

function getres(m) {
    let res;

    try {
        res = eval(m);
    } catch (e) {
        res = 'ERROR!';
    }

    lastresult = res;

    return res;
}

function rerunme(n) {
    if(n == undefined){console.log(`specify an index`);return;}

    let items = document.querySelectorAll('.calc');

    if(n >= items.length){console.log(`item ${n} doesnt exist`);return;}

    let calc = items[n];
    let caltxt = calc.querySelector('span').innerText;

    thenpt.value = caltxt;
}

function logcalc(w) {
    if(w != ''){
    	let id = cholder.querySelectorAll('.calc').length;
        let m = document.createElement('div');
        m.classList.add('calc');

        let b = document.createElement('b');
        b.className = "ans";
        let mtxt = getres(w) == 'ERROR!' ? getres(w) : (getres(w)).toLocaleString();
        b.innerText = `${mtxt}`;
        m.appendChild(b);

        b = document.createElement('span');
        b.className = "sum";
        b.innerText = w;
        m.appendChild(b);

        b = document.createElement('button');
        b.innerHTML = `<i class="fa fa-chevron-up"></i>`;
        b.className = 'inbtn';
        b.addEventListener('click',() => {rerunme(id);})
        m.appendChild(b);

        cholder.appendChild(m);
    }
}

function initlogged() {
    cholder.innerHTML = '';
    let savedtxt = localStorage.hasOwnProperty(prefname) ? localStorage.getItem(prefname) : '';

    console.log(`stuff saved as ${savedtxt}`);

    if(savedtxt != ''){
        svd = savedtxt.split(",");
    } else {
        // alert('no logged calculations have been saved');
    }

    console.log(`init : ${svd}`);

    svd.forEach(el => {
        logcalc(el);
    })

    logreport.innerHTML = `${svd.length} saved ${plural('calculation',svd.length)}`;
}

function savecalcs() {
    svd = [];
    let calcs = cholder.querySelectorAll('.calc');

    calcs.forEach(el => {
        let tmc = el.querySelector('.sum');
        svd.push(tmc.innerText);
    })

    console.log(svd);

    let outstring = svd.join(',');
    localStorage.setItem(prefname,outstring);
    alert('saved');

    initlogged();
}

function delcalcs() {
    svd = [];
    localStorage.removeItem(prefname);
    alert('items deleted');

    setTimeout(() => {
        initlogged();
    },200);
}

initlogged();