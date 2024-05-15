const server = require('./server');
const routes = require('./routes');
server.use('/api', routes);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});