import React,{useState,useEffect} from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Tooltip,
  DateTime,
  SplineAreaSeries,
  Legend,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";
//import { yearlyPatientData } from "../../../assets/dashboard";
const yearlyPatientData = [
  { x: new Date(2018, 0, 1), y: 200 },
  { x: new Date(2019, 0, 1), y: 400 },
  { x: new Date(2020, 0, 1), y: 350 },
  { x: new Date(2021, 0, 1), y: 450 },
  { x: new Date(2022, 0, 1), y: 500 },
  { x: new Date(2023, 0, 1), y: 550 },
];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const PatientGraphSplineAreaByYear = () => {
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchYearlyPatientData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_BASE_URL}/yearly-patient-count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Transform the API response into the required format
        const data = Object.keys(response.data).map((year) => ({
          x: new Date(year, 0, 1), // Set the correct year
          y: response.data[year],  // Corresponding patient count
        }));

        setYearlyData(data);
      } catch (error) {
        console.error("Error fetching yearly patient data:", error);
      }
    };

    fetchYearlyPatientData();
  }, []);
  const onChartLoad = (args) => {
    let chart = document.getElementById("Yearlycharts");
    chart.setAttribute("title", "");
  };

  const load = (args) => {
    let selectedTheme = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.chart.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    )
      .replace(/-dark/i, "Dark")
      .replace(/contrast/i, "Contrast")
      .replace(/-highContrast/i, "HighContrast");
  };

  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <ChartComponent
          id="Yearlycharts"
          style={{ textAlign: "center" }}
          primaryXAxis={{
            valueType: "DateTime",
            labelFormat: "yyyy",
            majorGridLines: { width: 0 },
            intervalType: "Years",
            edgeLabelPlacement: "Shift",
          }}
          primaryYAxis={{
            labelFormat: "{value}",
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
          }}
          load={load.bind(this)}
          width={Browser.isDevice ? "100%" : "90%"}
          legendSettings={{ enableHighlight: true }}
          chartArea={{ border: { width: 0 } }}
          title="Patient Statistics by Year"
          loaded={onChartLoad.bind(this)}
          tooltip={{ enable: true }}
        >
          <Inject
            services={[SplineAreaSeries, DateTime, Tooltip, Legend]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={yearlyData}
              xName="x"
              yName="y"
              name="Patients"
              marker={{
                visible: true,
                isFilled: true,
                height: 6,
                width: 6,
                shape: "Circle",
              }}
              opacity={0.5}
              type="SplineArea"
              width={2}
              border={{ width: 2 }}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default PatientGraphSplineAreaByYear;
