const sendForm = () => {
	
	// //*****Вспомогательные функции*****// //

	// Примитивная проверка  заполнения обязательных полей
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



	// //*****Основная часть****// //

	// Элемент форма
	const body = document.body,
		  form = document.querySelector('#form'),
		  sendingWrapperBlock = document.querySelector('.form__sending'),
		  sendingMessageBlock = sendingWrapperBlock.querySelector('.form__sending-message'),
		  closeSendingBlock = sendingMessageBlock.querySelector('.form__sending-close');
	// Ответы при откравке формы
	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро я с вами свяжусь',
		failure: 'Что-то пошло не так...',
		spinner: '../../img/form/loading.gif',
		ok: '../../img/form/ok.png',
		fail: '../../img/form/fail.png'
	};
	// Отправка формы
	const postData = async (url, data) => {
		let res = await fetch(url, {
			method: 'POST',
			body: data,
		});
	
		return await res.text();
	};




	// Функция отправки формы
	const formSend = async (e) => {
		e.preventDefault();

		const timerOfClose = setTimeout(() => {
			form.reset();
			body.style.overflow = '';
			statusImg.remove();
			statusMessage.remove();
			sendingMessageBlock.textContent = '';
			sendingWrapperBlock.classList.remove('_sending')
	
		}, 3000);

		// Путь к php файлу
		const path = './sendmail.php';
		// const path = './sendmail.php';

		// Проверка валидности заполнения формы
		let error = formValidate(form);
		// Получаем данные формы
		let formData = new FormData(form);

		let statusMessage = document.createElement('div');
		statusMessage.classList.add('message')
		sendingMessageBlock.prepend(statusMessage);

		let statusImg = document.createElement('img');
		sendingMessageBlock.append(statusImg);

		if(error === 0) {
			body.style.overflow = 'hidden';
			sendingWrapperBlock.classList.add('_sending');
			statusMessage.textContent = message.loading;
			statusImg.setAttribute('src', message.spinner);


			
			postData(path, formData)
				.then(response => {
					statusMessage.textContent = message.success;
					statusImg.setAttribute('src', message.ok)
				})
				.catch(() => {
					statusMessage.textContent = message.failure;
					statusImg.setAttribute('src', message.fail);
				})
				.finally(() => {
					closeSendingBlock.addEventListener('click', (e) => {
						const target = e.target;

						console.log(`target: ${target}   ${target.tagname}`);

						if(target && target.closest('.form__sending-close')) {
							form.reset();
							body.style.overflow = '';
							statusImg.remove();
							statusMessage.remove();
							sendingMessageBlock.textContent = '';
							sendingWrapperBlock.classList.remove('_sending');
							clearTimeout(timerOfClose);
						}
					})
				})
		} else {
			alert('Заполните поля')
		}
	}

	form.addEventListener('submit', formSend);

}


export default sendForm;
