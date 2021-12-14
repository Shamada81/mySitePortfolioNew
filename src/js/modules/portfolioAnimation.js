const portfolioAnimation = () => {
	// Блок констант:
	// wrapper - родительский элемент, на который вешается обработчики для списка
	// directions, prefixDirection - составные имени класса для анимирования
	// classNames - список всех имен классов для очистки 
	const wrapper = document.querySelector(".portfolio__items"),
		directions = ["top", "right", "bottom", "left"],
		prefixDirection = ["in", "out"],
		classNames = prefixDirection
			.map(pr => directions.map(dir => `${pr}-${dir}`)).flat();
			
	// Функция, определяющая направление события в элементе
	const getDirectionMove = (target, event) => {
		const { width, height, top, left } = target.getBoundingClientRect();

		const leftPosition = event.pageX - (left + window.scrollX),
			topPosition = event.pageY - (top + window.scrollY),
			x = leftPosition - (width / 2) * (width > height ? height / width : 1),
			y = topPosition - (height / 2) * (height > width ? width / height : 1);

		return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
	}


	// Функция обновляющая состояние элемента события
	const updateState = (event, prefix) => {
		const target = event.target;
		// console.log(target);

		if (target && target.tagName === 'IMG') {
			const  className = `${prefix}-${directions[getDirectionMove(target, event)]}`;
			const parentItem = target.closest(".portfolio__item")
			
			parentItem.classList.remove(...classNames);
			parentItem.classList.add(className);

			// parentItem.querySelector('.info').style.display = 'block';
			parentItem.querySelector('.info').style.display = 'flex';
			
			
			// Задаем перспективу для элемента
			const { width, height } = target.getBoundingClientRect();
			const elementIndex = classNames.findIndex(elem => elem == className);
			if (elementIndex % 2 !== 0) {
				target.closest(".portfolio__item").style.perspective = `${width * 2}px`;
			} else {
				target.closest(".portfolio__item").style.perspective = `${height * 2}px`;
			}
		}
	}

	wrapper.addEventListener("mouseover", e => {
		// console.log("nen")
		updateState(e, 'in');
	});
	wrapper.addEventListener("mouseout", e => {
		// console.log("yay")
		updateState(e, 'out')
	});
}


export default portfolioAnimation;