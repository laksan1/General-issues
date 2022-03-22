NOTIFICATION_WEB_EMAIL_PORT = 25
NOTIFICATION_WEB_EMAIL_HOST =
	NOTIFICATION_WEB_EMAIL_NAME =

// Отправить сообщение на внешний адрес 
const outlookBot = nodemailer.createTransport({
		pool: true,
		host: mail.in - delo.com,
		port: 587,
		secure: false,
		auth: {
			user: nika.motion@in -delo.com,
				pass: 111111,
    },
tls: {
	rejectUnauthorized: false,
    }
});

// Отправить сообщение на локальный адрес 
const outlookBot = nodemailer.createTransport({
	host: mail.in - delo.com,
	port: 25,
	secureConnection: false,
	tls: {
		ciphers: 'SSLv3'
	}
});

// 1. Ошибка, если  secure: true или при ciphers: 'SSLv3'
{
	library: 'SSL routines',
		function: 'ssl3_get_record',
		reason: 'wrong version number',
			code: 'ESOCKET',
				command: 'CONN'
}
