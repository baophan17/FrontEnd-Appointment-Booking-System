import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
                <p>
                    &copy; 2023 Phan Quốc Bảo & Nguyễn Văn Đạt. More information
                    <a target="blank" href='https://github.com/baophan17'>&#8594; Click here &#8592;</a>
                </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
