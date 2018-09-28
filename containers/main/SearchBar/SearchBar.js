import React, { Component } from "react";
import "./SearchBar.css";
import { connect } from "react-redux";
import * as inputActions from "../../../store/modules/input";
import { bindActionCreators } from "redux";

// import "components/main/SearchBar/SearchBar.css"

class SearchBar extends Component {
  
  state = {
    onFocus : 0
  }
  
  componentDidMount() {
    this.mainInput.focus();
  }

  handleKeyPress = e => {
    const { term, InputActions } = this.props;
    const { history, data } = this.props;

    const checked = data.indexOf(item => (
      item.stationname == term
    )) + 1
    
    if ( term.length >= 1 && data[0] && e.key === "Enter" ) {
      // 1) 아무거나로 이동할 때 오류처리 해야함
      // 2) 아무것도 입력안하고 엔터치면 맨위 리스트로 이동됨
      InputActions.change('')
      history.push(`/app01/main_page_new/details/${data[0].id}`);
    }

    if (e.keyCode === 38) {
      alert('38')

    } else if (e.keyCode === 40 ) {
      alert(40)

    }
  };

  // focus out 시 검색어 초기화
  // 아니 이게 인터벌 없이 하면 citylistitem을 클릭했을 때 link 보다 blur가 먼저 작동해...
  handleBlur = e => {
    const { term, InputActions } = this.props;
    setTimeout(() => {
      InputActions.change("");
    }, 200);
  };


  // 이걸로 리스트 내려가면서 포커스 주면서 hover 되면서 하게 흠..
  // 근데 이거로 focus out 되어버리면 blur도 적용되어 버림
  // handleArrowKey = (e) =>{
  //   const { onFocus } = this.state
  //   if (e.keyCode === 38) {
  //     alert('up')
  //   } else if (e.keyCode === 40 ) {
  //     alert('down')
  //   }
  // }


  render() {
    const { term, InputActions } = this.props;
    return (
      <form
        className="search-bar"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <input
          value={term}
          className="bar"
          placeholder="Search Your Seoul!"
          onChange={e => {
            InputActions.change(e.target.value);
          }}
          onKeyPress={this.handleKeyPress}
          // onKeyDown={this.handleArrowKey}
          onBlur={this.handleBlur}
          ref={input => {
            this.mainInput = input;
          }}
        />
      </form>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  InputActions: bindActionCreators(inputActions, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
