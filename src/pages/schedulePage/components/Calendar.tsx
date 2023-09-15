import React, { useEffect, useState } from 'react';
import ControlDate from './ControlDate';
import DateBox from './DateBox';
import styled from 'styled-components';
import axios from 'axios';
import { Holiday } from '../../../types/type';

const Container = styled.div`
    width: 900px;
    height: 700px;
    display: flex;
    flex-direction: column;
    @media (max-width: 575px) {
        width: 100%;
        margin-top: 20px;
        border-top: 2px solid;
        border-bottom: 2px solid;
    }
`;

// const requestData = {
//     url: `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?`,
//     serviceKey: process.env.REACT_APP_SERVICE_KEY,
//     solYear: 2022,
//     solMonth: 12,
// };

interface Props {
    nowDate: Date;
    setNowDate: React.Dispatch<React.SetStateAction<Date>>;
    clickedDate: Date;
    setClickedDate: React.Dispatch<React.SetStateAction<Date>>;
    // holiday: Holiday[];
}

const Calendar = ({ nowDate, setNowDate, clickedDate, setClickedDate }: Props) => {
    console.log('in calendar.tsx', { nowDate }, { clickedDate }); //test code
    //api 문서대로 date 형식 formating 필요?
    //물어보장

    // const [holiday, setholiday] = useState<Holiday[]>([]);

    // const getHoliday = async () => {
    //     const bodyData = {
    //         ...requestData,
    //         solYear: nowDate.getFullYear(),
    //         solMonth: nowDate.getMonth() + 1,
    //     };

    //     const response = await axios.get(
    //         `${bodyData.url}ServiceKey=${bodyData.serviceKey}&solYear=${bodyData.solYear}&solMonth=${bodyData.solMonth}`
    //     );

    //     const saveData = [].concat(response.data.response.body.items.item);
    //     setholiday(saveData);
    // };

    // useEffect(() => {
    //     getHoliday();
    // }, [nowDate]);

    return (
        <Container>
            <ControlDate nowDate={nowDate} setNowDate={setNowDate} />
            <DateBox
                nowDate={nowDate}
                setNowDate={setNowDate}
                clickedDate={clickedDate}
                setClickedDate={setClickedDate}
                // holiday={holiday}
            />
        </Container>
    );
};

export default Calendar;
