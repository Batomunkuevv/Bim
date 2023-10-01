"use strict";

const MEDIA_992_WIDTH = window.matchMedia("(max-width: 992px)");

const rerenderFooter = () => {
    const siteFooter = document.querySelector(".site-footer");

    if (!siteFooter || !MEDIA_992_WIDTH.matches) return;

    const siteFooterLeft = siteFooter.querySelector(".site-footer__left");
    const siteFooterRight = siteFooter.querySelector(".site-footer__right");
    const siteFooterDisclaimer = siteFooter.querySelector(".site-footer__disclaimer");
    const siteFooterCopyright = siteFooter.querySelector(".site-footer__copyright");

    siteFooterRight.append(siteFooterCopyright);
    siteFooterLeft.append(siteFooterDisclaimer);
};

const initParallax = () => {
    const parallaxScene = document.querySelector(".scene");

    if (!parallaxScene) return;

    parallaxScene.addEventListener("mousemove", moveParallax);
    parallaxScene.addEventListener("touchmove", moveParallax);

    function moveParallax(e) {
        const clientX = e.type === "touchmove" ? e.changedTouches[0].clientX : e.clientX;
        const clientY = e.type === "touchmove" ? e.changedTouches[0].clientY : e.clientY;
        const rotateX = `${(clientX - window.innerWidth / 2) * -0.005}deg`;
        const rotateY = `${(clientY - window.innerHeight / 2) * 0.01}deg`;

        document.documentElement.style.setProperty("--move-x", rotateX);
        document.documentElement.style.setProperty("--move-y", rotateY);
    }
};

const initLozad = () => {
    const lozadElements = document.querySelectorAll("[data-lozad]");

    if (!lozadElements) return;

    lozadElements.forEach((element) => {
        const lozadObserver = lozad(element);

        lozadObserver.observe();
    });
};

const initLatestNewHover = () => {
    const latestNews = document.querySelectorAll(".latest-new");

    if (!latestNews) return;

    latestNews.forEach((latestNew) => {
        const latestNewLine = latestNew.querySelector(".latest-new__line");
        const latestNewMore = latestNew.querySelector(".latest-new__more");

        latestNew.addEventListener("mouseover", shrinkLine);
        latestNew.addEventListener("mouseleave", growLine);

        function shrinkLine() {
            latestNewLine.style.width = `${Math.round(latestNewMore.getBoundingClientRect().width)}px`;
        }

        function growLine() {
            latestNewLine.style.width = ``;
        }
    });
};

const initContactsMap = () => {
    let contactsMap = document.querySelector(".have-questions__map");

    if (!contactsMap || !ymaps) return;

    ymaps.ready(init);

    function init() {
        const center = [55.770335, 37.590847];

        contactsMap = new ymaps.Map(contactsMap, {
            center: center,
            zoom: 12,
        });

        const placemark = new ymaps.Placemark(
            center,
            {},
            {
                iconLayout: "default#image",
                iconImageHref: "../images/icons/location.svg",
                iconImageSize: [32, 32],
                iconImageOffset: [-5, -38],
            }
        );

        contactsMap.geoObjects.add(placemark);

        contactsMap.controls
            .remove("mapTools")
            .remove("typeSelector")
            .remove("searchControl")
            .remove("trafficControl")
            .remove("miniMap")
            .remove("scaleLine")
            .remove("routeEditor")
            .remove("smallZoomControl");
    }
};

window.addEventListener("DOMContentLoaded", (e) => {
    initParallax();
    initLozad();
    initContactsMap();
    initLatestNewHover();
    rerenderFooter();
});
