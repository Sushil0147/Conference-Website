import { ResponsiveCalendar } from '@nivo/calendar'
    const Calendar = ({data}) => (
        <ResponsiveCalendar
        data={data}
        from="2024-01-01"
        to="2024-12-31"
        emptyColor="#ede8e8"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 23, right: 30, bottom: 10, left: 30 }}
        yearSpacing={40}
        monthSpacing={20}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        // legends={[
        //     {
        //         anchor: 'top-right',
        //         direction: 'row',
        //         translateY: 0,
        //         itemCount: 4,
        //         itemWidth: 42,
        //         itemHeight: 36,
        //         itemsSpacing: 14,
        //         itemDirection: 'right-to-left'
        //     }
        // ]}
    />
    );
    export default Calendar;
