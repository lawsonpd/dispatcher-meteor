import { Restivus } from 'meteor/nimble:restivus';
import { Deliveries } from '/imports/api/deliveries/deliveries.js';
var MessagingResponse = require('twilio').twiml.MessagingResponse;

var Api = new Restivus({
    // useDefaultAuth: true,
    prettyJson: true,
  });

Api.addCollection(Deliveries, {
  excludedEndpoints: ['get', 'put', 'getAll', 'delete', 'patch'],
});

Api.addRoute('v4Bs48ebSnmek244', {
  post: {
    action: function() {
      var twiml = new MessagingResponse;

      cxResponse = this.request.body.Body;
      console.log(cxResponse);

      if (cxResponse === 'Yes') {
        twiml.message("Great! We'll see you soon!");
        // remove '+' from front of phone number
        var phone = this.request.body.From.slice(2);

        console.log(phone);

        var date_today = new Date().toDateString();
        var delivery = Deliveries.update({ recipientPhone: phone, date: date_today }, {
          $set: {
            recipientAvailable: true,
            availabilityPending: false
          }
        });
      } else if (cxResponse === 'No') {
        twiml.message("Thanks for letting us know! We'll give you a call and try to find a better time!");
        
        // remove '+' from front of phone number
        var phone = this.request.body.From.slice(2);

        console.log(phone);

        var date_today = new Date().toDateString();
        var delivery = Deliveries.update({ recipientPhone: phone, date: date_today }, {
          $set: {
            recipientAvailable: false,
            availabilityPending: false
          }
        });
      } else {
        twiml.message("Please reply either 'Yes' or 'No', or give us a call at (615) 645-5916. Thanks!");
      }

      this.response.writeHead(200, {'Content-Type': 'text/xml'});
      this.response.end(twiml.toString());
      this.done();
    }
  }
});

