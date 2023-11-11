import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllHandbook } from '../../../services/userSevice';
import './HandBook.scss';
import { withRouter } from "react-router";

class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbooks: []
        }
    }
    async componentDidMount() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbooks: res.data ? res.data : []
            })
        }
    }
    handleViewDetailHandbook = (handbook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handbook.id}`)
        }

    }
    handleViewAllHandbook = () => {
        if (this.props.history) {
            this.props.history.push(`/all-handbook/`)
        }
    }
    render() {
        let { dataHandbooks } = this.state;
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.handbook" /></span>
                        <div
                            className='btn-section'
                            onClick={() => this.handleViewAllHandbook()}

                        >
                            <FormattedMessage id="homepage.more-infor" />
                        </div>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataHandbooks && dataHandbooks.length > 0 &&
                                dataHandbooks.map((item, index) => {
                                    return (
                                        <div
                                            className='section-customize each-handbook'
                                            key={index}
                                            onClick={() => this.handleViewDetailHandbook(item)}
                                        >
                                            <div
                                                className='bg-image section-handbook'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            ></div>
                                            <div className='title-handbook'>{item.title}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>

                </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
