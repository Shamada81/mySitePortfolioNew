const sendForm = () => {
	
	// Примитивная роверка  заполнения обязательных полей
	const formValidate = (form) => {
		let error = 0;
		const formReq = form.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];

			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else {
				if (input.value == '') {
					formAddError(input);
				error++;
				}
			}
		}
		return error;
	}

	// Функция проверки корректности email
	const emailTest = (input) => {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
	// Функция для добавления класса error при ошибке
	const formAddError = (input) => {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	// Функция для удаления класса error при исправлении ошибки
	const formRemoveError = (input) => {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	// Элемент форма
	const form = document.querySelector('#form');

	const formSend = async (e) => {
		e.preventDefault();

		let error = formValidate(form);

		// Получаем данные формы
		let formData = new FormData(form);

		for (let [key, value] of formData) {
			console.log(`key: ${key}, value: ${value}`);
		}

		console.log(formData.getAll('message'));

		if(error === 0) {
			form.classList.add('_sending');
			let response = await fetch('./sendmail.php', {
			// let response = await fetch('../../sendmail.php', {
				method: 'POST',
				body: formData
			});
			if(response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert('Ошибка');
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните поля')
		}
	}

	form.addEventListener('submit', formSend);

}


export default sendForm;
