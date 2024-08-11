import React from 'react';
import { 
  AccumulationChartComponent, 
  AccumulationSeriesCollectionDirective, 
  AccumulationSeriesDirective, 
  PieSeries, 
  AccumulationDataLabel, 
  Inject 
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

const GenericPieChart = ({ data, title, innerRadius = '65%', showLegend = false }) => {
  const load = (args) => {
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
      .replace(/-dark/i, "Dark")
      .replace(/light/i, "Light")
      .replace(/contrast/i, 'Contrast')
      .replace(/-highContrast/i, 'HighContrast');
  };

  return (
    <div className='control-pane'>
      <div className='control-section'>
        <AccumulationChartComponent
          id="pie-chart"
          centerLabel={{
            text: title,
            hoverTextFormat: '${point.x}<br>${point.y}%',
            textStyle: { fontWeight: '600', size: Browser.isDevice ? '7px' : '15px' }
          }}
          enableSmartLabels={true}
          load={load}
          enableBorderOnMouseMove={false}
          legendSettings={{ visible: showLegend }}
        >
          <Inject services={[PieSeries, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={data}
              xName='x'
              yName='y'
              innerRadius={innerRadius}
              border={{ width: 1 }}
              startAngle={Browser.isDevice ? 30 : 62}
              dataLabel={{
                visible: true,
                position: 'Outside',
                name: 'text',
                font: { fontWeight: '600' },
                connectorStyle: { length: '20px', type: 'Curve' }
              }}
             
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};

export default GenericPieChart;