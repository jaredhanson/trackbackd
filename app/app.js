exports = module.exports = function(IoC, service) {
  
  service.use(require('morgan')('combined'));
  
  service.post('/*', IoC.create('handlers/trackback'));
  
  return function run() {};
}

exports['@require'] = [ '!container', 'http/service' ];
