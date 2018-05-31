module.exports = { homeHandler };

// Home handler stub.
function homeHandler() {
  return (req, res) => {
    res.write('Hello from home handler');    
  };  
}
