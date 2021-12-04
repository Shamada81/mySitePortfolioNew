// Блок констант:
// banner - эллемент обвертка для блоков анимации
// widthBlock, heightBlock - размеры каждого блока,
// blocksByX, blocksByY - кол-во блоков по горизонтали и вертикали

const banner = document.querySelector('.promo__bg');

const widthBlock = 5,
	  heightBlock = 5;

const blocksByX = Math.round(100 / widthBlock),
      blocksByY = Math.round(100 / heightBlock);

 
banner.closest('.bgGenerator').style.background = 'none';
// banner.closest('.wrapper__header').style.background = 'none';
// для Firefox
for (let i = 1; i <= blocksByY; i++) {
	for (let j = 1; j <= blocksByX; j++) {
		let block = document.createElement('div'),
			image = document.createElement('img');
		image.style.left = `-${(j - 1) * widthBlock}vw`;
		image.style.top = `-${(i - 1) * heightBlock}vw`;

		block.style.width = `${widthBlock}vw`
		block.style.height = `${heightBlock}vw`
		block.append(image);
		block.classList.add('blocks');
		block.style.animationDelay = `${(i + j) * 0.05}s`;

		banner.append(block);
	}
	
}