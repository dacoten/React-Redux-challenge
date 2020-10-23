import React, { Component } from 'react';
import { Menu, Dropdown, Row, Col, Modal } from 'antd';
import { GlobalOutlined, DownOutlined, AppstoreOutlined } from '@ant-design/icons';
import i18next from 'i18next';
import { getNameCountryLanguage } from '../../utils/Common';
import { SELECTED_LANGUAGE } from '../../constants/index';
import "./Language.css";

class Language extends Component {
    state = {
        visible: false
    }

    showModalLanguage = (e) => {
        e.preventDefault();
        this.setState({
            visible: true
        })
    };

    archiveLanguage = (language) => {
        localStorage.setItem(SELECTED_LANGUAGE, language);

        i18next.changeLanguage(language).then(
            window.location.reload(true)
        );
    };

    hideModalLanguage = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const menuLanguage = (
            <Menu style={{ width: '180px', borderRadius: '8px', top: '3px' }}>
                <Menu.Item key="0">
                    <div><GlobalOutlined className="icon-global" />
                        <span style={{ fontSize: '14px' }}>
                            {localStorage.getItem(SELECTED_LANGUAGE) ? getNameCountryLanguage(localStorage.getItem(SELECTED_LANGUAGE)) : "English (US)"}
                        </span>
                    </div>
                </Menu.Item>
                <Menu.Item key="1">
                    <div onClick={this.showModalLanguage}>
                        <span><AppstoreOutlined className="icon-app-store" /></span>
                        <span style={{ fontSize: '14px' }}>{i18next.t('LANGUAGE')}</span>
                    </div>
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="language">
                <Menu mode="horizontal" style={{ borderBottom: "none" }}>
                    <Menu.Item key="/language">
                        <Dropdown overlay={menuLanguage} trigger={['click']} placement="bottomRight">
                            <a href="/#" className="ant-dropdown-link language-link" onClick={e => e.preventDefault()}>
                                <GlobalOutlined style={{ color: '#222222', fontSize: '15px', marginRight: '3px' }} />
                                <DownOutlined style={{ color: '#222222' }} />
                                <span style={{ fontSize: '14px' }}>
                                    {localStorage.getItem(SELECTED_LANGUAGE) ? getNameCountryLanguage(localStorage.getItem(SELECTED_LANGUAGE)) : "English (US)"}
                                </span>
                            </a>
                        </Dropdown>
                    </Menu.Item>
                </Menu>

                <Modal
                    title={i18next.t('CHOOSE_LANGUAGE_AND_REGION')}
                    className="modal-language"
                    visible={this.state.visible}
                    onCancel={this.hideModalLanguage}
                    keyboard={true}
                    footer={null}
                >
                    <Row gutter={10}>
                        <Col xs={12}>
                            <div onClick={() => this.archiveLanguage("jp")} className={"item " + (localStorage.getItem(SELECTED_LANGUAGE) === "jp" ? "active-language" : "none-active-language")}>
                                <div>日本語</div>
                                <div className="country">日本</div>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div onClick={() => this.archiveLanguage("en")} className={"item " + (localStorage.getItem(SELECTED_LANGUAGE) === "en" ? "active-language" : "none-active-language")}>
                                <div>English</div>
                                <div className="country">United States</div>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

export default Language;