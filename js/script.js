"use strict";

const initParallax = () => {
    const parallaxScene = document.querySelector('.scene');

    if (!parallaxScene) return;

    const parallaxSceneBg = parallaxScene.querySelector('.scene__layer--bg');
    const rotationElements = parallaxScene.querySelectorAll('[data-rotation]');

    if (!window.matchMedia('(max-width: 1200px)').matches) {
        window.addEventListener('mousemove', initRotationElements)
    }

    if (window.matchMedia('(max-width: 768px)').matches) {
        parallaxSceneBg.setAttribute('data-depth', '0.1');
    }

    const parallaxInstance = new Parallax(parallaxScene, {
        scalarX: 12,
        scalarY: 12,
    });

    function initRotationElements(e) {
        let coordX = e.clientX - window.innerWidth / 2;
        let rotateDegree = (coordX / window.innerWidth / 2) * 20;

        rotationElements.forEach(element => {
            const elementDegree = rotateDegree * element.dataset.rotation;

            if (element.classList.contains('hero-parallax__title')) {
                element.style.transform = `
                    rotateY(${elementDegree}deg)
                    translateX(-50%)
                    translateY(-50%)
                `;
            } else {
                element.style.transform = `
                    rotateY(${elementDegree}deg)
                    translateX(-50%)
                `;
            }


        })
    }

}

window.addEventListener("DOMContentLoaded", (e) => {
    initParallax();
});


// const parallaxElements = parallaxSection.querySelectorAll('[data-parallax]');

// parallaxSection.addEventListener('mousemove', moveParallaxElements);

// function moveParallaxElements(e) {
//     let coordX = e.clientX - window.innerWidth / 2;
//     let coordY = e.clientY - window.innerHeight / 2;
//     let rotateDegree = (coordX / window.innerWidth / 2) * 20;

//     parallaxElements.forEach(element => {
//         const elementSpeeds = getElementSpeeds(element.dataset.parallax);
//         const isInLeft = parseFloat(getComputedStyle(element).left) < window.innerWidth / 2 ? 1 : -1;
//         const zValue = elementSpeeds.speedZ * isInLeft * (e.clientX - parseFloat(getComputedStyle(element).left));
//         const elementDegree = rotateDegree * elementSpeeds.rotationSpeed;
//         let elementCoordX = -coordX * elementSpeeds.speedX;
//         let elementCoordY = coordY * elementSpeeds.speedY;

//         if (element.classList.contains('parallax-scene__bg')) {
//             elementCoordX = `calc(-50% + ${elementCoordX}px)`;
//             elementCoordY = `calc(-50% + ${elementCoordY}px)`;

//             element.style.transform = `
//                 perspective(2300px)
//                 rotateY(${elementDegree}deg)
//                 translate3d(${elementCoordX}, ${elementCoordY}, ${zValue}px)`;
//         } else {
//             element.style.transform = `
//                 perspective(2300px)
//                 rotateY(${elementDegree}deg)
//                 translate3d(calc(-50% + ${elementCoordX}px), ${elementCoordY}px, ${zValue}px)`;
//         }

//     })
// }

// function getElementSpeeds(speeds) {
//     speeds = speeds.split(',').map(speed => {
//         const equalsIndex = speed.indexOf('=') + 1;

//         return parseFloat(speed.slice(equalsIndex));
//     });


//     return {
//         speedX: speeds[0],
//         speedY: speeds[1],
//         speedZ: speeds[2],
//         rotationSpeed: speeds[3],
//     }
// }