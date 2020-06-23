import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {Icon} from './Icon';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 16px;
  color:#666;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .nodata-icon{
     margin-bottom: 8px;
     width: 100px;
     height: 100px;
     vertical-align: -0.15em;
     fill: #666;
     overflow: hidden;
  }
`;


function NoData(props: { show: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!props.show) {
      wrapperRef.current!.style.display = 'none';
    } else {
      wrapperRef.current!.style.display = 'flex';
    }
  }, [props.show]);
  return (
    <Wrapper ref={wrapperRef}>
      <Icon name='nodata' className='nodata-icon'/>
      暂时没有记录，去记点什么吧
    </Wrapper>
  );
}

export {NoData};