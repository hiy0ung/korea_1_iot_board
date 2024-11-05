import React from 'react'
import UseState from '../../react-study/A_useState';
import UseEffect from '../../react-study/B_useEffect';
import StateEffect from '../../react-study/C_StateEffect';
import Zustand from '../../react-study/E_zustand';
import ZustandRender from '../../react-study/E_zustand_render';
import Emotion from '../../react-study/G_Emotion';
import Emotion2 from '../../react-study/H_Emotion2';

import Exam from '../../react-study/z_exam';

export default function ReactStudy() {
  return (
    <>
      <h2>UseState: 상태관리</h2>
      <UseState />

      <h2>UseEffect: 부수효과</h2>
      <UseEffect />
      
      <h2>State & Effect: Menu 검색 구현</h2>
      <StateEffect />

      <h2>zustand: 전역 상태 관리</h2>
      <Zustand />
      {/* 전역 상태 관리가 되는지 확인하기 위해서 함수형 컴포넌트 2개 생성 */}
      <ZustandRender /> 

      <h2>Emotion: 스타일 라이브러리 관리</h2>
      <Emotion /> 
      <Emotion2 /> 

      <h2>연습용 book 구현</h2>
      <Exam />
    </>
  )
}