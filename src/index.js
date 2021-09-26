const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverrride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const credencial = require('passport');



//Inicializa
const app = express();
require('./basededatos');
require('./config/credencial');

//configuracion  crea marcos y repite diseño
app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares    CONEXIONES 
app.use(express.urlencoded({extended: false}));
app.use(methodOverrride('_method'));
app.use(session({
    secret: 'mysecreatapp',
    resave: true,
    saveUninitialized: true
}));
app.use(credencial.initialize());
app.use(credencial.session());
app.use(flash());


//global variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    //res.locals.nombre = req.nombre || null;
    let usuario = null
    if(req.user){
        usuario =JSON.parse(JSON.stringify(req.user))
    } 
    res.locals.usuario = usuario   
    next();
});
//rutas crear notas actualizar acceder a url login sing out etc
app.use(require('./routes/index'));
app.use(require('./routes/notas'));
app.use(require('./routes/usuarios'));

//estaticos ruta
app.use(express.static(path.join(__dirname, 'public')));


//server esta escuchando
app.listen(app.get('port'),()=>{
    console.log('Servidor conectado ', app.get('port'));
});

