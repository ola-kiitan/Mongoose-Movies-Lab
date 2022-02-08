const router = require('express').Router()

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('celebrity')
})

module.exports = router
