import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./DetailClinic.scss"
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailClinicById, getAllCodeService } from '../../../services/userSevice';
import _, { every } from 'lodash';
import { LANGUAGES } from '../../../utils';
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            showFullContent: false,

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailClinicById({
                id: id,

            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)

                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,

                })
            }
        }
    }
    getDaTaDetailSpecialty = () => {

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

    toggleShowContent = () => {
        this.setState({
            showFullContent: !this.state.showFullContent
        })
    };
    render() {
        let { arrDoctorId, dataDetailClinic, showFullContent } = this.state;
        let { language } = this.props;
        console.log('check state: ', this.state);

        return (
            <div className='detail-clinic-container'>
                <HomeHeader />
                <div className='detail-clinic-body'>
                    <div className='description-clinic'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                            &&
                            // <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.decscriptionHTML }}>
                            // </div>
                            <div className="description-container">
                                <div className="description">
                                    <div className='name-clinic'>{dataDetailClinic.name}</div>
                                    <div
                                        className={`content ${showFullContent ? 'show-full-content' : ''}`}
                                        id="description-content"
                                        dangerouslySetInnerHTML={{ __html: dataDetailClinic.decscriptionHTML }}
                                    ></div>
                                    {dataDetailClinic.decscriptionHTML.length > 150 && (
                                        <button id="show-more" onClick={this.toggleShowContent}>
                                            {showFullContent ?
                                                <FormattedMessage id="patient.detail-specialty.show-less" />
                                                :
                                                <FormattedMessage id="patient.detail-specialty.show-more" />
                                            }
                                        </button>
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>

                                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
