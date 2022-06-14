require('dotenv').config();
const Onfleet = require('@onfleet/node-onfleet');
const onfleetApi = new Onfleet(process.env.ONFLEET_API_KEY);

const verifyOnfleet = async () => {
    const verify = await onfleetApi.verifyKey();
    console.log(`Onfleet API Key verfied: ${verify}`);
}

module.exports = {verifyOnfleet, onfleetApi}