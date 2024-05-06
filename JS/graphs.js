import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import { ruruHTML } from 'ruru/server';
import fetch from 'node-fetch';

const schema = buildSchema(`
  type BikeRentalStation {
    name: String
    stationId: String
  }

  type Query {
    bikeRentalStations: [BikeRentalStation]
  }
`);


var root = {
  bikeRentalStations: async () => {
    try {
      const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/graphql',
          'digitransit-subscription-key': 'f78f313b1ec446049608163ec9868494', // replace with your actual key
        },
        body: JSON.stringify({
          query: `
            {
              bikeRentalStations {
                name
                stationId
              }
            }
          `,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data.data.bikeRentalStations;
    } catch (error) {
      console.error('There was a problem with the fetch operation: ', error);
    }
  },
};

var app = express();

// Create and use the GraphQL handler.
app.use('/graphql', createHandler({ schema: schema, rootValue: root, graphiql: true }));

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
