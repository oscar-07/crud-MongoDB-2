const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://4rub1k:Eljuegodelcalamar@principal.s1h7n.mongodb.net/Notasytitulos?retryWrites=true&w=majority',{

    useUnifiedTopology: true 
})
    .then(db => console.log('DB :) conectado'))
    .catch(err => console.error(err));