const animationHeader = () => {

	document.addEventListener('scroll', () => {
		const header = document.querySelector('.header');
		header.classList.toggle('white', window.scrollY > 0);
	})
}


export default animationHeader;