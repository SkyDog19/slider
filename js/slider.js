'use strict';
/*jshint -W097*/

let images = [{
    url: 'image/for-slider/slide-photo.jpg',
    title: 'ROSTOV-ON-DON, ADMIRAL'
}, {
    url: 'image/for-slider/miagka.jpg',
    title: 'SOCHI THIEVES'
}, {
    url: 'image/for-slider/stili-mebeli.jpg',
    title: 'ROSTOV-ON-DON PATRIOTIC'
}];


function initSlider() {
    if (!images || !images.length) { //если масива нет или массив пустой, заканичваем операцию
        return;
    } else {
        const sliderImages = document.querySelector('.slider-wrapper'); //родитель для картинок
        const sliderArrows = document.querySelectorAll('.arrow'); //родитель стрелок
        const sliderDots = document.querySelector('.swiper-pagination'); //Родитель точек
        const sliderList = document.querySelector('.slider-projects-completed__list'); //Список названий для слайдера
        const sliderImagesMobile = document.querySelector('.wrapper-slider-fow-mobile__body');
        const sliderArrowsMobile = document.querySelectorAll('.wrapper-slider-fow-mobile__arrows');

        //Создаём функцию для массива с изображением и созданием элементов
        let initImages = () => {
            images.forEach((image, index) => {
                let imageDiv = `
                <div data-index="${index}" class="slider-wrapper__slide swiper-slide n${index} ${index === 0 ? 'show-slide' : ''}">
                    <div class="swiper-slide__image">
                        <img src="${images[index].url}" alt="Изображение слайдера">
                    </div>
                </div>
                `;
                let imageDivMobile = `
                <div data-index="${index}" class="wrapper-slider-fow-mobile__slide slide-for-mobile n${index} ${index === 0 ? 'show-slide-for-mobile' : ''}">
                    <div class="slide-for-mobile__image">
                        <img src="${images[index].url}"
                            alt="Изображение слайдера для мобильных версий">
                    </div>
                </div>
                `;
                sliderImages.innerHTML += imageDiv;
                sliderImagesMobile.innerHTML += imageDivMobile;
            });
        };

        initImages();

        let sliderMove = (num) => {

            const dotItems = document.querySelectorAll('.swiper-pagination__bullet');
            const titileItems = document.querySelectorAll('.slider-projects-completed__item');
            sliderImages.querySelector('.show-slide').classList.remove('show-slide'); //у элмента с классом show-slide удаляем класс show-slide
            sliderImages.querySelector('.n' + num).classList.add('show-slide'); //элементу, который соответсвует аргументу num, добавляем класс show-slide

            sliderDots.querySelector('.active-dot').classList.remove('active-dot');
            dotItems[num].classList.add('active-dot');
            sliderList.querySelector('.head-slide-active').classList.remove('head-slide-active');
            titileItems[num].classList.add('head-slide-active');

            sliderImagesMobile.querySelector('.show-slide-for-mobile').classList.remove('show-slide-for-mobile'); //у элмента с классом show-slide удаляем класс show-slide
            sliderImagesMobile.querySelector('.n' + num).classList.add('show-slide-for-mobile');

        };

        let initArrows = () => {
            sliderArrows.forEach(arrow => {
                arrow.addEventListener('click', () => {
                    let cutNumber = +sliderImages.querySelector('.show-slide').dataset.index; //получем значение индекса активного слайдера в числовом типе данных
                    let nextNumber;
                    if (arrow.classList.contains('swiper-button-prev')) {
                        nextNumber = cutNumber === 0 ? images.length - 1 : cutNumber - 1;
                    } else {
                        nextNumber = cutNumber === images.length - 1 ? 0 : cutNumber + 1;
                    }

                    sliderMove(nextNumber);
                });
            });
        };

        initArrows();

        let initArrowsMobile = () => {
            sliderArrowsMobile.forEach(arrow => {
                arrow.addEventListener('click', () => {
                    let cutNumberMobile = +sliderImagesMobile.querySelector('.show-slide-for-mobile').dataset.index;
                    let nextNumberMobile;
                    if (arrow.classList.contains('slider-for-mobile__swiper-button-prev')) {
                        nextNumberMobile = cutNumberMobile === 0 ? images.length - 1 : cutNumberMobile - 1;
                    } else {
                        nextNumberMobile = cutNumberMobile === images.length - 1 ? 0 : cutNumberMobile + 1;
                    }

                    // sliderImagesMobile.querySelector('.show-slide-for-mobile').classList.remove('show-slide-for-mobile'); //у элмента с классом show-slide удаляем класс show-slide
                    // sliderImagesMobile.querySelector('.n' + nextNumberMobile).classList.add('show-slide-for-mobile');
                    sliderMove(nextNumberMobile);
                });



            });
        };

        initArrowsMobile();

        let initDotsTitles = () => {
            images.forEach((image, index) => {
                let dot = `<button data-index=${index} class="swiper-pagination__bullet dot-bullet ${index === 0 ? 'active-dot' : ''}"></button>`;
                let title = `
                <li data-index=${index} class="slider-projects-completed__item head-slide ${index === 0 ? 'head-slide-active' : ''}">
                    ${images[index].title}
                </li>
                `;
                sliderDots.innerHTML += dot;
                sliderList.innerHTML += title;
            });

            document.querySelectorAll('.dot-bullet').forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    document.querySelectorAll('.active-dot').forEach((dot, index) => {
                        dot.classList.remove('active-dot');
                    });
                    dot.classList.add('active-dot');
                    sliderMove(index);
                });
            });
            document.querySelectorAll('.head-slide').forEach((head, index) => {
                head.addEventListener('click', () => {
                    document.querySelectorAll('.head-slide-active').forEach((head, index) => {
                        head.classList.remove('head-slide-active');
                    });
                    head.classList.add('head-slide-active');
                    sliderMove(index);
                });
            });
        };

        initDotsTitles();

    }
}


initSlider();