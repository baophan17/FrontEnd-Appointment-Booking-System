import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userSevice';
import HomeHeader from '../../HomePage/HomeHeader';
import './AllSpecialty.scss';

class AllSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []

        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        // console.log('check res: ', res);
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
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
    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }

    }
    render() {
        let { dataSpecialty } = this.state;
        return (
            <div className='all-specialty-container'>
                <HomeHeader />
                <div className='all-specialty-body'>
                    {dataSpecialty && dataSpecialty.length > 0 &&
                        dataSpecialty.map((item, index) => {
                            return (
                                <div
                                    className='each-specialty'
                                    key={index}
                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                >
                                    <div
                                        className='img-specialty'
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    ></div>
                                    <div className='name-specialty'>{item.name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllSpecialty);
