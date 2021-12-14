<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->isHTML(true);


	// От кого
	$mail->setFrom('v.levadny@rambler.ru', 'Mailer');
	// Кому отправить
	$mail->addAddress('v.levadnyy@internet.ru');
	// Тема
	$mail->Subject = 'Послание доброжелателя';

	// Тело письма
	$mail->Body = 'Это круто!';
	
	if(trim(!empty($_POST['name']))) {
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))) {
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}
	if(trim(!empty($_POST['message']))) {
		$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
	}

	$mail->Body = $body;

	// Отправляем
	if(!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>



