var express = require('express');
var router = express.Router();

const { GraphdbHelper } = require('../bot/GraphdbHelper');
const dbHelper = new GraphdbHelper();
router.get('/:course', async function(req, res, next) {
  var queryResult = await dbHelper.responseBack(6,req.params.course);
  // console.log("hello "+queryResult.results.bindings);
   res.render('template', { data:queryResult.results.bindings});
});
module.exports = router;
