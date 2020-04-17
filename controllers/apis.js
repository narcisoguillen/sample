module.exports.me = function(req, res){
  return res.json({
    id    : 1,
    name  : 'foo',
    email : 'foo@bar.com'
  });
};
