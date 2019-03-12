import React from "react";
import * as PropTypes from "prop-types";
import { LocationPageTemplate } from "../../templates/location-page";

const LocationPreview = ({ entry, widgetFor }) => (
    <LocationPageTemplate
        content={widgetFor("body")}
        description={entry.getIn(["data", "description"])}
        tags={entry.getIn(["data", "tags"])}
        title={entry.getIn(["data", "title"])}
    />
);

LocationPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
};

export default LocationPreview;
