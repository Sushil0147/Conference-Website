import { ResponsiveLine } from "@nivo/line";
const LineChart = ({data}) => {
return (
    <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
    }}
    axisTop={{
        orient: 'top',
        tickSize: 15,
        tickPadding: 5,
        tickRotation: -20,
        legend: '',
        legendOffset: 36,
        truncateTickAt: 0
    }}
    lineWidth={4}
    axisRight={null}
    enableGridX={false}
    axisBottom={{
        tickSize: 15,
        tickPadding: 7,
        tickRotation: 0,
        legend: "Domains",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
    }}
    axisLeft={{
        tickSize: 15,
        tickPadding: 10,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
    }}
    pointSize={10}
    pointColor={{ from: 'color', modifiers: [] }}
    pointBorderWidth={6}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    enableTouchCrosshair={true}
    useMesh={true}
    legends={[
        {
        anchor: "top-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 5,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 25,
        itemOpacity: 0.9,
        symbolSize: 15,
        symbolShape: "square",
        symbolBorderColor: "rgba(0, 0, 0,1)",
        effects: [
            {
            on: "hover",
            style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
            },
            },
        ],
        },
    ]}
    />
);
};
export default LineChart;
