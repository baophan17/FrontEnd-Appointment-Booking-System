import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

class LikeAndShare extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }
    async componentDidMount() {



    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }



    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })

    }
    render() {

        return (
            <div
                class="fb-like"
                data-href="https://developers.facebook.com/docs/plugins/"
                data-width=""
                data-layout=""
                data-action=""
                data-size=""
                data-share="true"
            ></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndShare);
