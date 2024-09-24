import React, { useEffect, useState } from 'react';
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  PieSeries,
  AccumulationDataLabel,
  Inject
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const PatientAccumulationDoughnut = () => {
  const [patientDataPie, setPatientDataPie] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${API_BASE_URL}/yearly-patient-count-by-gender`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const genderData = response.data["2024"] || {};  // Fetch data for 2024, adjust year dynamically if needed
        const transformedData = [
          { x: 'Male', y: genderData.Male || 0, text: `Male: ${genderData.Male || 0}%` },
          { x: 'Female', y: genderData.Female || 0, text: `Female: ${genderData.Female || 0}%` },
          { x: 'Others', y: genderData.Others || 0, text: `Others: ${genderData.Others || 0}%` },
        ];

        setPatientDataPie(transformedData);
        console.log('Patient gender data:', transformedData);
      } catch (error) {
        console.error('Error fetching patient gender data:', error);
      }
    };

    fetchPatientData();
  }, []);

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
            text: 'Gender Wise<br>Patient Statistics<br>This Year',
            hoverTextFormat: '${point.x}<br>${point.y}%',
            textStyle: { fontWeight: '600', size: Browser.isDevice ? '7px' : '15px' }
          }}
          enableSmartLabels={true}
          load={load.bind(this)}
          enableBorderOnMouseMove={false}
          legendSettings={{ visible: false }}
        >
          <Inject services={[PieSeries, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={patientDataPie}
              xName='x'
              yName='y'
              innerRadius='65%'
              border={{ width: 1 }}
              startAngle={Browser.isDevice ? 30 : 62}
              dataLabel={{
                visible: true,
                position: 'Outside',
                name: 'text',
                font: { fontWeight: '600' },
                connectorStyle: { length: '20px', type: 'Curve' }
              }}
              radius={Browser.isDevice ? '40%' : '70%'}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};

export default PatientAccumulationDoughnut;
