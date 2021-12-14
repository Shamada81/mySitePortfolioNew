const animationSkills = () => {
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

	const section = document.querySelector(sectionClass),
		title = section.querySelector(titleClass),
		wrapperForItems = section.querySelector(wrapperClass),
		itemsArr = wrapperForItems.querySelectorAll(itemsClass);

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
			} else {
				item.dataset.trigger = 1;
				setTimeout(() => {
					item.style.display = '';
					item.classList.add('appear-right');
				}, animationDelayDin);
			}
		})
	}


	toAddClass(itemsArr);
}


export default animationSkills;
	