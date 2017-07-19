const Agenda = require('agenda');
const mongoConnectionString = 'mongodb://127.0.0.1:27017/agenda';

var agenda = new Agenda({ db: { address: mongoConnectionString } });

require('./pv')(agenda);