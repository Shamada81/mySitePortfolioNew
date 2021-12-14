import promoTextAnimation from './modules/promoTextAnimation';
import promoBgAnimation from './modules/promoBgAnimation';
import filterPortfolio from './modules/filterPortfolio';
import checkToScroll from './modules/checkToScroll';
import animationSkills from './modules/animationSkills';
import portfolioAnimation from './modules/portfolioAnimation';
import animationHeader from './modules/animationHeader';
import sendForm from './modules/sendForm';
import checkToResize from './modules/_resize';
import menuToggle from './modules/_menuToggle';

window.addEventListener('DOMContentLoaded', () => {
	// Обработчик Header menu
	menuToggle();
	// Анимирование блока header
	animationHeader();

	// Анимации промо-блока
	promoTextAnimation();
	promoBgAnimation();
	checkToResize(promoBgAnimation);

	// Анимирование всплытия элементов
	checkToScroll('.skills', '.skills__title', '.skills__items', '.skills__items_item', animationSkills);
	checkToScroll('.portfolio', '.portfolio__title', '.portfolio__items', '.portfolio__item', filterPortfolio);

	// Анимирование наведения в блоке портфолио
	portfolioAnimation();

	// Отправка формы
	sendForm();

})