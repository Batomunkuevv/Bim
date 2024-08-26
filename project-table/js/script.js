const fillTable = () => {
    const PAGES = [
        {
            name: 'Главная',
            slug: 'homepage.html'
        },
        {
            name: 'Контакты',
            slug: 'contacts.html'
        },
        {
            name: 'Шаблон страницы',
            slug: 'page.html'
        },
        {
            name: 'Шаблон списков',
            slug: 'list.html'
        },
        {
            name: 'Пост',
            slug: 'post.html'
        },
        {
            name: 'Пресс-центр',
            slug: 'press-center.html'
        },
        {
            name: 'Страница поиска',
            slug: 'search.html'
        },
        {
            name: 'Страница поиска – не найдено',
            slug: 'search-not-found.html'
        },
        {
            name: 'Документы',
            slug: 'documents.html'
        },
        {
            name: '404',
            slug: '404.html'
        },
    ]
    const DOMAIN = window.location.href.includes('index.html') ? window.location.href.replace('index.html', '') : window.location.href;
    const projectTable = document.querySelector('.project-table');

    if (!projectTable) return;

    PAGES.forEach((page, i) => {
        const tableRow = createTableRow(page, ++i);

        projectTable.append(tableRow);
    })

    function createTableRow(page, i) {
        const tableRow = document.createElement('div');
        const pageLink = page.slug ? DOMAIN + page.slug : DOMAIN;

        tableRow.classList.add('project-table__row');
        tableRow.innerHTML = `
            <div class="project-table__cell project-table__cell--number">${i}</div>
            <div class="project-table__cell">${page.name}</div>
            <div class="project-table__cell">
                <a class="project-table__link" href="${pageLink}" target="_blank">${pageLink}</a>
            </div>
        `

        return tableRow;
    }
}

const initRunningLine = () => {
    const runningLine = document.querySelector('.running-line__body');

    if (!runningLine) return;

    const options = {
        slidesPerView: 'auto',
        spaceBetween: 30,
        speed: 3000,
        loop: true,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
        }
    }

    const runningLineSwiper = new Swiper(runningLine, options);
}

window.addEventListener('DOMContentLoaded', () => {
    initRunningLine();
    fillTable();
})