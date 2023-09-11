import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from './components/Calendar';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atom';
import { UserType } from '../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    //user 정보
    const [userInfo, setUserInfo] = useRecoilState<UserType>(userState);

    //일정 type
    type ScheduleType = {
        planId: number;
        date: string;
        content: string;
        checkStatus: boolean;
        review: string;
    };

    //일정 받아올 배열
    const [schedules, setSchedules] = useState<ScheduleType[]>([]);

    //날짜 state
    const [nowDate, setNowDate] = useState<Date>(new Date());
    const [clickedDate, setClickedDate] = useState<Date>(nowDate);

    //새로 생성할 content
    const [newContent, setNewContent] = useState<string>('');

    const getPlan = () => {
        //YYMMDD형식으로 변경 formatted
        const year = clickedDate.getFullYear().toString().slice(-2); // 뒤의 두 자리만 추출
        const month = (clickedDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해주고, 두 자리 문자열로 만듦
        const day = clickedDate.getDate().toString().padStart(2, '0'); // 두 자리 문자열로 만듦
        const date = year + month + day; //axios할때 쓰기
        console.log(date);
        console.log(userInfo.userId);
        //axios
        //clickedDate의 날짜의 일정 받아와서 schedules에 저장
        axios
            .get(`https://www.mytodo.shop/api/plans/${userInfo.userId}/get-plan`, {
                params: {
                    date: date,
                },
            })
            .then((response) => {
                console.log(response.data);
                setSchedules(response.data);
            });
    };

    useEffect(() => {
        getPlan();
    }, [clickedDate]);

    const handlePlanChange = (idx: number, key: string, value: string) => {
        const updatedPlan = [...schedules];
        updatedPlan[idx] = { ...updatedPlan[idx], [key]: value };
        setSchedules(updatedPlan);
        console.log(schedules);
    };

    const handlePlanUpdate = (idx: number, id: number) => {
        axios
            .patch(`https://www.mytodo.shop/api/plans/${userInfo.userId}/update-plan/${id}`, {
                date: schedules[idx].date,
                content: schedules[idx].content,
                checkStatus: schedules[idx].checkStatus,
                review: schedules[idx].review,
            })
            .then((response) => {
                console.log(response.data);
                getPlan();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handlePlanDelete = (id: number) => {
        axios
            .delete(`https://www.mytodo.shop/api/plans/${userInfo.userId}/delete-plan/${id}`)
            .then((response) => {
                console.log(response.data);
                getPlan();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const changePostPlan = (e: any) => {
        setNewContent(e.target.value);
    };
    const postPlan = () => {
        //YYMMDD형식으로 변경 formatted
        const year = clickedDate.getFullYear().toString().slice(-2); // 뒤의 두 자리만 추출
        const month = (clickedDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해주고, 두 자리 문자열로 만듦
        const day = clickedDate.getDate().toString().padStart(2, '0'); // 두 자리 문자열로 만듦
        const date = year + month + day; //axios할때 쓰기

        axios
            .post(`https://www.mytodo.shop/api/plans/${userInfo.userId}/post-plan`, {
                date: date,
                content: newContent,
                checkStatus: false,
                review: '',
            })
            .then((response) => {
                console.log(response.data);
                setNewContent('');
                getPlan();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const logOut = () => {
        navigate('/login');
    };

    return (
        <Container>
            <Title>Easy Calendar</Title>
            <div>{userInfo.userName}님의 TODO-LIST</div>
            <button onClick={logOut}>로그아웃</button>
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
                        {/* <div>LIST</div> */}
                        <div>일정 목록</div>
                        {/* <button>추가</button> */}
                    </ListNav>

                    {/* 바뀐 plan 내용 저장할 newPlan state 만들고 axios할때 쓰기
                    input에서 onchange */}
                    <ListBody>
                        {/* schedule배열요소 map해서 쓰기 */}
                        {schedules?.map((plan, idx) => (
                            <TodoContent key={idx}>
                                {plan.checkStatus ? <button></button> : <button></button>}

                                <input
                                    value={plan.content}
                                    onChange={(e) => {
                                        handlePlanChange(idx, 'content', e.target.value);
                                    }}
                                />
                                <input
                                    value={plan.review}
                                    onChange={(e) => {
                                        handlePlanChange(idx, 'review', e.target.value);
                                    }}
                                />

                                <button onClick={() => handlePlanUpdate(idx, plan.planId)}>수정</button>
                                <button onClick={() => handlePlanDelete(plan.planId)}>삭제</button>
                            </TodoContent>
                        ))}

                        <TodoContent>
                            <input placeholder="일정 추가하기" value={newContent} onChange={changePostPlan} />
                            <button onClick={postPlan}>추가</button>
                        </TodoContent>
                    </ListBody>
                </TodoList>
            </Section>
        </Container>
    );
};

export default SchedulePage;
