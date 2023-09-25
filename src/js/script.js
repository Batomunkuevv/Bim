"use strict";

const MEDIA_1200_WIDTH = window.matchMedia('(max-width: 1200px)');

const initParallax = () => {
    const parallaxScene = document.querySelector('.scene');

    if (!parallaxScene) return;

    if (MEDIA_1200_WIDTH.matches) {
        initMobileParallax();
    } else {
        initDesktopParallax();
    }

    function initDesktopParallax() {
        const rotationElements = parallaxScene.querySelectorAll('[data-rotation]');

        if (!MEDIA_1200_WIDTH.matches) {
            parallaxScene.addEventListener('mousemove', initRotationElements)
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

    function initMobileParallax() {
        parallaxScene.addEventListener('mousemove', e => {
            Object.assign(document.documentElement, {
                style: `
            --move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
            --move-y: ${(e.clientY - window.innerHeight / 2) * .01}deg;
            `
            })
        })
    }


}

window.addEventListener("DOMContentLoaded", (e) => {
    initParallax();
});