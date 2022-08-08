import { request, gql } from 'graphql-request';


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

//fetch data using graphql from graph cms
export const getPosts = async () => {
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
  return result.postsConnection.edges
}


export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails() {
    posts(
      orderBy: createdAt_ASC
      last:3){
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    
  }
  
  `
  const result = await request(graphqlAPI, query);
  return result.posts;
}

export const getSimilarPosts = async (categories,slug) => {
  // don't display the current article, but display the other articles that include some of the categories that we want to get
  // complicated graphql query
  //pass slug as argument, otherwise, it will be undefined
  const query = gql`
  query GetPostDetails($slug:String!,$categories:[String!]){
    posts(
      
      where: { slug_not:$slug, AND: {categories_some: { slug_in:$categories}}}
      last:3
    ){
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
  `
  const result = await request(graphqlAPI, query, { categories, slug});
  return result.posts;
}

export const getCategories = async () => {
  const query = gql`
   query GetCategories {
    categories {
      name
      slug
    }
   }
  `
  const result = await request(graphqlAPI, query);
  return result.categories;
}

//only get that specific article
export const getPostDetails = async (slug) => {
  const query = gql`
  query GetPostDetails($slug: String!) {
    post(where: { slug: $slug }){
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
      content {
        raw
      }
    }
  }
     
  `
  const result = await request(graphqlAPI, query, { slug })
  return result.post
}

//make a request to nextjs backend. GRAPH CMS allows user's own backend to interact with  their service to actually submit a comment. And then we can  see it ,approve or disapprove it in our graph cms dashboard
//之前没加ceontent type，400 "json body could not be decoded"
export const submitComment = async(obj) => {
const result = await fetch('/api/comments', {
  method:'POST',
  body: JSON.stringify(obj),
 
  headers: {
    'Content-type': 'application/json'
}
})
return result.json();
};


export const getComments = async (slug) => {
  const query = gql`
   query GetComments($slug: String!) {
    comments(where: { post: { slug:$slug}}) {
      name
      createdAt_At
      comment
    }
   }
  `
  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
}

