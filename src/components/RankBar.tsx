import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const RankBarS = styled.div`
  margin-top: 2px;
  width: 0;
  height: 6px;
  background-color: #ffda44;
  border-radius: 3px;
`;


function RankBar(props: { barWidth: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    barRef.current!.style.width =  props.barWidth + '%';
  }, []);
  return (
    <RankBarS className="rank-bar" ref={barRef}/>
  );
}

export {RankBar};