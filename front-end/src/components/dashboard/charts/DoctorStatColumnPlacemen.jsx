import * as React from "react";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, DataLabel, Tooltip, Legend
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

import { cardiologyData,ophthalmologyData,dentalData,entData } from "../../../assets/dashboard";

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
