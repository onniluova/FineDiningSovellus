import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import { ruruHTML } from 'ruru/server';
import fetch from 'node-fetch';


var root = {
  bikeRentalStations: async () => {
    const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'digitransit-subscription-key': 'f78f313b1ec446049608163ec9868494',
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

    const data = await response.json();

    return data.data.bikeRentalStations;
  },
};

var app = express();

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Start the server at port
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
