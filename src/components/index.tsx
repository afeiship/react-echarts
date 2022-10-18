import classNames from 'classnames';
import React, { Component } from 'react';
import { loadScript } from '@jswork/loadkit';
import { EChartsOption } from 'echarts';

const CLASS_NAME = 'react-echarts';

declare global {
  interface Window {
    echarts: any;
  }
}

export type ReactEchartsProps = {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * When the chart is ready, the callback will be called.
   * @param inEchartsInstance
   */
  onInit: (inEchartsInstance: any) => void;
  /**
   * The echarts options.
   */
  option: EChartsOption
};

export default class ReactEcharts extends Component<ReactEchartsProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {};

  private rootRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const { onInit, option } = this.props;
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.0/echarts.min.js', { id: 'echarts' }).then(e => {
      const echarts = window['echarts'];
      const echartsInstance = echarts.init(this.rootRef.current);
      echartsInstance.setOption(option);

      onInit(echartsInstance);
    });
  }

  render() {
    const { className, ...props } = this.props;
    return (
      <div
        ref={this.rootRef}
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        {...props} />
    );
  }
}
