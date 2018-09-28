/* global daum */

import React, { Component } from "react";
import "./DetailTemplate.css";
import DaumMap from "../../../containers/details/DaumMap";
import Info from "../../../components/details/info";
import ParkInfo from '../../../containers/details/ParkInfo';


class DetailTemplate extends Component {
  render() {
    const { data, match } = this.props;
    const selected = data.filter(item => {
      return item.id === Number(match.params.id);
    });

    return (
      <div>
        <div className="detail-template">
          <Info data={selected} />
          <div className="rigth-part">
            <DaumMap data={this.props.data} match={this.props.match} />
            <div className="park-info">
               <ParkInfo />
            </div>  
          </div>
        </div>
      </div>
    );
  }
}

export default DetailTemplate;
