import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useRecord} from '../lib/useRecord';

const DatePickerWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  flex-direction: column;
  &.show{
    display: flex;
  }
  &.unShow{
    display: none;
  }
  > .mask{
    flex-grow: 1;
    background-color: rgba(0,0,0,.2);
  }
  > .picker{
    background-color: #f5f5f5;
    height: 40%;
    display: flex;
    flex-direction: column;
    .oneYearWrapper{
      display: flex;
      flex-direction: column;
      .year{
        align-self: center;
        color:#a7a7a7;
        font-size: 14px;
        padding:8px 0;
      }
      .monthList{
        margin-right: -5px;
        display: flex;
        flex-wrap: wrap;
        width: 300px;
        align-self: center;
        >li{
          display: flex;
          width: 70px;
          padding:16px 16px;
          justify-content: center;
          margin-right:5px;
          margin-bottom: 5px;
          align-items: center;
          background-color: #fff;
          &.selected{
            background-color: #ffda44;
          }
        }
      }
    }
  }
`;
type Props = {
  selectedDate: { year: string, month: string }
  onSelectedDateChange: (newDate: { year: string, month: string }) => void
  showDatePicker: boolean
}

function DatePicker(props: Props) {
  const {rebuildRecords} = useRecord();
  const [records] = useState(rebuildRecords());
  const [show, setShow] = useState(props.showDatePicker);
  useEffect(() => {
    setShow(props.showDatePicker);
  }, [props.showDatePicker]);
  const yearArr = Object.keys(records).sort((a, b) => {
    if (parseInt(a) - parseInt(b) >= 0) {
      return -1;
    } else if (parseInt(a) - parseInt(b) < 0) {
      return 1;
    } else {
      return 0;
    }
  });
  const monthArr = yearArr.map(item => {
    return {year: item, months: Object.keys(records[item])};
  });
  const selectedDateChange = (yearItem: string, monthItem: string) => {
    props.onSelectedDateChange({year: yearItem, month: monthItem});
    setShow(false);
  };
  return (
    <DatePickerWrapper className={show ? 'show' : 'unShow'}>
      <div className='mask'/>
      <ul className='picker'>
        {yearArr.map(yearItem => {
          return (
            <li key={yearItem} className='oneYearWrapper'>
              <div className='year'>{yearItem}年</div>
              <ul className='monthList'>
                {monthArr.filter(dateItem => dateItem.year === yearItem)[0].months.map(monthItem => {
                  return (
                    <li key={monthItem}
                        onClick={() => {
                          selectedDateChange(yearItem, monthItem);
                        }}
                        className={props.selectedDate.year === yearItem && props.selectedDate.month === monthItem ? 'selected' : ''}>
                      {monthItem}月
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </DatePickerWrapper>
  );
}

export {DatePicker};