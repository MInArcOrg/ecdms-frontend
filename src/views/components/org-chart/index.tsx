import { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import StructureCard from './card';

const Obs = (props: any) => {
  const d3Container = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any>(null);
  const [chart, setChart] = useState<any>(null);

  useEffect(() => {
    const initializeChart = async () => {
      const { OrgChart } = await import('d3-org-chart');
      setChart(new OrgChart<any>());
    };

    setData(props.data);

    if (data && d3Container.current) {
      if (!chart) {
        initializeChart();
        return;
      }

      chart
        .container(d3Container.current)
        .data(data)
        .nodeWidth((d: any) => 225)
        .nodeHeight((d: any) => 110)
        .initialZoom(0.7)
        .siblingsMargin((d: any) => 50)
        .childrenMargin((d: any) => 75)
        .neighbourMargin((n1: any, n2: any) => 100)
        .childrenMargin((d: any) => 60)
        .compactMarginBetween((d: any) => 35)
        .compactMarginPair((d: any) => 80)
        .onNodeClick((d: any) => {
          console.log(d, 'Id of clicked node ');
        })
        .nodeContent(function (d: any) {
          return ReactDOMServer.renderToStaticMarkup(<StructureCard d={d} />);
        })
        .render();
    }

    return () => {
      // Cleanup logic if needed
      if (chart) {
        // For example: chart.destroy();
      }
    };
  }, [data, d3Container.current, chart, props.data, props.showAvatar]);

  return <div ref={d3Container} />;
};

export default Obs;
