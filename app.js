const express = require('express')
const app = express()
const morgan = require('morgan')
const { getAllPagesInfo, getPageInfo, getPageContent } = require('./db')
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

app.get('/pages/:id', (req, res) => {
  getPageInfo(req.params.id)
    .then(pageInfo => getPageContent(pageInfo.id))
    .then(pageContent =>
      res.send(`${generateHTMLStructureStart(Number(req.params.id), req.pages)}
                ${generatePageSpecificHTML(pageContent)}
                ${generateHTMLStructureEnd()}`)
    )
    .catch(err => {
      throw err
    })
})

module.exports = app
