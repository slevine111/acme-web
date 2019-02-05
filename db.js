const { Client } = require('pg')
const client = new Client('postgres://localhost/acmeweb')
client.connect()

const SEED = `DROP TABLE IF EXISTS content;
   DROP TABLE IF EXISTS pages;

   CREATE TABLE pages(
    id serial primary key,
    name text,
    is_home_page bool
   );

   CREATE TABLE content(
    id serial primary key,
    name text,
    body text,
    page_id int references pages(id)
   );

   INSERT INTO pages(name,is_home_page) VALUES
    ('Home', true),
    ('Employees',false),
    ('Contact',false);

   INSERT INTO content(name,body,page_id) VALUES
    ('Welcome to the Home Page','So looking forward to having you browser our site',1),
    ('Moe','Moe is our CEO!!!',2),
    ('Larry','Larry is our CTO!!!',2),
    ('Curly','Curly is the COO!!!',2),
    ('Phone','call us 212-555-1212',3),
    ('Fax','fax us 212-555-1212',3);`

const sync = () => {
  client
    .query(SEED)
    .then(() => {})
    .catch(err => {
      throw err
    })
}

const getAllPagesInfo = () => {
  return client
    .query(
      `SELECT id, name, is_home_page
       FROM pages`
    )
    .then(res => res.rows)
}

const getPageContent = pageId => {
  return client
    .query(
      `SELECT id, name, body
       FROM content
       WHERE page_id = $1`,
      [pageId]
    )
    .then(res => res.rows)
}

module.exports = { sync, getAllPagesInfo, getPageContent }
