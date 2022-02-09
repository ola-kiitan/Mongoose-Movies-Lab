const mongoose = require('mongoose')
const Celebrity = require('./models/Celebrity')
const Movie = require('./models/Movie')

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

// const connectionString =
//   process.env.MONGO_URI || 'mongodb://localhost/mongoose-mov-lab'

mongoose
  .connect(
    'mongodb+srv://olayinka:SqhcQamOLXhWfPdL@cluster0.mlrmz.mongodb.net/mongoose-mov-lab?retryWrites=true&w=majority'
  )
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err)
  })

const celebrities = [
  {
    name: 'Wiz Lion Machala',
    occupation: 'Music Artist.',
    catchPhrase: 'More love less Ego',
  },
  {
    name: 'David Adeleke aka Davido',
    occupation: 'Music Artist.',
    catchPhrase: 'We rise by lifting others',
  },
  {
    name: 'Jim Iyke',
    occupation: 'Actor',
    catchPhrase: 'Industry bad boy',
  },
]

Celebrity.insertMany(celebrities)
  .then((celebrities) => {
    console.log(`Success - added ${celebrities.length} celebrities to the db`)
    mongoose.connection.close()
  })
  .catch((err) => console.log(err))
