// pages/index.js
import { gql } from '@apollo/client';
import client from '../lib/apolloClient';

// GraphQL request
const GET_USERS = gql`
  query {
    users {
      edges {
        node {
          id
          email
          username
          addresses {
            edges {
              node {
                id
                city
                country
                housenumber
                street
                zipcode
              }
            }
          }
        }
      }
    }
  }
`;

const Home = ({ users }) => {
    return (
        <div>
            <h1>Attendees</h1>
            <ul>
                {/*{JSON.stringify(users)}*/}
                {users.map(({ node }, index) => (
                    <li key={index}>
                        <p>{node.username}</p>
                        {node.addresses.edges.map(({node})  => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <div>
                                    <p>{node.zipcode} {node.city}</p>
                                </div>
                            )
                        })}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Use getServerSideProps to get server data
export async function getServerSideProps() {
    
    const { data } = await client.query({
        query: GET_USERS,
    });
    
    return {
        props: {
            users: data.users.edges,
        },
    };
}

export default Home;
