import React, { Component } from "react";
import axios from "axios";
import DjangoCSRFToken from 'django-react-csrftoken'

class UserParkInput extends Component {

    state = {
        userInput: ''
    }

    onChange = (e) => {
        console.log(e.target.value);
        this.setState({userInput : e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        document.getElementById('map-not-add-user-park').hidden = true;

        let targetObj = document.getElementById('map-add-user-park-input-page');
        const userInput = this.state.userInput;
        let lat = targetObj.getAttribute('lat');
        let lng = targetObj.getAttribute('lng');
        targetObj.hidden = true;

        const csrf = e.target.csrfmiddlewaretoken.value;
        axios.post('/app01/usersended0987', 
        { 'userInput': userInput, 'lat':lat, 'lng':lng },
        { headers: {
            'X-CSRFToken':csrf
            }
        })
            .then((result) => {
                console.log(result);
            });
    }


    render() {
        const inputRegion = this.state.userInput;
        return (
            <form onSubmit={this.onSubmit}>
                <DjangoCSRFToken />
                <input
                    type="text"
                    name="inputRegion"
                    value={inputRegion}
                    onChange={this.onChange} />
                <button type="submit">제출</button>
            </form>
        );
    }
}

export default UserParkInput;
