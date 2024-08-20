import classNames from 'classnames';
import React, { Component } from 'react';
import { loadScript } from '@jswork/loadkit';
import type { EChartOption, ECharts } from 'echarts';

// @ts-ignore
import SpinnerSVG from './spinner-1s-200px.svg';

const CLASS_NAME = 'react-echarts';
const SCRIPT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.0/echarts.min.js';

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
  initOptions?: {
    devicePixelRatio?: number;
    renderer?: string;
    width?: number | string;
    height?: number | string;
  };
  /**
   * The echarts options.
   */
  option?: EChartOption;
  /**
   * Main echarts script URL.
   */
  scriptURL?: string;
};

export default class ReactEcharts extends Component<ReactEchartsProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    initOptions: {},
    option: {},
    scriptURL: SCRIPT_URL,
  };

  private rootRef = React.createRef<HTMLDivElement>();
  private echartsInstance: ECharts | null = null;
  private readonly loadOpts: any;

  constructor(props: ReactEchartsProps) {
    super(props);
    this.loadOpts = { id: 'ck__echarts' };
  }

  loadEcharts = () => {
    const { scriptURL } = this.props;
    const ecScripts = document.querySelectorAll('script[src="' + scriptURL + '"]');
    if (ecScripts.length > 0) return Promise.resolve(window['echarts']);
    return new Promise((resolve) => {
      loadScript(scriptURL!, this.loadOpts).then((_) => {
        const echarts = window['echarts'] as any;
        resolve(echarts);
      });
    });
  };

  async componentDidMount() {
    const { onReady, initOptions, option } = this.props;
    const echarts = await this.loadEcharts() as any;
    const echartsInstance = echarts.init(this.rootRef.current!, initOptions);
    echartsInstance.setOption(option!);
    onReady?.(echartsInstance);
    this.echartsInstance = echartsInstance;
  }

  shouldComponentUpdate(nextProps: Readonly<ReactEchartsProps>): boolean {
    const { option } = nextProps;
    if (option !== this.props.option) {
      this.echartsInstance?.setOption(option!);
    }
    return true;
  }

  componentWillUnmount() {
    this.echartsInstance?.dispose();
  }

  render() {
    const { className, option, initOptions, onReady, scriptURL, ...props } = this.props;
    return (
      <div
        ref={this.rootRef}
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        {...props}>
        <figure className={`${CLASS_NAME}__spinner`}>
          <img src={SpinnerSVG} alt="loading" role="presentation" aria-hidden="true" />
        </figure>
      </div>
    );
  }
}
