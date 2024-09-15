require('./db.js')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var userRoutes = require('./routes/users')
var videoRoutes = require('./routes/video')
var feedbackRoutes = require('./routes/feedback.js')

const app = express();
app.use(bodyParser.json());
app.use('/', express.static('public'))
const allowedOrigins = 'http://localhost:3000'
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (origin=== allowedOrigins) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
  methods: "GET, PUT, DELETE, POST"
}

app.use(cors(corsOptions));
app.listen(3500, () => console.log(`App is running`))

app.use('/user',userRoutes)
app.use('/video',videoRoutes)
app.use('/feedback',feedbackRoutes)