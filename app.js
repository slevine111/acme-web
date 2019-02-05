const express = require('express')
const app = express()
const morgan = require('morgan')
const { getAllPagesInfo, getPageContent } = require('./db')
const {
  generateHTMLStructureStart,
  generateHTMLStructureEnd,
  generatePageSpecificHTML
} = require('./htmlFunctions')

app.use(morgan('dev'))

app.use('/static', express.static('assets'))

app.use((req, res, next) => {
  getAllPagesInfo()
    .then(pages => {
      req.pages = pages
      next()
    })
    .catch(next)
})

app.get('/', (req, res) => {
  res.redirect('/pages/1')
})

app.get('/pages', (req, res) => {
  res.redirect('/pages/1')
})

app.get('/pages/:id', (req, res, next) => {
  getPageContent(req.params.id)
    .then(pageContent => {
      res.send(`${generateHTMLStructureStart(Number(req.params.id), req.pages)}
                ${generatePageSpecificHTML(pageContent)}
                ${generateHTMLStructureEnd()}`)
    })
    .catch(err => {
      console.error(err)
      next(err)
    })
})

app.get('/test', (req, res) => {
  res.status(200).json({ name: 'john' })
})

module.exports = app
