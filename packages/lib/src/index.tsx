import classNames from 'classnames';
import React, { Component } from 'react';
import { loadScript } from '@jswork/loadkit';
import fde from 'fast-deep-equal';
import type { EChartOption, ECharts } from 'echarts';
import type { EventMittNamespace } from '@jswork/event-mitt';
import { ReactHarmonyEvents } from '@jswork/harmony-events';

// @ts-ignore
import SpinnerSVG from './spinner-1s-200px.svg';

const CLASS_NAME = 'react-echarts';
const SCRIPT_URL = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.0/echarts.min.js';

declare global {
  interface Window {
    echarts: ECharts;
  }
}

export type OnReadyCallback = (params: { chart: ECharts; echarts: any }) => void;

export type ReactEchartsProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * The identity name.
   */
  name?: string;
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * When the chart is ready, the callback will be called.
   * @param chart - The echarts instance.
   * @param echarts - The echarts object.
   */
  onReady?: OnReadyCallback;
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
    name: '@',
  };

  static event: EventMittNamespace.EventMitt;
  static events = ['loadEcharts'];
  private readonly loadOpts: any;
  private harmonyEvents: ReactHarmonyEvents | null = null;
  private rootRef = React.createRef<HTMLDivElement>();
  private echartsInstance: ECharts | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(props: ReactEchartsProps) {
    super(props);
    this.loadOpts = { id: 'ck__echarts' };
  }

  async componentDidMount() {
    const { onReady, initOptions, option } = this.props;
    const { current } = this.rootRef;

    if (!current) {
      console.error('rootRef is not available');
      return;
    }

    this.attacheResizeEvent();

    try {
      const echarts = (await this.loadEcharts()) as any;
      const echartsInstance = echarts.init(current, initOptions);
      echartsInstance.setOption(option!);
      onReady?.({ chart: echartsInstance, echarts });
      this.echartsInstance = echartsInstance;
      this.harmonyEvents = ReactHarmonyEvents.create(this);
    } catch (error) {
      console.error('Failed to initialize ECharts:', error);
    }
  }

  shouldComponentUpdate(nextProps: Readonly<ReactEchartsProps>): boolean {
    const { option } = nextProps;
    const isEqual = fde(option, this.props.option);
    if (isEqual) return false;
    this.echartsInstance?.setOption(option!);
    return true;
  }

  componentWillUnmount() {
    this.echartsInstance?.dispose();
    this.harmonyEvents?.destroy();
    this.resizeObserver?.disconnect();
  }

  attacheResizeEvent = () => {
    const { current } = this.rootRef;
    const { option } = this.props;
    if (!current) return;
    this.resizeObserver = new ResizeObserver(() => {
      this.echartsInstance?.resize(option as any);
    });
    this.resizeObserver.observe(current);
  };

  /* ----- public eventBus methods ----- */

  loadEcharts = () => {
    const { scriptURL } = this.props;
    if (window['echarts']) return Promise.resolve(window['echarts']);
    return new Promise((resolve) => {
      loadScript(scriptURL!, this.loadOpts).then((_) => {
        const echarts = window['echarts'] as any;
        resolve(echarts);
      });
    });
  };

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
