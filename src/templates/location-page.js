import React from "react";
import * as PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const LocationPageTemplate = ({
    content,
    contentComponent,
    name,
    postcode,
    telephone,
    email,
    helmet,
}) => {
    const PostContent = contentComponent || Content;

    return (
        <section className="section">
            {helmet || ""}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            {name}
                        </h1>
                        <p>{postcode}</p>
                        <p>{telephone}</p>
                        <p>{email}</p>
                        <PostContent content={content}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

LocationPageTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    helmet: PropTypes.object,
    name: PropTypes.string.isRequired,
    postcode: PropTypes.string,
    telephone: PropTypes.string,
    email: PropTypes.string,
};

const Location = ({ data }) => {
    const { markdownRemark: post } = data;

    return (
        <Layout>
            <LocationPageTemplate
                content={post.html}
                contentComponent={HTMLContent}
                helmet={<Helmet
                    titleTemplate="%s | Locations"
                >
                    <title>{`${post.frontmatter.name}`}</title>
                    <meta
                        name="description"
                        content={`${post.frontmatter.name} is a property location by Ogilvie Homes.`}
                    />
                </Helmet>}
                name={post.frontmatter.name}
                postcode={post.frontmatter.postcode}
                telephone={post.frontmatter.telephone}
                email={post.frontmatter.email}
            />
        </Layout>
    );
};

Location.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
};

export default Location;

export const pageQuery = graphql`
  query LocationByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        postcode
        telephone
        email
      }
    }
  }
`;
