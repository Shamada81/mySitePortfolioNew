// Блок констант

// Класс тега section
const sectionClass = '.skills';
// Класс title 
const titleClass = '.skills__title';
// Класс обвертки элементов
const wrapperClass = '.skills__items';
// Класс скрываемых и отображаемых элементов
const itemsClass = '.skills__items_item';

// Задержка анимации в миллисекундах
const animationDelay = 50;

// const skills = document.querySelector(sectionClass),
// 	  skillsTitle = skills.querySelector(titleClass),
// 	  skillsItems = skills.querySelector(wrapperClass),
// 	  skillsItem = skillsItems.querySelectorAll(itemsClass);

const section = document.querySelector(sectionClass),
	  title = section.querySelector(titleClass),
	  wrapperForItems = section.querySelector(wrapperClass),
	  itemsArr = wrapperForItems.querySelectorAll(itemsClass);

// // Тригер, для единоразового отображения анимации
// let trigger = 0;

// Первоначальное скрытие элементов
itemsArr.forEach( item => {
	item.style.display = 'none';
})

// Функция проверки тригера состояния отображения элемента,
// необходим для единоразового анимирования
const triggerCheck = (item) => {
	const trigger = item.dataset.trigger;
	if (trigger) {
		return false;
	}
}
let animationDelayDin = animationDelay;
// Функция, добавляющая класс анимации
const toAddClass = (items) => {
	items.forEach((item, i) => {
		if (triggerCheck(item)) {
			return;
		}
		animationDelayDin += animationDelay;
		if (i % 2 != 0) {
			item.dataset.trigger = 1;
			setTimeout(() => {
				item.style.display = '';
				item.classList.add('appear-left');	
			}, animationDelayDin)
			// }, animationDelay)
		} else {
			item.dataset.trigger = 1;
			setTimeout(() => {
				item.style.display = '';
				item.classList.add('appear-right');
			}, animationDelayDin);
			// }, animationDelay);
		}
	})
}


