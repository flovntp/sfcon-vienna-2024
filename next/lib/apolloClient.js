import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

let backendURL = "https://localhost:8000/api/graphql"

if ('API_URL' in process.env) {
    console.log('On an Upsun Environment');
    backendURL = `${process.env.API_URL}/graphql`;
} else {
    console.log('Running locally.');
}

console.log(backendURL);

// API GraphQL
const client = new ApolloClient({
    link: new HttpLink({
        uri: backendURL,
    }),
    cache: new InMemoryCache(),
});

export default client;