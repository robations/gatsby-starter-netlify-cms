import { Link, graphql } from "gatsby";
import { kebabCase } from "lodash";
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const LocationsPage = ({
    data: { allMarkdownRemark: { edges }, site: { siteMetadata: { title } } },
}) => (
    <Layout>
        <section className="section">
            <Helmet title={`Locations | ${title}`}/>
            <div className="container content">
                <div className="columns">
                    <div
                        className="column is-10 is-offset-1"
                        style={{ marginBottom: "6rem" }}
                    >
                        <h1 className="title is-size-2 is-bold-light">Our Locations</h1>

                        <LoadScript
                            id="google-maps-loader"
                            googleMapsApiKey={"AIzaSyCru258_iZxIAiyjn2w-9P6bqX1h5z7dOo"}
                            language={"en"}
                            region={"EN"}
                            version={"weekly"}
                            loadingElement={"It's loading"}
                            libraries={[]}
                            preventGoogleFontsLoading={true}
                        >
                            <GoogleMap
                                id={"maps-example"}
                                // zoom={6}
                                // center={{lat: 56.8, lng: -1}}
                                mapContainerStyle={{height: 320}}
                                onLoad={map => {
                                    const bounds = new window.google.maps.LatLngBounds();
                                    map.fitBounds(bounds);
                                }}
                            >
                                {
                                    edges.filter(({node}) => node.frontmatter.geocodingCache)
                                        .map(({node}) => <Marker
                                            title={node.frontmatter.name}
                                            position={node.frontmatter.geocodingCache}
                                        />)
                                }
                            </GoogleMap>
                        </LoadScript>

                        <ul className="LocationList">
                            {
                                edges.map(({node}) => (
                                    <li className="Location" key={node.id}>
                                        <Link
                                            to={`/location/${kebabCase(node.fields.slug)}/`}>
                                            {node.frontmatter.name}, {node.frontmatter.postcode}
                                        </Link>
                                        {
                                            node.frontmatter.telephone && <p className="Location__telephone">
                                                Phone: <a href={"tel:" + node.frontmatter.telephone}>{node.frontmatter.telephone}</a>
                                            </p>
                                        }
                                        {
                                            node.frontmatter.email && <p className="Location__email">
                                                Email: <a href={"mailto:" + node.frontmatter.email}>{node.frontmatter.email}</a>
                                            </p>
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
);

export default LocationsPage;

export const locationsPageQuery = graphql`
    query LocationsQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(filter: {fields: {collection: {eq: "locations"}}}, limit: 1000) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        name
                        description
                        postcode
                        email
                        telephone
                        geocodingCache {
                            lat
                            lng
                        }
                    }
                }
            }
        }
    }
`;
