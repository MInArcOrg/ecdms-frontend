import { useEffect, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import StructureCard from './card'

interface ObsProps {
  data: any
  showAvatar: boolean
}

const Obs = ({ data, showAvatar }: ObsProps) => {
  const d3Container = useRef<HTMLDivElement | null>(null)
  const [chart, setChart] = useState<any>(null)

  // Dynamically import OrgChart once
  const initializeChart = async () => {
    const { OrgChart } = await import('d3-org-chart')
    setChart(new OrgChart())
  }

  // Initialize data and render chart
  useEffect(() => {
    if (!data) return
    if (!chart) {
      initializeChart()
      return
    }

    if (d3Container.current) {
      chart
        .container(d3Container.current)
        .data(data)
        .nodeWidth(() => 225)
        .nodeHeight(() => 110)
        .initialZoom(0.7)
        .siblingsMargin(() => 50)
        .childrenMargin(() => 60)
        .compactMarginBetween(() => 35)
        .compactMarginPair(() => 80)
        .onNodeClick((d: any) => console.log('Clicked node:', d))
        .nodeContent((d: any) =>
          ReactDOMServer.renderToStaticMarkup(
            <StructureCard d={d} showAvatar={showAvatar} />
          )
        )
        .render()
    }
  }, [data, chart])

  return <div ref={d3Container} />
}

export default Obs
