import { Express } from 'glittershark:meteor-express';
import { Deliveries } from '../deliveries.js';

var app = new Express();

app.post('/reply', (req, res) => {
  var twiml = new MessagingResponse;

  if (req.body.Body == 'Yes') {
    twiml.message("Great! We'll see you soon!");
    // io.emit("status", "available")
    // set delivery options
  } else if (req.body.Body == 'No') {
    twiml.message("Thanks for letting us know! We'll give you a call and try to find a better time!");
    // io.emit("status", "not available")
    // set delivery options
  } else {
    twiml.message("Please reply either 'Yes' or 'No', or give us a call at (615) 645-5916. Thanks!");
  }

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});