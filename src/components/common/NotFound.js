import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import i18next from 'i18next';
import './NotFound.css';

function NotFound() {
    return (
        <div className="page-not-found">
            <h1 className="title">
                404
            </h1>
            <div className="desc">
                {i18next.t('ERROR_NOT_FOUND_404')}
            </div>
            <Link to="/">
                <Button className="go-back-btn" type="primary" size="large">{i18next.t('GO_BACK')}</Button>
            </Link>
        </div>
    );
}

export default NotFound;