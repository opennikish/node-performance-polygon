const { blockMainThreadHandler } = require('./block-main-thread');
const { leakHandler } = require('./memory-leak');
const { homeHandler } = require('./home');

module.exports = {
  blockMainThreadHandler,
  leakHandler,
  homeHandler
}
