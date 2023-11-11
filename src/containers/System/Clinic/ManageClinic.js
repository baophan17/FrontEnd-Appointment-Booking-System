import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userSevice';
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            decscriptionHTML: '',
            decscriptionMarkdown: '',
            address: ''
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
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            decscriptionHTML: html,
            decscriptionMarkdown: text
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getbase64(file);
            this.setState({
                imageBase64: base64,
            })
        }

    }
    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success("Add new clinic succeed !");
            this.setState({
                name: '',
                imageBase64: null,
                address: '',
                decscriptionHTML: '',
                decscriptionMarkdown: ''
            })
        } else {
            toast.error("Something wrongs......");
            console.log('check res: ', res);
        }
    }
    render() {

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý phòng khám</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input
                            className='form-control'
                            type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input
                            className='form-control-file'
                            type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input
                            className='form-control'
                            type='text'
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        />

                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.decscriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button
                            className='btn-save-specialty'
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            Save
                        </button>

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
