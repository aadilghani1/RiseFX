import { ApolloClient, InMemoryCache, gql, useLazyQuery } from "@apollo/client";

import { useMemo } from "react";

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
});

const LIST_PEOPLE = gql`
  query AllPeople($cursor: String!) {
    allPeople(first: 10, after: $cursor) {
      totalCount
      edges {
        cursor
        node {
          __typename
          id
          name
          birthYear
          eyeColor
          hairColor
          homeworld {
            id
            name
          }
          filmConnection {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

const useGetData = (cursor: string) => {
  const [load, { data }] = useLazyQuery(LIST_PEOPLE, {
    client,
    variables: { cursor },
  });
  const result = useMemo(() => ({ data, load }), [data, load]);
  return result;
};

export default useGetData;
