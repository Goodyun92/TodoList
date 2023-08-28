### 로그인 페이지

userid만 리코일 persist로 저장

---

### 스케줄 페이지

-   index.tsx 에서 클릭날짜 선언
-   clickeddate, setClickedDate를 props로 calendar.tsx로 보내주기
-   스케줄 페이지 index.tsx에서 클릭된 날짜 가공해서 month,day 추출(getMonth) axios할때 사용
-   clickedDate바뀔떄마다 일정받아오기 api사용( useEffect)
-   clickedDate초기값을 nowDate넣어주자 그래서 첫 렌더링에서는 오늘 투두리스트 띄우게

---

### 투두리스트 만들기

-   새로운 컴포넌트만들고 props:clicked date
-   할일 추가 : 박스 아래 입력창 만들고 옆에 추가 버튼 만들자
-   객체하나 만들어서 api 일정 받아와서 저장해서 렌더링에 쓰기, 수정등 api에 쓰기
-   체크버튼 , input에 string, 수정버튼,지우기 버튼
