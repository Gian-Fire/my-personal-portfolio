const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const profile = require('./profile');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use('/profile', profile);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = {
      person: {
        firstName: 'Tom',
        lastName: 'Scott',
      }
  }
  res.render('index', data);
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/thanks', (req, res) => {
  res.render('thanks', { contact: req.body })
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'gian.delprado94@gmail.com',
    from: 'test@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
});

app.listen(8080, () => {
  console.log('listening at http://localhost:8080');
});