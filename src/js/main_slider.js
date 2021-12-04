// Слайдер смены background

// **** Блок конфигурации слайдера **** //

// Родительский объект для вставки слайдера
const container = document.querySelector('.bgGenerator .container');
// Количество слайдеров
const  totalNumberOfImage = 2;
// Массив с url-картинок фона
const bgArray = [ './img/background/background2.jpg', './img/background/background3.jpg', './img/background/background4.jpg', './img/background/background5.jpg', './background/img/background6.jpg'];


// **** Блок констант и переменных **** //

// Основные константы браузера
const heightWindow = document.body.clientHeight,
	  maxHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight),
	  totalHeight = Math.floor(maxHeight - heightWindow),
	  oneSliderSize = totalHeight / totalNumberOfImage;

// Текущие прокрутка и номер картинки
let counterScroll = 0,
	numberOfImage = 0;




// Формирование блоков для bg
for (let i = 0; i < totalNumberOfImage; i++) {
	const divElem = document.createElement('div'),
		  imgElem = document.createElement('img');
	
	imgElem.src = bgArray[i];
	divElem.append(imgElem);
	divElem.classList.add('bgGenerator__item');
	divElem.style.zIndex = '0';
	divElem.dataset.number = i + 1;

	container.append(divElem);
}

// Функция пересчета размеров блоков
function toResizeImage(index, deltaHeight) {
	const elems = document.querySelectorAll('.bgGenerator__item');
	elems.forEach((item,i) => {

		if (i < index - 1) {
			item.style.height = 100 + '%';
			item.style.opacity = 1;
			item.style.zIndex = item.dataset.number;
		} else if (i > index - 1) {
			item.style.height = 0;
			item.style.opacity = 0;
		} else if (i == index - 1) {
			item.style.zIndex = item.dataset.number;
			item.style.height = `${deltaHeight*100}%`;
			item.style.opacity = (deltaHeight >= 0.95) ? 1 : +deltaHeight;
		}
	})
}

// Функция вычисления номера активного блока
function toNumberOfImage (coord) {
	const percenteScroll = (coord / totalHeight) * 100;

	for (let i = 0; i<=totalNumberOfImage; i++) {
		if ( coord <= i * oneSliderSize && coord >= (i-1) *oneSliderSize) {
			numberOfImage = i;
		}
	}
}

// Функция формирующая блок при scroll вперед
function toForward (coord) {
	toNumberOfImage(coord);
	const delta = coord - (numberOfImage - 1) * oneSliderSize;
	let deltaHeight = (delta / oneSliderSize).toFixed(2);

	if (deltaHeight >= 0.98) {
		deltaHeight = 1;
	}
	counterScroll = coord;
	toResizeImage(numberOfImage, deltaHeight)
}

// Функция формирующая блок при scroll назад
function toBack (coord) {
	toNumberOfImage(coord);
	const delta = numberOfImage * oneSliderSize - coord;

	let deltaHeight = (1 - (delta / oneSliderSize)).toFixed(2);
	if (deltaHeight < 0.02) {
		deltaHeight = 0;
	}
	counterScroll = coord;
	toResizeImage(numberOfImage, deltaHeight);
}

// Обработчик scroll
window.addEventListener('scroll', () => {

	if (counterScroll > pageYOffset) {
		toBack(pageYOffset);
	} else if (counterScroll < pageYOffset) {
		toForward(pageYOffset);
	}
})
