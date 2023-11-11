import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutStandingDoctor settings={settings} />
                <HandBook settings={settings} />
                {/* <iframe
                    width="350"
                    height="430"
                    allow="microphone;"
                    src="https://console.dialogflow.com/api-client/demo/embedded/9900ada6-78a1-4902-9849-69bc977ff4f4"
                ></iframe> */}
                <About />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
