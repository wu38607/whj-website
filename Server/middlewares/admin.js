function isRoot(req, res, next) {
  if (req.signedCookies.authority === 'root') {
    next();
  } else {
    res.redirect('/nopage');
  }
}

function check(req, res) {
  return req.signedCookies.authority === 'root';
}

module.exports = {
  isRoot: isRoot,
  check: check
}