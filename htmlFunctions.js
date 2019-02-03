const generateHTMLStructureStart = (currentPageId, pagesInfo) => {
  return `<html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
            <link rel = "stylesheet" href="/static/styles.css">
            <title>Acme: ${
              pagesInfo.find(page => {
                return page.id === currentPageId
              }).name
            }</title>
          </head>
          <body>
            <h1>Acme Web</h1>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">

                ${pagesInfo
                  .map(page => {
                    return `<li class ="nav-iten">
                            <a class = "nav-link ${
                              page.id === currentPageId ? 'chosen-link' : ''
                            }" href="/pages/${page.id}">${page.name}</a>
                          </li>`
                  })
                  .join('')}
                </ul>
              </div>
            </nav>
            `
}

const generateHTMLStructureEnd = () => {
  return `</body>
          </html>`
}

const generatePageSpecificHTML = pageContent => {
  return pageContent
    .map(element => {
      return `<h2>${element.name}</h2>
              <div>${element.body}</div>`
    })
    .join(' ')
}

module.exports = {
  generateHTMLStructureStart,
  generateHTMLStructureEnd,
  generatePageSpecificHTML
}
