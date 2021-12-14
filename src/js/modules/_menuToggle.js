const menuToggle = () => {
	const menuToggle = document.querySelector('.header__hamburger'),
	  menu = document.querySelector('.header__menu'),
	  buttons = menu.querySelectorAll('a');

	const toggleMenu = () => {
		menuToggle.addEventListener('click', (e) => {
			const target = e.target;
			target.classList.toggle('active');
			menu.classList.toggle('active');
		})

		
	}

	toggleMenu();

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			menu.classList.remove('active');
			menuToggle.classList.remove('active');
		})
	});
}

export default menuToggle;