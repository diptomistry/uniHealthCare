import React,{useState,useEffect} from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  DataLabel,
  Tooltip,
  Legend,
} from "@syncfusion/ej2-react-charts";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";
const roles = ["admin","student", "dispensary_officer", "doctor", "section_officer", "senior_officer", "teacher"];
import { patientDataByYear } from "../../../assets/dashboard";

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const PatientPercentageByCategory = () => {
  const patientDataByYear = [
    { x: "2019", students: 40, teachers: 30, others: 30 },
    { x: "2020", students: 35, teachers: 35, others: 30 },
    { x: "2021", students: 45, teachers: 25, others: 30 },
    { x: "2022", students: 50, teachers: 20, others: 30 },
    { x: "2023", students: 55, teachers: 25, others: 20 },
  ];
  const [patientDataByYearFinal, setPatientDataByYearFinal] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_BASE_URL}/yearly-patient-count-by-role`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Transform API data to fit into the "student", "teacher", and "others" format
        const transformedData = Object.keys(response.data).map((year) => {
          let yearData = { x: year, students: 0, teachers: 0, others: 0 };

          // Count students, teachers, and others
          roles.forEach((role) => {
            if (role === "student") {
              yearData["students"] = response.data[year][role] || 0;
            } else if (role === "teacher") {
              yearData["teachers"] = response.data[year][role] || 0;
            } else {
              yearData["others"] += response.data[year][role] || 0;
            }
          });

          return yearData;
        });

        setPatientDataByYearFinal(transformedData);
        console.log("Transformed Patient data by year:", transformedData);
      } catch (error) {
        console.error("Error fetching patient data by category:", error);
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
    <div className="control-pane ">
      <style>{SAMPLE_CSS}</style>
      <div className="">
        <ChartComponent
          id="PatientByChatagoryCharts"
          style={{ textAlign: "center" }}
          load={load.bind(this)}
          primaryXAxis={{
            valueType: "Category",
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            interval: 1,
            majorGridLines: { width: 0 },
          }}
          primaryYAxis={{
            labelFormat: "{value}%",
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            title: "Patient Percentage",
          }}
          chartArea={{ border: { width: 0 } }}
          enableSideBySidePlacement={false}
          title="Patient Percentage by Category (2019 - 2023)"
          tooltip={{ enable: true, shared: true }}
          ///width={Browser.isDevice ? "100%" : "100%"}
          ///loaded={onChartLoad.bind(this)}
        >
          <Inject
            services={[ColumnSeries, DataLabel, Category, Tooltip, Legend]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={patientDataByYearFinal}
              xName="x"
              yName="students"
              name="Students"
              type="Column"
              columnWidth={0.3}
              marker={{
                dataLabel: {
                  visible: true,
                  position: "Top",
                  font: { fontWeight: "600", color: "#ffffff" },
                },
              }}
            />
            <SeriesDirective
              dataSource={patientDataByYearFinal}
              xName="x"
              yName="teachers"
              name="Teachers"
              type="Column"
              columnWidth={0.3}
              marker={{
                dataLabel: {
                  visible: true,
                  position: "Top",
                  font: { fontWeight: "600", color: "#ffffff" },
                },
              }}
            />
            <SeriesDirective
              dataSource={patientDataByYearFinal}
              xName="x"
              yName="others"
              name="Others"
              type="Column"
              columnWidth={0.3}
              marker={{
                dataLabel: {
                  visible: true,
                  position: "Top",
                  font: { fontWeight: "600", color: "#ffffff" },
                },
              }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default PatientPercentageByCategory;
