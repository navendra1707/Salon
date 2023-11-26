const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

function toSendMessage(toPhoneNumber, message){ 
  console.log(toPhoneNumber, message);
  client.messages.create({
     body: message,
     from: fromPhoneNumber,
     to: toPhoneNumber
   })
  .then(message => console.log(message.sid));
}

module.exports = toSendMessage;