// функция, для расчета прокрутки и видимости элемента
const toCheckedScroll = () => {
	// Данные по позиции окна
	// Текущая прокрутка
	const scrollTop = window.scrollY;
	// верхняя граница равна scroolTop
	const heightWindow = document.documentElement.clientHeight,
		  bottomWindow = scrollTop + heightWindow;
	
	// Данные по блоку
	// Данные материнского блока section
	const heightBlock = section.getBoundingClientRect().height,
		  topBlock = section.getBoundingClientRect().top,
		  bottomBlock = section.getBoundingClientRect().bottom;
	// Данные по элементу title
	const heightTitle = title.getBoundingClientRect().height,
		  topTitle = title.getBoundingClientRect().top;
	// Данные по элементу обвертки 
	const heightWrapper = wrapperForItems.getBoundingClientRect().height,
		  topWrapper = wrapperForItems.getBoundingClientRect().top,
		  bottomWrapper = wrapperForItems.getBoundingClientRect().bottom;
	// Количество частей на которые должен делиться блок (строки с элементами)
	const numberOfRow = 3;
	const heightOneRows = Math.floor(heightWrapper / numberOfRow);

	// Массив для элементов, которые должны быть отображены
	let arrItemsForView = [];
	

	// Проверка вхождение блока в отображаемую область видимости на экране
	if (!((topWrapper + scrollTop) < bottomWindow && (bottomWrapper + scrollTop) > scrollTop)) {
		return;
	};

	toAddClass(itemsArr);

	// for (let j = 1; j <= numberOfRow; j++) {
	// 	if (!((topWrapper + scrollTop) < bottomWindow && (bottomWrapper + scrollTop) > scrollTop)) {
	// 		continue;
	// 	};
	// 	if ((bottomWrapper - (heightOneRows * (numberOfRow - j)) > heightWindow) && (bottomWrapper - (heightOneRows * (numberOfRow - (j + 1)) < heightWindow))) {
	// 		for (let i = Math.floor(itemsArr.length * (j - 1) / numberOfRow); i < Math.floor(itemsArr.length * j / numberOfRow); i++) {
	// 			console.log(`j= ${j}  i= ${i}  ${(bottomWrapper - (heightOneRows * (numberOfRow - j)) > heightWindow)}`)
	// 			if(triggerCheck(itemsArr[i])) {
	// 				continue;
	// 			}
	// 			arrItemsForView.push(itemsArr[i]);
	// 		}
	// 	} else if ((bottomWrapper - (heightOneRows * (numberOfRow - j)) > 0)) {
	// 		for (let i = Math.floor(itemsArr.length * (j - 1) / numberOfRow); i < Math.floor(itemsArr.length * j / numberOfRow); i++) {
	// 			if(triggerCheck(itemsArr[i])) {
	// 				continue;
	// 			}
	// 			arrItemsForView.push(itemsArr[i]);
	// 		}
	// 	}
	// }


	// if (topWrapper > 0 && bottomWrapper < heightWindow) {
	// 	for (let i = 0; i < itemsArr.length; i++) {
	// 		if(triggerCheck(itemsArr[i])) {
	// 			continue;
	// 		}
	// 		arrItemsForView.push(itemsArr[i]);
	// 	}
	// } else if ((bottomWrapper - (heightOneRows * (numberOfRow - 1)) > heightWindow) ) {
	// 	for (let i = 0; i < Math.floor(itemsArr.length / numberOfRow); i++) {
	// 		if(triggerCheck(itemsArr[i])) {
	// 			continue;
	// 		}
	// 		arrItemsForView.push(itemsArr[i]);
	// 	}
	// } 
	// else if ((bottomWrapper - (heightOneRows * (numberOfRow - 2)) > heightWindow)) {
	// 	for (let i = Math.floor(itemsArr.length / numberOfRow); i < Math.floor(itemsArr.length * 2 / numberOfRow); i++) {
	// 		if(triggerCheck(itemsArr[i])) {
	// 			continue;
	// 		}
	// 		arrItemsForView.push(itemsArr[i]);
	// 	}
	// }
	// else if ((bottomWrapper - (heightOneRows * (numberOfRow - 3)) > heightWindow)) {
	// 	for (let i = Math.floor(itemsArr.length * 2 / numberOfRow); i < itemsArr.length; i++) {
	// 		if(triggerCheck(itemsArr[i])) {
	// 			continue;
	// 		}
	// 		arrItemsForView.push(itemsArr[i]);
	// 	}
	// } else if ((bottomWrapper - (heightOneRows * (numberOfRow - 1)) > 0) ) {
	// 	for (let i = 0; i < Math.floor(itemsArr.length / numberOfRow); i++) {
	// 		if(triggerCheck(itemsArr[i])) {
	// 			continue;
	// 		}
	// 		arrItemsForView.push(itemsArr[i]);
	// 	}
	// } 
	// else if ((bottomWrapper - (heightOneRows * (numberOfRow - 2)) > 0)) {
	// 	for (let i = Math.floor(itemsArr.length / numberOfRow); i < Math.floor(itemsArr.length * 2 / numberOfRow); i++) {
	// 		if(triggerCheck(itemsArr[i])) {
	// 			continue;
	// 		}
	// 		arrItemsForView.push(itemsArr[i]);
	// 	}
	// }
	// else if ((bottomWrapper - (heightOneRows * (numberOfRow - 3)) > 0)) {
	// 	for (let i = Math.floor(itemsArr.length * 2 / numberOfRow); i < itemsArr.length; i++) {
	// 		if(triggerCheck(itemsArr[i])) {
	// 			continue;
	// 		}
	// 		arrItemsForView.push(itemsArr[i]);
	// 	}
	// }
	// toAddClass(arrItemsForView);
	// arrItemsForView = [];

}


toCheckedScroll();

document.addEventListener('scroll', () => toCheckedScroll());
	