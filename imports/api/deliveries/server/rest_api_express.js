// import { Express } from 'meteor/glittershark:meteor-express';
// import { Deliveries } from '../deliveries.js';

// var app = Express();

// app.post('/reply', (req, res) => {
//   var twiml = new MessagingResponse;

//   if (req.body.Body === 'Yes') {
//     twiml.message("Great! We'll see you soon!");

//     // remove '+' from front of phone number
//     var phone = req.body.From.slice(1);

//     var t = new Date();
//     var delivery = Deliveries.update({ recipientPhone: phone, date: t.toDateString() }, {
//       $set: {
//         recipientAvailable: true,
//         availabilityPending: false
//       }
//     });
//   } else if (req.body.Body === 'No') {
//     twiml.message("Thanks for letting us know! We'll give you a call and try to find a better time!");
    
//     // remove '+' from front of phone number
//     var phone = req.body.From.slice(1);

//     var t = new Date();
//     var delivery = Deliveries.update({ recipientPhone: phone, date: t.toDateString() }, {
//       $set: {
//         recipientAvailable: false,
//         availabilityPending: false
//       }
//     });
//   } else {
//     twiml.message("Please reply either 'Yes' or 'No', or give us a call at (615) 645-5916. Thanks!");
//   }

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });