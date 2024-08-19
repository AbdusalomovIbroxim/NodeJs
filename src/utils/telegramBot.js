const TelegramBot = require('node-telegram-bot-api');

TOKEN = process.env.TOKEN

const bot = new TelegramBot( TOKEN, { polling: true });

function sendTelegramMessage(name, email, message) {
  const chatId = process.env.CHAT_ID;
  const formattedMessage = `
  Новый контакт!

  Имя: ${name}
  Email: ${email}
  Сообщение: ${message}
  `;

  bot.sendMessage(chatId, formattedMessage)
    .then(() => console.log('Message sent to Telegram'))
    .catch(error => console.error('Error sending message:', error));
}

module.exports = { sendTelegramMessage };
