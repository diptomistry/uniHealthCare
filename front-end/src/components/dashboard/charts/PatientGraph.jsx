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
//import { PatientData } from "../../../assets/dashboard";

let PatientData = [
  { x: new Date(2023, 0, 1), y: 120 }, // January
  { x: new Date(2023, 1, 1), y: 160 }, // February
  { x: new Date(2023, 2, 1), y: 170 }, // March
  { x: new Date(2023, 3, 1), y: 130 }, // April
  { x: new Date(2023, 4, 1), y: 180 }, // May
  { x: new Date(2023, 5, 1), y: 160 }, // June
  { x: new Date(2023, 6, 1), y: 190 }, // July
  { x: new Date(2023, 7, 1), y: 210 }, // August
  { x: new Date(2023, 8, 1), y: 170 }, // September
  { x: new Date(2023, 9, 1), y: 200 }, // October
  { x: new Date(2023, 10, 1), y: 220 }, // November
  { x: new Date(2023, 11, 1), y: 230 }, // December
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const PatientGraphSplineArea = () => {
  const onChartLoad = (args) => {
    let chart = document.getElementById("charts");
    chart.setAttribute("title", "");
  };
  const [patientData, setPatientData] = useState([]);
  
  useEffect(() => {
    const fetchPatientData = async () => {
      const token = localStorage.getItem("token");
      const currentYear = new Date().getFullYear();
      try {
        const response = await axios.get(
          `${API_BASE_URL}/monthly-patient-count?year=${currentYear}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Transform API response into the format expected by Syncfusion chart
        const data = Object.keys(response.data).map((month) => ({
          x: new Date(currentYear, month - 1, 1), // Set the correct month index
          y: response.data[month],
        }));

        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, []);

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
          id="charts2"
          style={{ textAlign: "center" }}
          primaryXAxis={{
            valueType: "DateTime",
            labelFormat: "MMM",
            majorGridLines: { width: 0 },
            intervalType: "Months",
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
          title="Patient Statistics for 2023"
          loaded={onChartLoad.bind(this)}
          tooltip={{ enable: true }}
        >
          <Inject
            services={[SplineAreaSeries, DateTime, Tooltip, Legend]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={patientData}
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

export default PatientGraphSplineArea;
