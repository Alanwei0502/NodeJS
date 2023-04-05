const users = ['Alan', 'Tina', 'David'];

const requestHandler = (req, res) => {
  const {url , method} = req;
  res.setHeader('Content-Type', 'text/html');

  if(url === '/' && method === 'GET') {
    res.write(`
      <html>
        <head><title>My Assignment 1</title></head>
        <body>
          <form action='/create-users' method='POST'>
            <input type='text' name='username'/>
            <button type='submit'>Send</button>
          </form>
        </body>
      </html>
    `);
    res.end();
    return;
  };

  if(url === '/users' && method === 'GET'){
    res.write(`
      <html>
        <head><title>My Assignment 1</title></head>
        <body>
          <ul>
            ${users.reduce((acc, user) => (
              acc += `<li>${user}</li>`
            ), '')}
          </ul>
        </body>
      </html>
    `);
    res.end();
    return;
  }

  if(url === '/create-users' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => body.push(chunk));
    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const newUser = parseBody.split('=')[1];
      users.push(newUser);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/users');
    res.end();
    return;
  }

  res.write(`
    <html>
      <head><title>My Assignment</title></head>
      <body>
        <h1>Page not found.</h1>
      </body>
    </html>
  `);
  res.end();
};

module.exports = {
  requestHandler
}