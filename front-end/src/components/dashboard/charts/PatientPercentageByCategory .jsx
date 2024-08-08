import React from "react";
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

import { patientDataByYear } from "../../../assets/dashboard";

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const PatientPercentageByCategory = () => {
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
              dataSource={patientDataByYear}
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
              dataSource={patientDataByYear}
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
              dataSource={patientDataByYear}
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
