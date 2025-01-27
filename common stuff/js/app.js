// global variables
var phoneNumber = '254715360479';
var links = ['About Me','my works','contact me'];
var starttime = Date.now();
var fps = 24;
var particling = false;

function setupNavBar(){
    let navholders = document.querySelectorAll('.smallmenu');

    navholders.forEach((element,index) => {
        let tempo = "";
        links.forEach((element,id) => {
            id++;
            if(index == 0){
                tempo += `<a class="mybtn" id="menu${id}" onclick="curpage=${id}+1;switchtab('.tab',${id})">${element}</a>`;
            } else {
                tempo += `<a class="mybtn" id="menu${id}" onclick="curpage=${id}+1;switchtab('.tab',${id}),showIt('.sidemenu','grid')">${element}</a>`;
            }
        });

        element.innerHTML = tempo;
    });
}

function setupnumbers(series,sep) {
    let items = document.querySelectorAll(series);

    items.forEach((element,index) => {
        (sep == undefined) ? element.innerHTML = index + 1 : element.innerHTML = `${index + 1}${sep}${items.length}`;
    });
}

function checkScrollers(ratio) {
    ratio = (ratio == undefined) ? Math.floor((Math.floor(window.scrollY) / Math.floor(window.scrollMaxY)) * 100) : ratio;
    let items = document.querySelectorAll('.showOnScroll');

    items.forEach(element => {
        let thecon = (element.dataset.startat <= ratio) && (element.dataset.endat >= ratio);

        if(element.dataset.method != "opacity"){
            element.style.display = thecon ? "block" : "none";
        } else {
            element.style.opacity = thecon ? "1" : "0.5";
        }

        let logger = element.querySelector('[data-logguy]');

        if(logger == undefined){
            logger = document.createElement('b');
            logger.dataset.logguy = "yes";
            element.innerHTML += logger.outerHTML;
            console.log("creating");
        } else {
            console.log("working");
        }

        logger.classList.add('w3-tag');
        logger.innerHTML = `(${element.dataset.startat} >= ${ratio}) && (${element.dataset.endat} <= ${ratio}) ${ratio} : ${thecon}`;
    });
}

function whatsappLink(phone,thetext) {
    return `(https://wa.me/${phone}?text=${thetext})`;
}

function startParticles(holder,count,minradius,maxradius) {
    // initialise the particles
    let item = document.querySelector(holder);
    let particle = document.createElement('div');
    particle.classList.add("particle");
    particle.style.aspectRatio = "1";

    item.innerHTML = '';

    for (let x = 0; x < count; x++) {
        let radius = `${minradius + (Math.random() * (maxradius - minradius))}px`;
        let left = lerp(0,100,(x / count));

        particle.style.width = radius;
        particle.style.height = radius;
        // particle.style.backgroundColor = getRandomColor();
        particle.style.opacity = 0;
        particle.style.position = 'absolute';
        particle.style.left = `${left}%`;

        particle.dataset.duration = randomRange(13,30);
        particle.style.animationDuration = `calc(${particle.dataset.duration}s - 100ms)`;
        particle.innerHTML = '<i class="fa fa-music"></i>';
        particle.classList.add('glowtxt');

        item.innerHTML += particle.outerHTML;
    }

    // spread them around
    particles = item
}

function workParticles(){
    let particles = document.querySelectorAll('.particle');
    let display = document.querySelector('.logger');
    let holder = document.querySelector('.pagecontent');

    let maxpos = holder.offsetHeight;

    // the absolute time (used to figure out the particle movement)
    let lifetime = (Date.now() - starttime);

    particles.forEach((element,index) => {
        let myduration = Number(element.dataset.duration) * 1000;
        let tempfactor = (lifetime % myduration) / 1000;
        let wantedpos = lerp(maxpos - 45,0,tempfactor / Number(element.dataset.duration));
        let particle = particles[index];
        let factor = tempfactor / Number(element.dataset.duration);

        particle.style.top = `${wantedpos}px`;
        particle.dataset.progress = `${factor}`
        particle.dataset.val = `${maxpos} ~ ${tempfactor} = ${wantedpos}px`;
        particle.style.opacity = realcurve(0,1,factor);
    })

    display.innerHTML = `${lifetime / 1000} s`;
    console.log('logged');
}

var particlesInterval;

function runparticles(){
    particlesInterval = setInterval(() => {
        workParticles();
    }, (1 / fps) * 1000);
    particling = true;
}

function stopparticles() {
    clearInterval(particlesInterval);
    particling = false;
}

function toggleParticles(btn,on,off) {
    let mybtn = document.querySelector(btn);
    if(particling){
        stopparticles();
        mybtn.innerHTML = on;
    } else {
        runparticles();
        mybtn.innerHTML = off;
    }
}
