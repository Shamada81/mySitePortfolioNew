// Слайдер реализован как горизонтальная линия из отдельных слайдов по порядку с длинной равной длине слайда*кол-во слайдов


function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          width = window.getComputedStyle(slidesWrapper).width,
          slidesField = document.querySelector(field);

    // номер дефолтного слайда
    let slideIndex = 3;
    // Смещение "линии слайдов" для показа дефолтного слайда
    let offset = +width.match(/\d+/) * (slideIndex - 1);
    slidesField.style.transform = `translateX(-${offset}px)`

    function currentNumber(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // показ номера слайда
    total.textContent = currentNumber(slides.length);
    current.textContent = currentNumber(slideIndex);

    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });


    slider.style.position = 'relative';

    // стили для индикатора внизу слайдера
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == slideIndex - 1) {
            dot.style.opacity = 1;
        }

        dots.push(dot);
        indicators.append(dot);
    }

    function dotsIndicator(n) {
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[n].style.opacity = 1;
    }

    // показ следующего слайда
    next.addEventListener('click', () => {
        if (offset == +width.match(/\d+/) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += +width.match(/\d+/);
            slideIndex++;
        }
        dotsIndicator(slideIndex - 1);
        current.textContent = currentNumber(slideIndex);
        slidesField.style.transform = `translateX(-${offset}px)`;

    });

    // показ предыдущего слайда
    prev.addEventListener('click', () => {
        if (offset == 0) {
            slideIndex = slides.length;
            offset = +width.match(/\d+/) * (slides.length - 1);
        } else {
            offset -= +width.match(/\d+/);
            slideIndex--;
        }
        dotsIndicator(slideIndex - 1);
        current.textContent = currentNumber(slideIndex);
        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    // смена слайдеров при нажатии на индикаторы на слайде
    indicators.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName != 'LI') {
            return;
        }

        slideIndex = +target.getAttribute('data-slide-to');

        dotsIndicator(slideIndex - 1);
        total.textContent = currentNumber(slideIndex);
        current.textContent = currentNumber(slideIndex);
        offset = +width.match(/\d+/) * (slideIndex - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
    });

}


export default slider;