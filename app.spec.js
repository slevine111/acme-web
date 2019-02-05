const app = require('supertest')(require('./app'))
const { expect } = require('chai')

describe('my express app', () => {
  it('it has a GET /pages route', done => {
    app
      .get('/pages')
      .redirects(1)
      .expect(200, done)
  })

  it('it has a GET /pages/:id route for id values one to three', done => {
    app
      .get('/pages/1')
      .expect(200)
      .then(() => app.get('/pages/2').expect(200))
      .then(() => app.get('/pages/3').expect(200))
      .then(() => done())
      .catch(err => {
        if (err) return done(err)
      })
  })

  it('any GET /pages/:id route with :id > 3 returns a 404 status code', done => {
    app.get('/pages/4').expect(404, done)
  })

  it("'Acme Web' title is on the top of every page", done => {
    app
      .get('/pages/1')
      .then(res => expect(res.text).to.contain('<h1>Acme Web</h1>'))
      .then(() => app.get('/pages/2'))
      .then(res => expect(res.text).to.contain('<h1>Acme Web</h1>'))
      .then(() => app.get('/pages/3'))
      .then(res => expect(res.text).to.contain('<h1>Acme Web</h1>'))
      .then(() => done())
      .catch(err => {
        if (err) return done(err)
      })
  })

  it("a nav bar with the headers 'Hone', 'Employees', and 'Contact' is on the top of every page ", done => {
    app
      .get('/pages/1')
      .then(res =>
        expect(res.text.split('\n').join()).to.match(
          /<nav.*Home.*Employees.*Contact.*<\/nav>/
        )
      )
      .then(() => app.get('/pages/2'))
      .then(res =>
        expect(res.text.split('\n').join()).to.match(
          /<nav.*Home.*Employees.*Contact.*<\/nav>/
        )
      )
      .then(() => app.get('/pages/3'))
      .then(res =>
        expect(res.text.split('\n').join()).to.match(
          /<nav.*Home.*Employees.*Contact.*<\/nav>/
        )
      )
      .then(() => done())
      .catch(err => {
        if (err) return done(err)
      })
  })
})

describe('GET / and GET /pages routes', () => {
  const checkRedirectsToRightPath = res => res.req.path === '/pages/1'

  it('GET / route redirects you to GET /pages/1 route', done => {
    app
      .get('/')
      .redirects(1)
      .expect(200)
      .expect(checkRedirectsToRightPath)
      .end(err => {
        if (err) return done(err)
        return done()
      })
  })
  it('GET /pages route also redirects you to GET /pages/1 route', done => {
    app
      .get('/pages')
      .redirects(1)
      .expect(200)
      .expect(checkRedirectsToRightPath)
      .end(err => {
        if (err) return done(err)
        return done()
      })
  })
})

describe('GET /pages/1 route', () => {
  it("it has a header of 'Welcome to the Home Page", done => {
    app
      .get('/pages/1')
      .expect(200)
      .then(res => {
        expect(res.text).to.contain('<h2>Welcome to the Home Page</h2>')
        done()
      })
      .catch(err => done(err))
  })
})

describe('GET /pages/2 route', () => {
  it('it contains information about Moe, Larry, and Cury', done => {
    app
      .get('/pages/2')
      .expect(200)
      .then(res => {
        expect(res.text).to.contain('<h2>Moe</h2>')
        expect(res.text).to.contain('<h2>Larry</h2>')
        expect(res.text).to.contain('<h2>Curly</h2>')
        done()
      })
      .catch(err => done(err))
  })
})

describe('GET /pages/3 route', () => {
  it('it contains phone and fax information', done => {
    app
      .get('/pages/3')
      .expect(200)
      .then(res => {
        expect(res.text).to.contain('<h2>Phone</h2>')
        expect(res.text).to.contain('<h2>Fax</h2>')
        done()
      })
      .catch(err => done(err))
  })
})
