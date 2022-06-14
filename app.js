const express = require('express');
const morgan = require('morgan');
const app = express();
const route = require('./routes/routes');
const { verifyOnfleet } = require('./config/config');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

verifyOnfleet();

app.use('/', route);

app.listen(PORT, async() => {
    console.log(`server started at post: ${PORT}`);
});


