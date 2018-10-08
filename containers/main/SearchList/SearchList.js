import React, { Component } from "react";
import SearchListItem from "../../../components/main/SearchListItem";
import "./SearchList.css";
import * as inputActions from "../../../store/modules/input";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class SearchList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }

  render() {
    console.log("SearchList render");
    const { data } = this.props;
    const list = data.map(item => {
      return (
        <SearchListItem
          cityName={item.stationname}
          key={item.id}
          stationid={item.stationid}
          khaigrade={item.khaigrade}
          data={item}
          history={this.props.hostory}
        />
      );
    });

    let isHidden = true;
    if (this.props.term.length >= 1 && this.props.data.length > 0) {
      isHidden = false;
    } else {
      isHidden = true;
    }

    return (
      <div className="body">
        <center>
          <div className={`searched ${isHidden ? "hidden" : ""}`}>{list}</div>
        </center>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  InputActions: bindActionCreators(inputActions, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(SearchList);
