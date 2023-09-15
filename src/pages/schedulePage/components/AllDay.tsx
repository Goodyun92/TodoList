import React from 'react';
import styled, { css } from 'styled-components';

interface ContainerProps {
    sameMonth: boolean;
    sameDay: boolean;
    clickDay: boolean;
    // isHoliday: boolean;
}

const Container = styled.div<ContainerProps>`
    /* border: 1px solid gray; */
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    p {
        &:hover {
            /* background-color: gray; */
            border: solid 4px #dae982;
        }

        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        width: 94px;
        height: 71px;
        /* background-color: #d9d9d9; */
        background-color: ${({ sameMonth }) => (sameMonth ? `#d9d9d9` : `ffffff`)};
        padding: 2px;
        font-weight: ${({ sameMonth }) => (sameMonth ? `650` : `350`)};

        ${({ sameDay }) =>
            sameDay
                ? css`
                      background-color: darkgrey;
                      font-weight: 650;
                  `
                : css``}

        ${({ clickDay }) =>
            clickDay
                ? css`
                      /* border: 2px solid skyblue; */
                      background-color: #dae982;
                      font-weight: 900;
                  `
                : css``}
    }

    @media (max-width: 575px) {
        gap: 5px;
        p {
            width: 40px;
            height: 40px;
        }
    }
`;

interface Props {
    day: Date;
    nowDate: Date;
    setNowDate: React.Dispatch<React.SetStateAction<Date>>;
    clickedDate: Date;
    setClickedDate: React.Dispatch<React.SetStateAction<Date>>;
    // isHoliday: boolean;
}

const allDay = ({ day, nowDate, setNowDate, clickedDate, setClickedDate }: Props) => {
    const nowTime = new Date();

    const sameMonth = nowDate.getMonth() === day.getMonth();
    const sameDay =
        nowTime.getFullYear() === day.getFullYear() &&
        nowTime.getMonth() === day.getMonth() &&
        nowTime.getDate() === day.getDate();

    const clickDay: boolean = clickedDate
        ? clickedDate.getFullYear() === day.getFullYear() &&
          clickedDate.getMonth() === day.getMonth() &&
          clickedDate.getDate() === day.getDate()
        : false;

    const clickDate = () => {
        setClickedDate(day);
    };

    return (
        <Container
            onClick={() => clickDate()}
            sameMonth={sameMonth}
            sameDay={sameDay}
            clickDay={clickDay}
            // isHoliday={isHoliday}
        >
            <p>{day.getDate()}</p>
        </Container>
    );
};

export default allDay;
