import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  PieSeries,
  AccumulationDataLabel,
  Inject,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import { top10MedicineSales } from "../../../assets/dashboard"; // Update this path according to your project structure

const TopSellingMedicinesDoughnut = () => {
  const onChartLoad = (args) => {
    document.getElementById("druGpie-chart").setAttribute("title", "");
  };

  const load = (args) => {
    let selectedTheme = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.accumulation.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    )
      .replace(/-dark/i, "Dark")
      .replace(/light/i, "Light")
      .replace(/contrast/i, "Contrast")
      .replace(/-highContrast/i, "HighContrast");
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <AccumulationChartComponent
          id="druGpie-chart"
          centerLabel={{
            text: "Top 10<br>Medicines",
            hoverTextFormat: "${point.x}<br>Dispensed<br>${point.y}",
            textStyle: {
              fontWeight: "600",
              size: Browser.isDevice ? "7px" : "15px",
            },
          }}
          enableSmartLabels={true}
          load={load.bind(this)}
          loaded={onChartLoad.bind(this)}
          enableBorderOnMouseMove={false}
          legendSettings={{ visible: false }}
        >
          <Inject services={[PieSeries, AccumulationDataLabel]} />
          <AccumulationSeriesCollectionDirective>
            <AccumulationSeriesDirective
              dataSource={top10MedicineSales}
              xName="x"
              yName="y"
              innerRadius="65%"
              border={{ width: 1 }}
              startAngle={Browser.isDevice ? 30 : 62}
              dataLabel={{
                visible: true,
                position: "Outside",
                name: "text",
                font: { fontWeight: "600" },
                connectorStyle: { length: "20px", type: "Curve" },
              }}
              radius={Browser.isDevice ? "40%" : "70%"}
            />
          </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
      </div>
    </div>
  );
};

export default TopSellingMedicinesDoughnut;
