"use strict";

const MEDIA_992_WIDTH = window.matchMedia("(max-width: 992px)");
const MEDIA_768_WIDTH = window.matchMedia("(max-width: 768px)");

const rerenderFooter = () => {
    const siteFooter = document.querySelector(".site-footer");

    if (!siteFooter) return;

    const siteFooterBody = siteFooter.querySelector(".site-footer__body");
    const siteFooterLeft = siteFooter.querySelector(".site-footer__left");
    const siteFooterRight = siteFooter.querySelector(".site-footer__right");
    const siteFooterDisclaimer = siteFooter.querySelector(".site-footer__disclaimer");
    const siteFooterCopyright = siteFooter.querySelector(".site-footer__copyright");

    if (MEDIA_992_WIDTH.matches && !MEDIA_768_WIDTH.matches) {
        const siteFooterBottom = document.createElement("div");
        siteFooterBottom.classList.add("site-footer__bottom");

        siteFooterBottom.append(siteFooterCopyright);
        siteFooterBody.append(siteFooterBottom);
        siteFooterLeft.append(siteFooterDisclaimer);
    }

    if (MEDIA_768_WIDTH.matches) {
        siteFooterRight.append(siteFooterCopyright);
        siteFooterLeft.append(siteFooterDisclaimer);
    }
};

const initParallax = () => {
    const parallaxScene = document.querySelector(".scene");

    if (!parallaxScene) return;

    window.addEventListener("mousemove", moveParallax);
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
                iconImageHref: "./images/icons/location.svg",
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

const initBurgerMenu = () => {
    const menu = document.querySelector(".site-header__menu");
    const burger = document.querySelector(".burger");

    if (!menu || !burger) return;

    const menuClose = document.querySelector(".site-header__menu-close");

    if (menuClose) menuClose.addEventListener("click", handleMenuCloseClick);

    burger.addEventListener("click", handleBurgerClick);

    function handleMenuCloseClick() {
        menu.classList.remove("is-open");
        document.body.classList.remove("lock");
    }

    function handleBurgerClick() {
        menu.classList.add("is-open");
        document.body.classList.add("lock");
    }
};

window.addEventListener("DOMContentLoaded", (e) => {
    initBurgerMenu();
    initParallax();
    initLozad();
    initContactsMap();
    initLatestNewHover();
    rerenderFooter();
});
