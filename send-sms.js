
const accountSid = 'AC7af688eac1df2a7058c601cb6ad7fd8d';
const authToken = 'eb7c628c34dcc605af9f3935ed59e30f';

const client = require('twilio')(accountSid,authToken);

client.messages.create({
    to: '+16098654595',
    from: '+14152379739',
    body: 'swym confirmation'
})
.then((message) => console.log(message.sid));