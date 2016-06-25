exports = module.exports = function(server) {
  var xml = require('xmlbuilder');
  
  
  function logIt(req, res, next) {
    console.log(req.headers);
    console.log(req.body)
    next();
  }
  
  function initialize(req, res, next) {
    req.locals = req.locals || {};
    next();
  }
  
  function resolveTarget(req, res, next) {
    req.locals.target = 'http://www.example.com/' + req.params[0];
    next();
  }
  
  function handle(req, res, next) {
    server.ping(req.body.url, req.locals.target, function(err) {
      // TODO: handle errors
      //res.status(202).send('http://alice.host/webmentions/222')
      
      var doc = xml.create('response', { encoding: 'utf-8' })
        .ele('error', '0')
        .end({ pretty: true});
      
      res.status(200).send(doc)
    });
  }
  
  // curl --data "title=Foo+Bar&url=http://www.bar.com/&excerpt=My+Excerpt&blog_name=Foo" http://127.0.0.1:8080/
  
  return [
    require('body-parser').urlencoded({ extended: false }),
    logIt,
    initialize,
    resolveTarget,
    handle
  ];
}

exports['@require'] = [
  'http://schemas.jaredhanson.me/js/social/linkback/Server'
];
