const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schema/index');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // for graphql gui
}));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
