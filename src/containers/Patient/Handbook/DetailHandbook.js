import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./DetailHandbook.scss"
import HomeHeader from '../../HomePage/HomeHeader';
import { getAllDetailHandbookById } from '../../../services/userSevice';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import HomeFooter from '../../HomePage/HomeFooter';
class DetailHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandbook: {}

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailHandbookById({
                id: id,

            });
            if (res && res.errCode === 0) {
                let data = res.data;
                this.setState({
                    dataDetailHandbook: data,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    render() {
        let { dataDetailHandbook } = this.state;
        let { language } = this.props;
        console.log('check state: ', this.state);

        return (
            <div className='detail-handbook-container'>
                <HomeHeader />
                <div className='detail-handbook-body'>
                    <div className='description-handbook'>
                        <div className='title-handbook'>{dataDetailHandbook.title}</div>
                        <div
                            className='thumbnail-handbook'
                            style={{ backgroundImage: `url(${dataDetailHandbook.image})` }}

                        ></div>
                        <div className='content-handbook'>
                            {dataDetailHandbook && !_.isEmpty(dataDetailHandbook)
                                &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailHandbook.decscriptionHTML }}>
                                </div>

                            }
                        </div>
                    </div>

                </div>
                {/* <HomeFooter /> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
