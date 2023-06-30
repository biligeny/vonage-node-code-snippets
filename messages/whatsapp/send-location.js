require('dotenv').config({ path: __dirname + '/../../.env' });

const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;
const VONAGE_APPLICATION_ID = process.env.VONAGE_APPLICATION_ID;
const VONAGE_PRIVATE_KEY = process.env.VONAGE_PRIVATE_KEY;

const TO_NUMBER = process.env.TO_NUMBER;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER;

const { Vonage } = require('@vonage/server-sdk');
const { WhatsAppCustom } = require('@vonage/messages');

const vonage = new Vonage({
  apiKey: VONAGE_API_KEY,
  apiSecret: VONAGE_API_SECRET,
  applicationId: VONAGE_APPLICATION_ID,
  privateKey: VONAGE_PRIVATE_KEY,
});

vonage.messages.send(
  new WhatsAppCustom({
    custom: {
      type: 'location',
      location: {
        longitude: -122.425332,
        latitude: 37.758056,
        name: 'Facebook HQ',
        address: '1 Hacker Way, Menlo Park, CA 94025',
      },
    },
    to: TO_NUMBER,
    from: WHATSAPP_NUMBER,
  }),
)
  .then(resp => console.log(resp.messageUUID))
  .catch(err => console.error(err));
