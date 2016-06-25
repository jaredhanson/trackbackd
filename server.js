#!/usr/bin/env node

require('bixby-express').main(function(IoC) {
  IoC.use(require('nodex-social-linkback'));
});
