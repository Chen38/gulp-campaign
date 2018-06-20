export function add(...argus) {
  return argus.reduce((init, curr) => {
    return init += curr;
  }, 0);
}

export function get(argus) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(argus);
      }, 1000);
    } catch(ex) {
      reject(ex);
    }
  });
}
