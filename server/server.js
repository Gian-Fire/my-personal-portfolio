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
        firstName: 'Gian',
        lastName: 'Delprado',
      }
  }
  res.render('index', data);
});

app.get('/projects', (req, res) => {
  res.render('projects');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/thanks', (req, res) => {
  const contact = req.body;
  res.render('thanks', { contact: req.body })
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'gian.delprado94@gmail.com',
    from: contact.email,
    subject: `${contact.firstName} ${contact.lastName} from ${contact.company}: ${contact.subject}.`,
    text: contact.text
  };
  console.log(msg);
  sgMail.send(msg);
});

app.listen(8080, () => {
  console.log('listening at http://localhost:8080');
});