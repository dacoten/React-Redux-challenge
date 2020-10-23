import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Tag, Drawer, Tooltip, Space } from 'antd';
import { DownloadOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import i18next from 'i18next';
import { formatDateTimeMM_DD_YY } from '../../utils/Helpers';
import { sort, getComparator } from '../../utils/Common';
import Email from './Email';
import NoData from '../common/NoData';
import MailSpecialIcon from '../../svg/icon_mail_sp.svg';
import './Emails.css';

const THEAD_TABLE = [
    { id: 'from', label: 'FROM', className: 'thFrom' },
    { id: 'to', label: 'TO', className: 'thTo' },
    { id: 'subject', label: 'SUBJECT', className: 'thSubject' },
    { id: 'attachment', label: '', className: 'thAttachment' },
    { id: 'date', label: 'DATE', className: 'thDate' },
];

class Emails extends Component {
    state = {
        visible: false,
        dataSelected: [],
        selectedRowKeys: [],
        order: "desc",
        orderBy: "",
    };

    onCloseDrawer = () => {
        this.setState({
            visible: false,
            selectedRowKeys: []
        })
    }

    setSelected = (id) => {
        const { emails } = this.props;
        const selectedRowKeys = [...this.state.selectedRowKeys, id];

        const dataSelected = emails.filter(item => {
            return selectedRowKeys.includes(item.id);
        })

        this.setState({
            dataSelected,
            selectedRowKeys,
            visible: selectedRowKeys.length > 0 ? true : false
        })

        this.setRowClassName(id);
    }

    setRowClassName = (id) => {
        const { dataSelected } = this.state;
        const filtered = dataSelected.reduce((arr, item) => (arr.push(item.id), arr), []);

        return filtered.length && filtered.includes(id) ? 'isSelected' : '';
    }

    doSortHandler = property => event => {
        this.handleRequestSort(event, property);
    };

    handleRequestSort = (e, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setState({
            order: isAsc ? 'desc' : 'asc',
            orderBy: property,
        });
    };

    doConvertData = data => {
        return data.map(row => {
            return {
                id: row.id,
                from: row.payload.headers.from.value,
                to: row.payload.headers.to,
                snippet: row.snippet,
                subject: row.payload.subject,
                body: row.payload.body,
                attachments: row.payload.attachments,
                formatDate: formatDateTimeMM_DD_YY(row.createdDate),
            };
        });
    };

    render() {
        const { emails } = this.props;
        const { dataSelected, order, orderBy } = this.state;
        const convertDataEmails = this.doConvertData(emails);

        const columns = sort(convertDataEmails, getComparator(order, orderBy)).map(row => {
            const headerTos = row.to;
            const restEmails = headerTos.length > 0 &&
                headerTos.slice(1).map(to => {
                    return to.value;
                }).join(', ')

            const isAttachment = row.attachments.length > 0 ? true : false;

            const uiAttachments = (row.attachments || []).map((item, index) => {
                return (
                    <Button key={index} type="default" shape="round" icon={<DownloadOutlined />}>
                        {item.filename}
                    </Button>
                )
            })

            return (
                <div
                    className={`emails-container ${this.setRowClassName(row.id)}`}
                    key={row.id}
                    onClick={() => this.setSelected(row.id)}
                >
                    <div className="row">
                        <div className="tdIcon">
                            <img alt="specialIcon" src={MailSpecialIcon} className="sp-icon" />
                        </div>
                        <div className="tdFrom">{row.from}</div>
                        <div className="tdTo">
                            {headerTos[0].value}{headerTos.length > 1 && ', ...'}
                            <div>
                                <Tooltip placement="bottom" title={restEmails}>
                                    {headerTos.length - 1 > 0 && <Tag color="default" className="tag" style={{ cursor: "pointer" }}>+ {headerTos.length - 1}</Tag>}
                                </Tooltip>
                            </div>
                        </div>
                        <div className="tdSubject">
                            <div>
                                <div className="info container-subject">
                                    <div className="subject">
                                        <span className="bog">
                                            {row.subject}
                                        </span>
                                        <span className="content">
                                            <span>&nbsp;-&nbsp;</span>
                                            {row.snippet}
                                        </span>
                                    </div>
                                </div>
                                {isAttachment && (
                                    <div className="attachment">
                                        <Space>
                                            {uiAttachments}
                                        </Space>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="tdAttachment">
                            {isAttachment && (
                                <svg viewBox="0 0 13.93083 15" height="15" width="15">
                                    <path d="M6.799,3.6254A2.30522,2.30522,0,1,0,3.56718,6.85622l4.304,4.304a.5222.5222,0,0,0,.7385-.7385l-4.304-4.304c-.53586-.53586-.87743-1.33808-.23084-1.98466.64553-.64659,1.4488-.304,1.98466.23189L11.032,9.3364c1.90632,1.90841,2.38159,2.78793,1.24615,3.92441-1.149,1.148-2.367.86385-4.20121-.96935L2.367,6.57941C1.1741,5.38653.33845,3.43842,1.90633,1.87159c1.86141-1.86141,3.98708-.03134,4.59293.57555l5.11038,5.11142a.5222.5222,0,0,0,.7385-.7385L7.23776,1.70864C5.18625-.34288,2.86-.56223,1.16678,1.13308c-1.711,1.71-1.5261,4.196.4617,6.18484l5.711,5.711C7.96726,13.6567,9.31161,15,10.85756,15a3.01214,3.01214,0,0,0,2.16014-1.00173c2.07554-2.07658.15564-3.99857-1.24616-5.40141Z" />
                                </svg>
                            )}
                        </div>
                        <div className="tdDate">
                            <span>
                                {row.formatDate}
                            </span>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="emails">
                <div className="result">
                    {i18next.t('RESULTS')}: {emails.length} {emails.length > 1 ? i18next.t('MAILS') : i18next.t('MAIL')}
                </div>
                {emails.length ? (
                    <div>
                        <Drawer
                            title={i18next.t('DETAIL')}
                            placement="right"
                            mask={false}
                            width={550}
                            closable={true}
                            onClose={this.onCloseDrawer}
                            visible={this.state.visible}
                            className="drawer-emails"
                        >
                            {(dataSelected || []).map(email =>
                                <Email
                                    key={email.id}
                                    email={email}
                                />
                            )}
                        </Drawer>

                        <div className="email-header">
                            {THEAD_TABLE.map(item => {
                                return (
                                    <div className={`email-header-item ${item.className}`} key={item.id}>
                                        <div
                                            onClick={this.doSortHandler(item.id)}
                                        >
                                            {i18next.t(item.label)}
                                            {this.state.orderBy.length !== 0 && (
                                                this.state.orderBy === item.id && this.state.order === 'asc' ?
                                                    (<CaretUpOutlined />) : (<CaretDownOutlined />)
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {columns}
                    </div>
                ) :
                    (
                        <NoData />
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        emails: state.emailState.emails,
    };
};

export default connect(mapStateToProps)(Emails);

