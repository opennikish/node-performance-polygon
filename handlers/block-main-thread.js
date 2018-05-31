module.exports = { blockMainThreadHandler };

// Block main thread.
function blockMainThreadHandler(n) {
  const stub = x => x;

  return (req, res) => {    
    new Array(n).join('_').split('_').forEach(stub);
    res.write('Hello from blocking main thread handler');
  }
}
