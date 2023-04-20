# react-echarts
> Echarts for react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-echarts
```

## usage
1. import css
  ```scss
  @import "~@jswork/react-echarts/dist/style.css";

  // or use sass
  @import "~@jswork/react-echarts/dist/style.scss";

  // customize your styles:
  $react-echarts-options: ()
  ```
2. import js
  ```js
  import React, { useEffect, useState } from 'react';
  import ReactEcharts from '../../src/main';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default () => {
    const [instance, setInstance] = useState<any>();
    const [opt, setOpt] = useState<any>({
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
    });

    const opt2 = {
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
          data: [1, 10, 56, 12, 16, 10]
        }
      ]
    };

    useEffect(() => {
      window['ins'] = instance;
    }, [instance]);

    return (
      <Container>
        <ReactEcharts
          onReady={(e) => setInstance(e)}
          style={{ width: '100%', height: 500, border: '1px solid blue' }}
          option={opt}
        />

        <hr />

        <ReactEcharts
          onReady={(e) => setInstance(e)}
          style={{ width: '100%', height: 200, border: '1px solid red' }}
          option={opt}
        />

        <button
          onClick={() => {
            setOpt(opt2);
            instance.setOption(opt2);
          }}>
          SetNewOption
        </button>
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/react-echarts/

## license
Code released under [the MIT license](https://github.com/afeiship/react-echarts/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-echarts
[version-url]: https://npmjs.org/package/@jswork/react-echarts

[license-image]: https://img.shields.io/npm/l/@jswork/react-echarts
[license-url]: https://github.com/afeiship/react-echarts/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-echarts
[size-url]: https://github.com/afeiship/react-echarts/blob/master/dist/react-echarts.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-echarts
[download-url]: https://www.npmjs.com/package/@jswork/react-echarts
