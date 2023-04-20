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
  import React from 'react';
  import ReactEcharts from '@jswork/react-echarts';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default (props: any) => {
    return (
      <Container>
        <ReactEcharts />
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
