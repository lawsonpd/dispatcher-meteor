// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Deliveries } from '../../api/deliveries/deliveries.js';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // if (Deliveries.find().count() === 0) {
  //   const data = [
  //     {
  //       driver: 'peter',
  //       address: '1812 Lillian St.',
  //       date: new Date(),
  //       recipientName: 'Jake Vehl',
  //       recipientPhone: '615-222-3333',
  //       specialInstructions: 'Ring doorbell',
  //     },
  //     {
  //       driver: 'peter',
  //       address: '1405 Riverside dr.',
  //       date: new Date(),
  //       recipientName: 'AnneMarie Kelbon',
  //       recipientPhone: '615-222-4444',
  //       specialInstructions: 'Call when you arrive',
  //     },
  //   ];

  //   data.forEach(delivery => Deliveries.insert(delivery));
  // }

  const dispatcher_init = Accounts.findUserByUsername('dispatcher');
  if (!dispatcher_init) {
    Accounts.createUser({ username: 'dispatcher', password: 'jb2017' });
  }

  const twilio_api_auth = Accounts.findUserByUsername('twilio');
  if (!twilio_api_auth) {
    Accounts.createUser({ username: 'twilio', password: Meteor.settings(env.twilioIncomingPostAuth)});
  }
});
