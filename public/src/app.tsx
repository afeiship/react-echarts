// @ts-ignore
import React, { useEffect, useState } from 'react';
import ReactEcharts from '../../src/main';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default (props: any) => {
  const [instance, setInstance] = useState();
  const option = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };

  useEffect(() => {
    console.log('instance: ', instance);
    window['ins'] = instance;
  }, [instance]);

  return (
    <Container>
      <ReactEcharts
        onReady={(e) => setInstance(e)}
        style={{ width: '100%', height: 500, border: '1px solid blue' }}
        option={option}
      />
    </Container>
  );
};
