const { sendTelegramMessage } = require('../utils/telegramBot');

async function sendContact(req, res) {
  try {
    const { name, email, message } = req.body;

    // Отправляем сообщение в Telegram
    await sendTelegramMessage(name, email, message);

    // Отправляем ответ клиенту
    // res.status(200).send('Сообщение успешно отправлено в Telegram');
    res.redirect('/');
  } catch (error) {
    console.error('Error processing contact request:', error);
    res.status(500).send('Произошла ошибка при отправке сообщения');
  }
}

module.exports = {
  sendContact,
};
