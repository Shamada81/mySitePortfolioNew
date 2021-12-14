const filterPortfolio = () => {
	// Блок констант:
	// - menu - обвертка для блока кнопок;
	// - menuItems - все кнопки;
	// - btnAll, btnHtml, btnJs, btnReact - кнопки;
	// - items - все блоки с фотографиями,
	// - itemAll, itemHtml, itemJs, itemReact - блоки по классам

	const menu = document.querySelector('.portfolio__menu'),
		menuItems = menu.querySelectorAll('li'),
		btnAll = menu.querySelector('.all'),
		btnHtml = menu.querySelector('.html'),
		btnJs = menu.querySelector('.js'),
		btnReact = menu.querySelector('.react'),
		items = document.querySelector('.portfolio__items'),
		itemAll = items.querySelectorAll('.all'),
		itemHtml = items.querySelectorAll('.html_css'),
		itemJs = items.querySelectorAll('.js'),
		itemReact = items.querySelectorAll('.react');

	// Константа, задающая значение свойства display для элементов
	const displayStatus = 'list-item';
	// Константа задающая паузу при анимации в миллисекундах
	const animationPause = 700;


	// Функция сортировки эллементов при клике
	const sortItems = (eventClass) => {
		// Массивы, в которые будут записаны элементы для скрытия (itemsHide)
		// и отображения (itemsAppear)
		let itemsAppear = [],
			itemsHide = [];

		itemAll.forEach(item => {
			if (item.classList.contains(eventClass)) {
				if (item.style.display != displayStatus) {
					itemsAppear.push(item);
				}
			} else {
				itemsHide.push(item);
			}

		})

		if (itemsHide.length > 0) {
			toHideItems(itemsHide);
			setTimeout(() => toAppearItems(itemsAppear), animationPause);
		} else {
			toAppearItems(itemsAppear);
		}
		
		
	}


	// Функция вызывающая всплытие элементов
	const toAppearItems = (arr) => {
		arr.forEach((item, index) => {
			item.style.display = displayStatus;
			item.querySelector('.info').style.display = 'none';
			item.classList.remove('hide-left', 'hide-right');
		
			if ((index + 1) % 2 == 0) {
				item.classList.add("appear-left")
			} else {
				item.classList.add("appear-right")
			}
		});
	}

	// Функция вызывающая скрытие элементов
	const toHideItems = (arr) => {
		arr.forEach((item, index) => {
			item.querySelector('.info').style.display = 'none';
			item.classList.remove('appear-left', 'appear-right')
		
			if ((index + 1) % 2 == 0) {
				item.classList.add("hide-left");
				setTimeout(() => {item.style.display = 'none'}, animationPause)
			} else {
				item.classList.add("hide-right")
				setTimeout(() => {item.style.display = 'none'}, animationPause)
			}
		});
	}




	const typeFilter = (event) => {
		const target = event.target,
			btnEvent = target.closest('li');

		if (!target || !(target.tagName == "DIV" || target.tagName == "LI")) {
			return;
		}

		// Меняем класс активности у кнопок при нажатии
		menuItems.forEach(item => {
			if (item != btnEvent) {
				item.classList.remove('active')
			} else {
				item.classList.add('active')
			}
		});

		// Вызов функции для сортировки эллементов при нажатии на кнопку
		switch (btnEvent) {
			case btnAll:
				sortItems('all');
				break;
			case btnHtml:
				sortItems('html_css');
				break;
			case btnJs:
				sortItems('js');
				break;
			case btnReact:
				sortItems('react');
				break;
			default:
				console.log("Что-то пошло не так");
				break;
		}



	};

	// первоначальная загрузка элементов
	toAppearItems(itemAll);

	// Обработчик событий для всех кнопок
	menu.addEventListener('click', e => typeFilter(e));
}


export default filterPortfolio;