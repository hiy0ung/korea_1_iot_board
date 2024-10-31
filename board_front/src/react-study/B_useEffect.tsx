import React, { useEffect, useState } from 'react'

/*
! useEffect
1. 함수형 컴포넌트 (내에서)
2. 렌더링될 때와 특정 상태가 변경될 때 실행되는 부수효과 처리
3. Hook

cf) 컴포넌트가 생성될 때 (마운트)
    , 컴포넌트가 제거될 때 (언마운트)
    , 특정 상태나 props가 변경될 때 호출

- 데이터 가져오기(Fetching Data), 타이머 설정, 이벤트 리스너 등록 등에 사용

! useEffect 사용법
- 첫 번째 인자: 부수효과
- 두 번재 인자: 의존성 배열(deps - dependencies)

useEffect(() => {
  - 부수 효과 코드를 작성
  
  return () => {
    - 정리(clean-up) 코드
    - 언마운트 시 실행
  };
}, [의존성 배열을 작성]); 

cf) 의존성 배열
  : 빈 배열 - 컴포넌트가 마운트될 때 한 번만 실행 >> 딱 한 번만 실행 (필터링 X)
  : 값이 있는 배열 - 해당 값이 변경될 때마다 실행 (여러 개 가능) 
*/

export default function B_useEffect() {
  
  const [count, setCount] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    // 타이머 효과를 구현
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000); // 1000밀리초(1초)에 한 번씩 첫 번째 인자의 함수 실행
    }

    return () => clearInterval(interval);
  }, [isRunning]);
  
  const handleButtonClick = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  }

  return (
    <div>
      <p>Timer: {count} seconds</p>
      <button onClick={handleButtonClick}>
        {/* 실행 중이면 'Stop'버튼, 실행 중이 아니면 'Start'버튼 */}
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}