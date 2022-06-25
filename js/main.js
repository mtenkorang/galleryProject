"use strict"
window.addEventListener('load', () => {
    const gallery = document.getElementById('gallery');

    fadeIn(gallery);

    function fadeIn(element, duration = 500) {
        element.style.display = '';
        var last = +new Date();
        var tick = function() {
            element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
            last = +new Date();
            if(+element.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
        tick();
    }
})