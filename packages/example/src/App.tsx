import { useEffect, useState } from 'react';
import ReactEcharts from '@jswork/react-echarts';
import './index.css';
import '@jswork/react-echarts/src/style.scss';
import type { ECharts } from 'echarts';

function App() {
  const [instance, setInstance] = useState<ECharts>();
  const [opt, setOpt] = useState({
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {},
    legend: {
      data: ['销量'],
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });

  const opt2 = {
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {},
    legend: {
      data: ['销量'],
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [1, 10, 56, 12, 16, 10],
      },
    ],
  };

  useEffect(() => {
    window['ins'] = instance;
  }, [instance]);

  return (
    <div className="app wp-8 mx-auto mt-8 y-2">
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
          instance!.setOption(opt2);
        }}>
        SetNewOption
      </button>
    </div>
  );
}

export default App;
