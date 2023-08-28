import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    /* background-color: gray; */
    /* border: 1px solid black; */
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

interface Props {
    weekName: string;
}

const WeekBox = ({ weekName }: Props) => {
    return (
        <Container>
            <p>{weekName}</p>
        </Container>
    );
};

export default WeekBox;
