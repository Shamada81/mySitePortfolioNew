// Раздел констант
// words - псевдомассив с текстовыми элементами для анимации,
// word - массив, в котором будут храниться буквы элемента, обвернутые в span,
// timeoutLetters - пауза между буквамии в строке,
// timeoutRows - пауза между строками
const words = document.querySelectorAll('.promo__title-animate'),
	  timeoutLetters = 50,
	  timeoutRows = 50,
	  word = [];

let counter = 0;

// Функция анимирования
function animateLetter (letter, i) {
	
	setTimeout(() => {
		letter.classList.remove('behind');
		letter.classList.add('in');
	}, 1500 + (i * timeoutLetters + counter));
}

// Функция для печати справа-налево
const wordToLeft = (word, letters) => {
	for (let i = (letters.length - 1); i >= 0; i--) {

		const span = document.createElement('span');

		span.classList.add('promo__title-word');
		if (letters[i] == ' ') {
			span.textContent = '\u00A0';
		} else {
			span.textContent = letters[i];
		}
		span.style.gridColumnStart = `-${i + 1}`;
		span.style.gridColumnEnd = `-${i + 2}`;

		span.style.gridRowStart = '1';
		span.style.gridRowStart = '2';
		span.classList.add('letter', 'behind');
		animateLetter (span, i);
		word.prepend(span);
	}
}

// Функция для печати слева-направо
const wordToRight = (word, letters) => {
	for (let i = 0; i < letters.length; i++) {

		const span = document.createElement('span');

		span.classList.add('promo__title-word');
		if (letters[i] == ' ') {
			span.textContent = '\u00A0';
		} else {
			span.textContent = letters[i];
		}
		span.style.gridColumnStart = `${i + 1}`;
		span.style.gridColumnEnd = `${i + 2}`;

		span.style.gridRowStart = '1';
		span.style.gridRowStart = '2';
		span.classList.add('letter', 'behind');
		animateLetter (span, i);
		word.append(span);
	}
}

// Функция, разбивающая строку и создающая grid-сетку для нее
const splitWords = (word) => {
	let content = word.innerHTML,
	    letters = content.split('');

	word.innerHTML = '';

	// word.style.gridTemplateColumns = '1fr';
	// word.style.gridTemplateColumns = 'auto';
	word.style.gridTemplateColumns = '';

	for (let i = 0; i < letters.length; i++) {
		word.style.gridTemplateColumns += ` 1fr`;
	}
	
	return letters;
}


// Вызывающая функция
words.forEach((word, i) => {
	
	let letters = splitWords(word);

	if ((i) % 2 == 0) {
		letters = letters.reverse();
		wordToLeft(word, letters);
	} else {
		wordToRight(word, letters);
	}
	counter += word.textContent.length * timeoutRows;
});
