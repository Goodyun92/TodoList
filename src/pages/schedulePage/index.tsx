import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from './components/Calendar';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atom';
import { UserType } from '../../interfaces/interfaces';
import { useNavigate } from 'react-router-dom';
import check from '../../imgs/check.png';
import none from '../../imgs/none.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    @media (max-width: 575px) {
        padding: 5px;
    }
`;
const Section = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 150px;
    justify-content: center;
    align-items: center;
    height: 700px;
    @media (max-width: 575px) {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        margin-bottom: 50px;
        gap: 20px;
        height: auto;
    }
`;
const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 575px) {
        flex-direction: column;
        margin-top: 20px;
        background-color: white;
        width: 100%;
    }
`;
const Title = styled.div`
    margin: 30px 0px 30px 50px;
    font-size: 50px;
    font-weight: 600;
    font-style: italic;
    @media (max-width: 575px) {
        margin: 0px;
        width: 100%;
        justify-self: center;
        text-align: center;
        margin-bottom: 30px;
    }
`;
const UserNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-right: 40px;
    margin-top: 10px;
    @media (max-width: 575px) {
        width: 100%;
        justify-self: center;
    }
`;
const UserName = styled.div`
    font-size: 15px;
    font-weight: 600;
    border-bottom: 3px solid;
    padding: 5px;
    margin-top: 5px;
`;
const LogoutButton = styled.button`
    border: none;
    border-radius: 5px;
    background-color: #d9d9d9;
    padding: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #bfbfbf;
    }
`;
const TodoList = styled.div`
    margin-top: 70px;
    margin-right: 30px;
    width: 470px;
    height: 550px;
    display: flex;
    flex-direction: column;
    border: none;
    background-color: #d9d9d9;
    border-radius: 25px;
    @media (max-width: 575px) {
        width: 100%;
        margin: 0px;
        margin-top: 10px;
    }
`;
const ListNav = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 2.5px solid;
    padding: 15px;
`;
const ListBody = styled.div`
    padding: 0px 15px;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const TodoContent = styled.div`
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px 0px 10px 0px;
    border-top: 0.5px solid;
`;
const CheckImg = styled.img`
    width: 15px;
    height: 15px;
    border-radius: 5px;
    border: solid;
    padding: 1%;
    background-color: whitesmoke;
`;
const InputWrap = styled.div``;
const Input = styled.input`
    margin: 0px 10px;
    border: none;
    background-color: lightgray;
    width: 90%;
    height: 25px;
    font-size: 13px;
    font-weight: 600;
    padding: 5px;
`;
const ReviewInput = styled(Input)`
    font-size: 20px;
    background-color: #d9d9d9;
    &::placeholder {
        font-size: 12px;
    }
`;
const Button = styled.button`
    width: 55px;
    border: none;
    border-radius: 10px;
    background-color: lightgray;
    padding: 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #bfbfbf;
    }
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
        userInfo.userId > 0 &&
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

    const handleCheck = (idx: number, id: number) => {
        const updatedPlan = [...schedules];
        updatedPlan[idx] = { ...updatedPlan[idx], checkStatus: !updatedPlan[idx].checkStatus };

        axios
            .patch(`https://www.mytodo.shop/api/plans/${userInfo.userId}/update-plan/${id}`, {
                date: updatedPlan[idx].date,
                content: updatedPlan[idx].content,
                checkStatus: updatedPlan[idx].checkStatus,
                review: updatedPlan[idx].review,
            })
            .then((response) => {
                console.log(response.data);
                getPlan();
            })
            .catch((error) => {
                console.log(error);
            });
    };

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

        userInfo.userId > 0 &&
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
        setUserInfo({
            userId: 0,
            userName: 'Guest',
            password: 'Guest',
        });
        navigate('/login');
    };
    const logIn = () => {
        navigate('/login');
    };

    return (
        <Container>
            <Nav>
                <Title>Easy Calendar</Title>
                <UserNav>
                    <UserName>{userInfo.userName}님</UserName>
                    {userInfo.userId > 0 ? (
                        <LogoutButton onClick={logOut}>로그아웃</LogoutButton>
                    ) : (
                        <LogoutButton onClick={logIn}>로그인</LogoutButton>
                    )}
                </UserNav>
            </Nav>
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
                        <div>일정 목록</div>
                    </ListNav>

                    {/* 바뀐 plan 내용 저장할 newPlan state 만들고 axios할때 쓰기
                    input에서 onchange */}
                    <ListBody>
                        {/* schedule배열요소 map해서 쓰기 */}
                        {schedules?.map((plan, idx) => (
                            <TodoContent key={idx}>
                                {plan.checkStatus ? (
                                    <CheckImg src={check} onClick={() => handleCheck(idx, plan.planId)} />
                                ) : (
                                    <CheckImg src={none} onClick={() => handleCheck(idx, plan.planId)} />
                                )}

                                <InputWrap>
                                    <Input
                                        value={plan.content}
                                        onChange={(e) => {
                                            handlePlanChange(idx, 'content', e.target.value);
                                        }}
                                    />
                                    <ReviewInput
                                        placeholder="이모티콘으로 감정을 표현해보세요!"
                                        value={plan.review}
                                        onChange={(e) => {
                                            handlePlanChange(idx, 'review', e.target.value);
                                        }}
                                    />
                                </InputWrap>

                                <Button onClick={() => handlePlanUpdate(idx, plan.planId)}>수정</Button>
                                <Button onClick={() => handlePlanDelete(plan.planId)}>삭제</Button>
                            </TodoContent>
                        ))}

                        <TodoContent>
                            <Input placeholder="일정 추가하기" value={newContent} onChange={changePostPlan} />
                            <Button onClick={postPlan}>추가</Button>
                        </TodoContent>
                    </ListBody>
                </TodoList>
            </Section>
        </Container>
    );
};

export default SchedulePage;
