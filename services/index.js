import { request, gql } from 'graphql-request';


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

//fetch data using graphql from graph cms
export const getPosts = async() => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              excerpt
              slug
              title
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `
    const result = await request(graphqlAPI, query)
    return  result.postsConnection.edges
}