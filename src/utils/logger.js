//see https://gist.github.com/robatron/5681424 

function logError () {
  // Consolidating logging here
  // eslint-disable-next-line no-console
  console.error.apply(console,arguments);
}

function logDebug ()  {

  if (process.env.NODE_ENV==="development"){
    
    const args = Array.prototype.slice.call(arguments);
    args.unshift("debug: ");

    // Consolidating logging here
    // eslint-disable-next-line no-console
    console.log.apply(console,args);

  }
}

module.exports = { 
  logError, 
  logDebug,
}