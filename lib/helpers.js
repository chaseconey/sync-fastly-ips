/**
 * Find which ips are new that need to be added
 */
module.exports.toAdd = function(current, latest) {
  return latest.filter(x => !current.includes(x));
};

/**
 * Find which ips are new that need to be removed
 */
module.exports.toRemove = function(current, latest) {
  return current.filter(x => !latest.includes(x));
};
