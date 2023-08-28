import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from './components/Calendar';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
const Section = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 150px;
    justify-content: center;
    align-items: center;
    height: 700px;
`;
const Title = styled.div`
    margin: 30px 0px 30px 50px;
    font-size: 45px;
    font-weight: 600;
    font-style: italic;
`;
const TodoList = styled.div`
    margin-top: 70px;
    margin-right: 10px;
    width: 400px;
    height: 550px;
    display: flex;
    flex-direction: column;
    border: none;
    background-color: #d9d9d9;
    border-radius: 25px;
    padding: 10px;
`;
const ListNav = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: solid;
    padding: 15px;
`;
const ListBody = styled.div`
    padding: 10px;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    gap: 20px;
`;
const TodoContent = styled.div`
    border: none;
`;

const SchedulePage = () => {
    type ScheduleContent = {
        content: string;
        complete: boolean;
        emoji: number;
    };
    //fontawesome에서 가져와서
    //emoji에 따라 사용

    const [schedule, setSchedule] = useState<ScheduleContent[]>([]);

    return (
        <Container>
            <Title>Easy Calendar</Title>
            <Section>
                <Calendar />
                <TodoList>
                    <ListNav>
                        <div>LIST</div>
                        <div> 날짜 </div>
                        <button>추가</button>
                    </ListNav>
                    <ListBody>
                        {/* schedule배열요소 map해서 쓰기 */}
                        <TodoContent>예시 과제하기</TodoContent>
                        <TodoContent>예시 숙제하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                        <TodoContent>예시 게임하기</TodoContent>
                    </ListBody>
                </TodoList>
            </Section>
        </Container>
    );
};

export default SchedulePage;
