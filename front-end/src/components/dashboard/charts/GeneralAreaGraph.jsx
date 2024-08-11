import React from "react";

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



const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const GeneralAreaGraph = ({ PatientData,title }) => {
  const onChartLoad = (args) => {
    let chart = document.getElementById("Generalcharts");
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
          id="Generalcharts"
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
          title={title}
          loaded={onChartLoad.bind(this)}
          tooltip={{ enable: true }}
        >
          <Inject
            services={[SplineAreaSeries, DateTime, Tooltip, Legend]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={PatientData}
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

export default  GeneralAreaGraph;
