import { ResponsiveBar } from "@nivo/bar";
const BarChartGrp = ({ data  }) => (
  <ResponsiveBar
    data={data}
    keys={['Inprogress','Published','Rejected']}
    indexBy="Domain"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={["#fee08b","#148158","#ff6347"]}
    groupMode="grouped"
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    defs={[
      {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true
      },
      {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
      }
  ]}
  fill={[
      {
          match: {
              id: 'Inprogress'
          },
          id: 'dots'
      }
  ]}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 10,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Different Domains",
      legendPosition: "middle",
      legendOffset: 35,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Number of Papers",
      legendPosition: "middle",
      legendOffset: -40,
      truncateTickAt: 0,
    }}
    enableGridX={false}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 2.5]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "top-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 10,
        itemsSpacing: 5,
        itemWidth: 100,
        itemHeight: 25,
        itemDirection: "left-to-right",
        itemOpacity: 0.9,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              symbolSize: 25,
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Domain wise data"
    barAriaLabel={(e) =>
      e.id + ": " + e.formattedValue + "in Domain" + e.indexValue
    }
  />
);
export default BarChartGrp;
