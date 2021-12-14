const checkToScroll = (sectionClass, titleClass, wrapperClass, itemsClass, func) => {

	const section = document.querySelector(sectionClass),
		  title = section.querySelector(titleClass),
		  wrapperForItems = section.querySelector(wrapperClass),
		  itemsArr = wrapperForItems.querySelectorAll(itemsClass);

	// функция, для расчета прокрутки и видимости элемента
	const toCheckedScroll = () => {
		// Данные по позиции окна
		// Текущая прокрутка
		const scrollTop = window.scrollY;
		// верхняя граница равна scroolTop
		const heightWindow = document.documentElement.clientHeight,
			bottomWindow = scrollTop + heightWindow;
		
		// Данные по блоку
		// Данные по элементу обвертки 
		const topWrapper = wrapperForItems.getBoundingClientRect().top,
			bottomWrapper = wrapperForItems.getBoundingClientRect().bottom;	

		// Проверка вхождение блока в отображаемую область видимости на экране
		if (!((topWrapper + scrollTop) < bottomWindow && (bottomWrapper + scrollTop) > scrollTop)) {
			return;
		};

		
		func();
		
		document.removeEventListener('scroll', toCheckedScroll);

	}


	// toCheckedScroll();

	document.addEventListener('scroll', toCheckedScroll);


}

export default checkToScroll;