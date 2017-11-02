import { Restivus } from 'meteor/nimble:restivus';

var Api = new Restivus({
  // useDefaultAuth: true,
  prettyJson: true
});

Api.addCollection(Deliveries, {
  excludedEndpoints: ['get', 'put', 'getAll', 'delete', 'patch'],
  routeOptions: {
    authRequired: true
  }
});

Api.addRoute('reply', {authRequired: true}, {
  post: function() {
    var twiml = new MessagingResponse;

    cxResponse = this.request.body.Body;

    if (cxResponse === 'Yes') {
      twiml.message("Great! We'll see you soon!");
      // remove '+' from front of phone number
      var phone = req.body.From.slice(1);

      var t = new Date();
      var delivery = Deliveries.update({ recipientPhone: phone, date: t.toDateString() }, {
        $set: {
          recipientAvailable: true,
          availabilityPending: false
        }
      });
    } else if (req.body.Body === 'No') {
      twiml.message("Thanks for letting us know! We'll give you a call and try to find a better time!");
      
      // remove '+' from front of phone number
      var phone = req.body.From.slice(1);

      var t = new Date();
      var delivery = Deliveries.update({ recipientPhone: phone, date: t.toDateString() }, {
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
});
