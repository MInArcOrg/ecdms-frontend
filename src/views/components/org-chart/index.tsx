import { useEffect, useRef, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import StructureCard from './card';

const Obs = (props: any) => {
  const d3Container = useRef<HTMLDivElement>(null);
  console.log('parent node id', props.data?.map((item: any) => ({ ...item, parentNodeId: item?.parent_node_id })));
  const [data, setData] = useState<any>(props.data?.map((item: any) => ({ ...item, parentNodeId: item?.parent_node_id })));
  const [chart, setChart] = useState<any>(null);

  useEffect(() => {
    const initializeChart = async () => {
      const { OrgChart } = await import('d3-org-chart');
      setChart(new OrgChart<any>());
    };

    setData(props.data?.map((item: any) => ({ ...item, parentNodeId: item?.parent_node_id })));

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
  }, [
    data,
    d3Container.current,
    chart,
    props.data?.map((item: any) => ({ ...item, parentNodeId: item?.parent_node_id })),
    props.showAvatar
  ]);

  return <div ref={d3Container} />;
};

export default Obs;
