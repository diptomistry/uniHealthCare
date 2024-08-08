import * as React from "react";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, DataLabel, Tooltip, Legend
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

import { cardiologyDataYearly, ophthalmologyDataYearly, dentalDataYearly, entDataYearly } from "../../../assets/dashboard";

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const DoctorColumnPlacementYearly = () => {
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
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className=''>
                <ChartComponent id='charts3Yearly' style={{ textAlign: "center" }} load={load.bind(this)}
                    primaryXAxis={{ valueType: 'Category', majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, majorGridLines: { width: 0 } }}
                    primaryYAxis={{ majorTickLines: { width: 0 }, lineStyle: { width: 0 }, title: 'Patient Count' }}
                    chartArea={{ border: { width: 0 } }} enableSideBySidePlacement={false}
                    title='Patient Statistics by Department (Yearly)'
                    tooltip={{ enable: true, shared: true }} width={Browser.isDevice ? '100%' : '100%'} loaded={onChartLoad.bind(this)}>
                    <Inject services={[ColumnSeries, DataLabel, Category, Tooltip, Legend]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={cardiologyDataYearly} xName='x' yName='y' name='Cardiology Department' type='Column' columnWidth={0.6} 
                            marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} />
                        <SeriesDirective dataSource={dentalDataYearly} xName='x' yName='y' name='Dental Department' type='Column' columnWidth={0.6} 
                            marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} />
                        <SeriesDirective dataSource={ophthalmologyDataYearly} xName='x' yName='y' name='Ophthalmology Department' type='Column' columnWidth={0.6} 
                            marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} />
                        <SeriesDirective dataSource={entDataYearly} xName='x' yName='y' name='ENT Department' type='Column' columnWidth={0.6} 
                            marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
        </div>
    );
};

export default DoctorColumnPlacementYearly;
