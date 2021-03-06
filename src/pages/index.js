import React, { useState } from 'react';
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const [search , setSearch] = useState('')
  const SearchTitle = (event) => {
    setSearch(event.target.value);
  }
  
  const [searchdescription , setSearchdescription] = useState('')
  const Searchdescription = (event) => {
    setSearchdescription(event.target.value);
  }


  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          There is no Post !!!
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
       
       <div className="search">
          <input 
           type="search" 
           placeholder="Title Search" 
           onChange={SearchTitle} 
           value={search}
           />

          <input 
           type="search" 
           placeholder="Description Search" 
           onChange={Searchdescription} 
           value={searchdescription}
           />  
        </div>       
      
      <br></br>      
      <br></br>      

      <Seo title="All posts" />
      <Bio />

      <ol style={{ listStyle: `none` }}>
        {posts
        .filter(post => post.frontmatter.description.toUpperCase().includes(searchdescription.toUpperCase()))    
        .filter(post => post.frontmatter.title.toUpperCase().includes(search.toUpperCase()))            
        .map(post => {

          const title = post.frontmatter.title || post.fields.slug
          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                 
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
                <p>Reference : <a href={post.frontmatter.Reference}>{post.frontmatter.Reference}</a></p>
                
              </article>
              <hr />
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }   
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          Reference
        }
      }
    }
  }
`
