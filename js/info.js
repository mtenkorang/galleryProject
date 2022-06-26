'use strict'

window.addEventListener('load', () => {

    const hero = document.getElementById('hero-image');
    const hero_title = document.getElementById('hero-title');
    const hero_author = document.getElementById('hero-author');
    const author = document.getElementById('author-image');
    const year = document.getElementById('year');
    const description = document.getElementById("description");
    const source = document.getElementById('source');
    const footer_title = document.getElementById('footer-title');
    const footer_author = document.getElementById('footer-author');
    const progress = document.getElementById('progress');
    const next = document.getElementById('next');
    const back = document.getElementById('back');

    const view = document.getElementById('view-picture');
    const model = document.getElementById('model');
    const model_image = document.getElementById('model-image');
    const slide = document.getElementById('slide');
    const close = document.getElementById('close');
    const gallery = document.getElementById('gallery');


    let dataPicture = {}
    dataPicture.hero;
    dataPicture.gallery;
    dataPicture.title;
    dataPicture.author;
    dataPicture.imageAuthor;
    dataPicture.year;
    dataPicture.desc;
    dataPicture.go;

    let value = 1;

    var url = window.location.href;
    url = unescape(url);
    url = url.toUpperCase();

    function obtainValue(variable) {
        var variable_may = variable.toUpperCase();
        var variable_pos = url.indexOf(variable_may);

        if(variable_pos != -1) {
            var position_separator = url.indexOf("&", variable_pos);

            if (position_separator != -1) {
                return parseInt(url.substring(variable_pos + variable_may.length + 1, position_separator));
            }else{
                return parseInt(url.substring(variable_pos + variable_may.length + 1, url.length));
            }
        } else {
            return -1;
        }
    }

    value = obtainValue("verinfo");

    // Fetch Data.JSON from Online
    DataRetrieval(value);

    function DataRetrieval(value) {
        if (value >= 0) {
            fetch("https://mtenkorang.github.io/db/data.json")
            .then(response => response.json())
            .then(data => {
                dataPicture.gallery = data[value].images.hero.small;
                dataPicture.hero = data[value].images.hero.large;
                dataPicture.title = data[value].name;
                dataPicture.author = data[value].artist.name;
                dataPicture.imageAuthor = data[value].artist.image;
                dataPicture.year = data[value].year;
                dataPicture.desc = data[value].description;
                dataPicture.go = data[value].source;
                renderData();
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    let link = dataPicture.gallery;
    //Render Data
    function renderData() {
        hero.style.backgroundImage = `url('./${dataPicture.gallery}')`;
        // hero.append("<img src=\" \" />");
        hero_title.innerHTML = dataPicture.title;
        hero_author.innerHTML = dataPicture.author;
        author.style.backgroundImage = `url('./${dataPicture.imageAuthor}')`
        year.innerHTML = dataPicture.year;
        description.innerHTML = dataPicture.desc;
        source.href = dataPicture.go;
        footer_title.innerHTML = dataPicture.title;
        footer_author.innerHTML = dataPicture.author;
        progress.value = 6.8 * (value + 1);

        //Add Event Listeners
        view.addEventListener('click', () => {
            model.classList.toggle('is-visible');
            model_image.style.backgroundImage = `url('./${dataPicture.hero}')`;
        });
        close.addEventListener('click', () => {
            model.classList.toggle('is-visible');
        })
    }


    //Slide Transitions
    function fadeIn(element, duration = 500) {
        element.style.display = '';
        element.style.opacity = 0;
        var last = +new Date();
        var tick = function() {
            element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
            last = +new Date();
            if (+element.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 20)
            }
        };
        tick();
    }

    fadeIn(slide);
    next.addEventListener('click', () => {
        if (value < 14) {
            next.href = `./info.html?verinfo=${value + 1}`;
            DataRetrieval(value);
        }
    })
    back.addEventListener('click', () => {
        if (value > 0) {
            back.href = `./info.html?verinfo=${value - 1}`;
            DataRetrieval(value);
        }
    })

})