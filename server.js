const app = require('./app')
const db = require('./db')

const PORT = 3000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))

db.sync()
