import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SearchListItem.css";

class SearchListItem extends Component {

  render() {
    console.log("City List Item render");
    console.log(this.props);
    const { data } = this.props;

    return (
      <Link to={"/app01/main_page_new/details/" + data.id} className="link">
        <div
          className="city-list-item"
          onMouseOver={() => {
            console.log("mouseOver");
          }}
        >
          {data.stationname} {data.khaigrade + "㎍/㎥"}
        </div>
      </Link>
    );
  }
}

export default SearchListItem;
