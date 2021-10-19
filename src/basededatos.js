const mongoose = require('mongoose');

mongoose.connect('Liga mongo',{

    useUnifiedTopology: true 
})
    .then(db => console.log('DB :) conectado'))
    .catch(err => console.error(err));
