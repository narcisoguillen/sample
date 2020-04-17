const {app}  = require('./engines/server');
const views  = require('./controllers/views');
const apis   = require('./controllers/apis');

// Views
app.get('/', views.home);

// Apis
app.get('/me', apis.me);
