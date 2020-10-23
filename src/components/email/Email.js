import React from 'react';
import { Avatar, Button, Space } from 'antd';
import { DownloadOutlined, PaperClipOutlined } from '@ant-design/icons';
import { getAvatarColor } from '../../utils/Colors';
import { timeSince, formatHourAndMinute, formatDateTimeMM_DD_YY } from '../../utils/Helpers';
import './Email.css';

const Email = ({ email }) => {
    const { createdDate, payload } = email;
    const { attachments } = payload;
    const isAttachment = attachments.length > 0 ? true : false;
    const allEmailTo = payload.headers.to.map(to => {
        return to.value;
    }).join(', ')

    const uiAttachments = (attachments || []).map((item, index) => {
        return (
            <Button key={index} type="primary" shape="round" icon={<DownloadOutlined />}>
                {item.filename}
            </Button>
        )
    })

    return (
        <div className="email">
            <div className="subject">{payload.subject}</div>
            <div className="header-email">
                <div className="username">
                    <Avatar className="user-avatar-circle" size={40} style={{ backgroundColor: getAvatarColor(payload.headers.from.value) }}>
                        {payload.headers.from.value[0].toUpperCase()}
                    </Avatar>
                    <div>
                        <div className="username-from">
                            {payload.headers.from.value}
                        </div>
                        <div className="username-to">
                            to
                        <span className="username-list">{allEmailTo}</span>
                        </div>
                    </div>
                </div>
                <div className="icon-attachment">
                    <PaperClipOutlined style={{ color: "#5f6368" }} />
                    <span className="time">
                        {`${formatDateTimeMM_DD_YY(createdDate)}, ${formatHourAndMinute(createdDate)} (${timeSince(createdDate)})`}
                    </span>
                </div>
            </div>
            <div className="body">
                <p dangerouslySetInnerHTML={{ __html: payload.body }} />
            </div>
            {isAttachment && (
                <div className="attachment">
                    <Space direction="vertical" size="middle">
                        {uiAttachments}
                    </Space>
                </div>
            )}
        </div>
    );
}

export default Email;