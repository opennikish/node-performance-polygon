module.exports = { leakHandler };

// Increase memory leak.
function leakHandler(n) {
  const leak = [];

  return (req, res) => {    
    leak.push(new Array(n).join('bigass'));

    res.write('Hello from leak handler');  
  };
}
