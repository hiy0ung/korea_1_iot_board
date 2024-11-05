import React, { useEffect } from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Container from './layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_LIST_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, REACT_STUDY_PATH, TODO_PATH, USER_PATH } from './constants';
import Main from './views/Main';
import Authentication from './views/Authentication';
import BoardList from './views/board';
import Board from './views/board';
import User from './views/User';
import ReactStudy from './views/ReactStudy';
import Todo from './views/Todo';
import { useCookies } from 'react-cookie';
import UseAuthStore from './stores/auth.store';
import axios from 'axios';

function App() {
  const [cookies, setCookies, removeCookie] = useCookies(['token']);
  const { login, logout } = UseAuthStore();

  //# fucntion #//
  // & fetchUserData 함수: 사용자 데이터를 가져오는 비동기 함수 //
  const fetchUserData = async () => {
    const token = cookies.token;

    if (token) {
      try {
        const response = await axios.get('/api/v1/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

//  const response = await axios.post('url', null, {
//    headers: {
//    Authorization: `Bearer ${token}`
//    }
//  });

        if (response.status === 200) {
          setCookies('token', token, { path: '/'});
          const userData = response.data.data;
          return userData;
        }
      } catch (e) {
        console.error('Failed to fetch user data', e);
        removeCookie('token', { path: '/'});
      }
    }
  }

  //& checkToken 함수: 토큰의 유효성을 확인하는 비동기 함수
  const checkToken = async () => {
    const token = cookies.token;

    if (token) {
      try {
        const userData = await fetchUserData();
        login(userData);

        const expiryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3일 후
        setCookies('token', token, { path: '/', expires: expiryDate});
      } catch (e) {
        console.error('토큰 유효성 확인 중 오류 발생');
        removeCookie('token', { path: '/'});
      }
    }
  }

  //# useEffect: 부수효과 #//
  // 컴포넌트가 처음 랜더링될 때 'checkToken' 함수를 호출하여 토큰 유효성을 확인
  useEffect(() => {
    checkToken();
  }, []);


  return (
    <>
      {/* 빈 Fragment: 최상위 단일 노드를 위한 틀 */}
      <Routes>
        <Route element={<Container />}>
          {/* 
          Route 컴포넌트의 index 속성 
          : 상위 컴포넌트의 경로로 출력 (기본 자식 라우트)
          */}
          {/* <Route path={MAIN_PATH} element={<Main />} /> */}

          {/* 로그인 + 회원가입 화면 */}
          <Route path={AUTH_PATH} element={<Authentication />} />

          {/* 게시물 리스트 화면 */}
          <Route path={BOARD_LIST_PATH} element={<BoardList />} />

          {/* 게시물 상세 보기 화면 */}
          <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<Board />} />

          {/* 게시글 작성 화면 */}
          <Route path={BOARD_WRITE_PATH} element={<Board />} />

          {/* 게시글 수정 화면 */}
          <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<Board />} />

          {/* 마이페이지 */}
          <Route path={USER_PATH} element={<User />} />

          {/* 리액트 학습 */}
          <Route path={REACT_STUDY_PATH} element={<ReactStudy />} />

          {/* todos 연결 */}
          <Route path={TODO_PATH} element={<Todo />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;