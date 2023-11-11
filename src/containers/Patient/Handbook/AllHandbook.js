import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userSevice';
import HomeHeader from '../../HomePage/HomeHeader';
import { getAllHandbook } from '../../../services/userSevice';
import './AllHandbook.scss';

class AllHandbook extends Component {
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
    handleViewDetailHandbook = (handbook) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${handbook.id}`)
        }

    }
    render() {
        let { dataHandbooks } = this.state;
        return (
            <div className='all-handbook-container'>
                <HomeHeader />
                <div className='all-handbook-body'>
                    {dataHandbooks && dataHandbooks.length > 0 &&
                        dataHandbooks.map((item, index) => {
                            return (
                                <div
                                    className='each-handbook'
                                    key={index}
                                    onClick={() => this.handleViewDetailHandbook(item)}
                                >
                                    <div
                                        className='img-handbook'
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    ></div>
                                    <div className='name-handbook'>{item.title}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllHandbook);
