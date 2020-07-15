const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/red')
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
.then(ok => console.log('db conectada'))
.catch(err => console.log(err));