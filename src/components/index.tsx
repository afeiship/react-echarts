import noop from '@jswork/noop';
import classNames from 'classnames';
import React, { Component } from 'react';
import { loadScript } from '@jswork/loadkit';
import { EChartsOption, ECharts } from 'echarts';

const CLASS_NAME = 'react-echarts';

declare global {
  interface Window {
    echarts: ECharts;
  }
}

export type ReactEchartsProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * When the chart is ready, the callback will be called.
   * @param inEchartsInstance
   */
  onReady?: (inEchartsInstance: ECharts) => void;
  /**
   * Echarts init options.
   */
  initOptions?: any;
  /**
   * The echarts options.
   */
  option?: EChartsOption;
};

export default class ReactEcharts extends Component<ReactEchartsProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    onReady: noop,
    initOptions: {},
    option: {}
  };

  private rootRef = React.createRef<HTMLDivElement>();
  private echartsInstance;

  componentDidMount() {
    const { onReady, initOptions, option } = this.props;
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.0/echarts.min.js', {
      id: 'echarts'
    }).then((_) => {
      const echarts = window['echarts'];
      const echartsInstance = echarts.init(this.rootRef.current!, initOptions);
      onReady!(echartsInstance);
      echartsInstance.setOption(option!);
      this.echartsInstance = echartsInstance;
    });
  }

  shouldComponentUpdate(nextProps: Readonly<ReactEchartsProps>): boolean {
    const { option } = nextProps;
    if (this.props.option !== option) this.echartsInstance.setOption(option);
    return true;
  }

  render() {
    const { className, option, initOptions, onReady, ...props } = this.props;
    return (
      <div
        ref={this.rootRef}
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        {...props}
      />
    );
  }
}
