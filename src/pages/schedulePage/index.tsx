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
    //일정 type
    type ScheduleType = {
        planId: number;
        date: string;
        content: string;
        checkStatus: boolean;
        review: string;
    };

    //일정 받아올 배열
    const [schedules, setSchedules] = useState<ScheduleType[]>();

    //날짜 state
    const [nowDate, setNowDate] = useState<Date>(new Date());
    const [clickedDate, setClickedDate] = useState<Date>(nowDate);

    //일정 state
    const [scheduleState, setScheduleState] = useState<ScheduleType>();

    //formated date
    const [formattedDate, setFormattedDate] = useState<string>();

    useEffect(() => {
        //YYMMDD형식으로 변경 formatted
        const year = clickedDate.getFullYear().toString().slice(-2); // 뒤의 두 자리만 추출
        const month = (clickedDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해주고, 두 자리 문자열로 만듦
        const day = clickedDate.getDate().toString().padStart(2, '0'); // 두 자리 문자열로 만듦
        setFormattedDate(year + month + day);

        //axios
        //clickedDate의 날짜의 일정 받아와서 schedules에 저장
    }, [clickedDate]);

    return (
        <Container>
            <Title>Easy Calendar</Title>
            <button>로그아웃</button>
            <Section>
                <Calendar
                    nowDate={nowDate}
                    setNowDate={setNowDate}
                    clickedDate={clickedDate}
                    setClickedDate={setClickedDate}
                    // holiday={holiday}
                />
                <TodoList>
                    <ListNav>
                        <div>LIST</div>
                        <div>{formattedDate}</div>
                        <button>추가</button>
                    </ListNav>

                    {/* 바뀐 plan 내용 저장할 state 만들고 axios할때 쓰기
                    input에서 onchange */}
                    <ListBody>
                        {/* schedule배열요소 map해서 쓰기 */}
                        {schedules?.map((plan) => (
                            <div key={plan.planId}>
                                {plan.checkStatus ? <button></button> : <button></button>}

                                <input value={plan.content} />
                                <input value={plan.review} />

                                <button>수정</button>
                                <button>삭제</button>
                            </div>
                        ))}

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
