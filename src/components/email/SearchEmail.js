import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DatePicker, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { doFilterEmailsByDateRange } from '../../actions/email';
import './SearchEmail.css';

const { RangePicker } = DatePicker;

class SearchEmail extends Component {
    state = {
        startDate: '',
        endDate: ''
    }

    onChangeDatePicker = (value, dateString) => {
        if (dateString[0].length === 0 || dateString[1].length === 1) {
            this.props.doFilterEmailsByDateRange(dateString[0], dateString[1]);
        }

        this.setState({
            startDate: dateString[0],
            endDate: dateString[1]
        })
    }

    onSearch = () => {
        const { startDate, endDate } = this.state;
        this.props.doFilterEmailsByDateRange(startDate, endDate);
    }

    componentDidMount() {
        this.props.doFilterEmailsByDateRange(this.state.startDate, this.state.endDate);
    }

    render() {
        return (
            <div className="search">
                <RangePicker className="date-picker" size="large" onChange={this.onChangeDatePicker} />
                <Button type="default" size="large" icon={<SearchOutlined />} style={{ verticalAlign: "-0.5px" }} onClick={this.onSearch} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    doFilterEmailsByDateRange: (startDate, endDate) => dispatch(doFilterEmailsByDateRange(startDate, endDate)),
});

export default connect(null, mapDispatchToProps)(SearchEmail);