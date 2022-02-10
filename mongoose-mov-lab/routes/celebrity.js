const router = require('express').Router()
const Celebrity = require('../models/Celebrity')
const Movie = require('../models/Movie')

/* GET home page */
/* Start of Movies */
router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('movie/new', { celebrities: celebrities })
    })
    .catch((err) => next(err))
})
router.post('/movies', (req, res, next) => {
  const { title, genre, plot, cast } = req.body
  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
      res.render('movie/all', { newMovie: newMovie, cast })
    })
    .catch((err) => next(err))
})

/* end of Movies*/

router.get('/', (req, res, next) => {
  res.render('home', { title: 'The celebrity page' })
})
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDb) => {
      console.log(celebritiesFromDb)
      res.render('celebrity/index', { celebrities: celebritiesFromDb })
    })
    .catch((err) => next(err))
})
router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrity/new')
})

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities/')
    })
    .catch((err) => next(err))
})
router.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id
  Celebrity.findById(id)
    .then((celebrityFromDb) => {
      res.render('celebrity/show', { celebrityFromDb })
    })
    .catch((err) => next(err))
})
router.get('/celebrities/edit/:id', (req, res, next) => {
  const id = req.params.id
  Celebrity.findById(id)
    .then((celebrityFromDb) => {
      console.log(`this is the ${celebrityFromDb}`)
      res.render('celebrity/edit', { celebrityFromDb })
    })
    .catch((err) => next(err))
})

router.post('/celebrities/update/:id', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body
  const id = req.params.id
  Celebrity.findByIdAndUpdate(
    id,
    { name, occupation, catchPhrase },
    { new: true }
  )
    .then((updatedCeleb) => {
      console.log(editedCeleb)
      res.direct(`/celebrity/${updatedCeleb._id}`)
    })
    .catch((err) => next(err))
})
router.post('/celebrities/delete/:id', (req, res, next) => {
  const id = req.params.id
  Celebrity.findByIdAndDelete(id)
    .then((deleteCeleb) => {
      console.log(deleteCeleb)
      res.redirect(`/celebrity`)
    })
    .catch((err) => next(err))
})

module.exports = router
