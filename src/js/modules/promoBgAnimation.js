const promoBgAnimation = () => {
	// Блок констант:
	// banner - эллемент обвертка для блоков анимации
	// widthBlock, heightBlock - размеры каждого блока,
	// blocksByX, blocksByY - кол-во блоков по горизонтали и вертикали

	const banner = document.querySelector('.promo__bg');

	
	const widthBlock = (window.innerWidth >= 576) ? 10: 20,
		  heightBlock = (window.innerWidth >= 576) ? 10: 20;

	const blocksByX = Math.round(100 / widthBlock),
		  blocksByY = Math.round(100 / heightBlock);

	// Предварительная очистка блока обвертки
	let blocks = banner.querySelectorAll('.blocks');
	blocks.forEach(item => {
		item.remove();
	})

	// Предварительная очистка фона обертки
	banner.closest('.bgGenerator').style.background = 'none';
	

	for (let i = 1; i <= blocksByY; i++) {
		for (let j = 1; j <= blocksByX; j++) {
			let block = document.createElement('div'),
				image = document.createElement('img');
			image.style.left = `-${(j - 1) * widthBlock}vw`;
			image.style.top = `-${(i - 1) * heightBlock}vh`;

			block.style.width = `${widthBlock}vw`
			block.style.height = `${heightBlock}vh`
			block.append(image);
			block.classList.add('blocks');
			block.style.animationDelay = `${(i + j) * 0.05}s`;

			banner.append(block);
		}
		
	}
}


export default promoBgAnimation;