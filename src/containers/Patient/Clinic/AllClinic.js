import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userSevice';
import HomeHeader from '../../HomePage/HomeHeader';
import { getAllClinic } from '../../../services/userSevice';
import './AllClinic.scss';

class AllClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []

        }
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }


    }
    changLanguage = (language) => {
        this.props.changLanguageAppRedux(language);
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
    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }
    render() {
        let { dataClinics } = this.state;
        return (
            <div className='all-clinic-container'>
                <HomeHeader />
                <div className='all-clinic-body'>
                    {dataClinics && dataClinics.length > 0 &&
                        dataClinics.map((item, index) => {
                            return (
                                <div
                                    className='each-clinic'
                                    key={index}
                                    onClick={() => this.handleViewDetailClinic(item)}
                                >
                                    <div
                                        className='img-clinic'
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    ></div>
                                    <div className='name-clinic'>{item.name}</div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllClinic);
