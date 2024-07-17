import * as React from "react";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, DataLabel, Tooltip, Legend
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

// Sample data for patients checked by doctors in different departments for each month
export let cardiologyData = [
    { x: 'Jan', y: 30 }, { x: 'Feb', y: 25 }, { x: 'Mar', y: 35 }, { x: 'Apr', y: 40 }, { x: 'May', y: 45 },
    { x: 'Jun', y: 50 }, { x: 'Jul', y: 55 }, { x: 'Aug', y: 60 }, { x: 'Sep', y: 65 }, { x: 'Oct', y: 70 },
    { x: 'Nov', y: 75 }, { x: 'Dec', y: 80 }
];

export let dentalData = [
    { x: 'Jan', y: 20 }, { x: 'Feb', y: 22 }, { x: 'Mar', y: 24 }, { x: 'Apr', y: 26 }, { x: 'May', y: 28 },
    { x: 'Jun', y: 30 }, { x: 'Jul', y: 32 }, { x: 'Aug', y: 34 }, { x: 'Sep', y: 36 }, { x: 'Oct', y: 38 },
    { x: 'Nov', y: 40 }, { x: 'Dec', y: 42 }
];

export let ophthalmologyData = [
    { x: 'Jan', y: 15 }, { x: 'Feb', y: 18 }, { x: 'Mar', y: 20 }, { x: 'Apr', y: 22 }, { x: 'May', y: 24 },
    { x: 'Jun', y: 26 }, { x: 'Jul', y: 28 }, { x: 'Aug', y: 30 }, { x: 'Sep', y: 32 }, { x: 'Oct', y: 34 },
    { x: 'Nov', y: 36 }, { x: 'Dec', y: 38 }
];

export let entData = [
    { x: 'Jan', y: 10 }, { x: 'Feb', y: 12 }, { x: 'Mar', y: 14 }, { x: 'Apr', y: 16 }, { x: 'May', y: 18 },
    { x: 'Jun', y: 20 }, { x: 'Jul', y: 22 }, { x: 'Aug', y: 24 }, { x: 'Sep', y: 26 }, { x: 'Oct', y: 28 },
    { x: 'Nov', y: 30 }, { x: 'Dec', y: 32 }
];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const DoctorColumnPlacement = () => {
    const onChartLoad = (args) => {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };

    const load = (args) => {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
            .replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };

    return (
        <div className='control-pane '>
            <style>{SAMPLE_CSS}</style>
            <div className=''>
                <ChartComponent id='charts3' style={{ textAlign: "center" }} load={load.bind(this)}
                    primaryXAxis={{ valueType: 'Category', majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, majorGridLines: { width: 0 } }}
                    primaryYAxis={{ majorTickLines: { width: 0 }, lineStyle: { width: 0 }, title: 'রোগীর সংখ্যা' }}
                    chartArea={{ border: { width: 0 } }} enableSideBySidePlacement={false}
                    title='বিভাগ অনুযায়ী রোগী পরিসংখ্যান (জানুয়ারি - ডিসেম্বর)'
                    tooltip={{ enable: true, shared: true }} width={Browser.isDevice ? '100%' : '75%'} loaded={onChartLoad.bind(this)}>
                    <Inject services={[ColumnSeries, DataLabel, Category, Tooltip, Legend]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={cardiologyData} xName='x' yName='y' name='কার্ডিওলজি বিভাগ' type='Column' columnWidth={0.6} 
                            marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} />
                        <SeriesDirective dataSource={dentalData} xName='x' yName='y' name='দন্ত বিভাগ' type='Column' columnWidth={0.6} 
                            marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} />
                        <SeriesDirective dataSource={ophthalmologyData} xName='x' yName='y' name='চক্ষু বিভাগ' type='Column' columnWidth={0.6} 
                            marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} />
                        <SeriesDirective dataSource={entData} xName='x' yName='y' name='নাক, কান, গলা বিভাগ' type='Column' columnWidth={0.6} 
                            marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
        </div>
    );
};

export default DoctorColumnPlacement;
