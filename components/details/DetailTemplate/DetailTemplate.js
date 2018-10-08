/* global daum */

import React, { Component } from "react";
import "./DetailTemplate.css";
import DaumMap from "../../../containers/details/DaumMap";
import Info from "../../../components/details/info";

class DetailTemplate extends Component {
  render() {
    const { data, match } = this.props;
    const selected = data.filter(item => {
      // console.log(match);
      // console.log(item.stationid, match.params.stationid);
      return item.stationid === match.params.stationid;
    });

    return (
      <div>
        <div className="detail-template">
          <Info data={selected} />
          <div className="rigth-part">
            <DaumMap data={selected} />
          </div>
        </div>
      </div>
    );
  }
}

export default DetailTemplate;
