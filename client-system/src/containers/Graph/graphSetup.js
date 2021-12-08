import { create_chart_marks } from "../../utils/helpers/create_chart_marks";

export default function graphSetup(anychart, data, events, chartId) {
  let output = {};

  // LICENSE KEY
  anychart.licenseKey("coffeeandtrading.com-1919be8e-1f3aa183");
  anychart.format.inputDateTimeFormat("dd-MM-yyyy HH:mm");

  // CREATE DATA TYPE "TABLE"
  let dataTable = anychart.data.table("date");

  // LOAD DATA
  dataTable.addData(data);

  // MAP LOADED DATA FOR OHLC SERIES
  let mapping = dataTable.mapAs({
    open: "open",
    high: "high",
    low: "low",
    close: "close"
  });

  // CREATE STOCK CHART
  let chart = anychart.stock();

  // set the series
  let series = chart.plot(0).candlestick(mapping);
  series.name("Coffeeand Trading stock prices");
  series.fallingFill("#FF0000");
  series.risingFill("#438bf0");

  // DISABLE CREDITS
  let credits = chart.credits();
  credits.enabled(false);

  // adjust scroller
  chart.scroller().selectedFill("#cecece 2.5");

  // CREATE THE FIRST PLOT ON THE CHART
  let plot = chart.plot(0);

  // format axis labels
  let xAxisLabels = plot.xAxis().labels();
  let xAxisMinorLabels = plot.xAxis().minorLabels();
  let yAxisLabels = plot.yAxis().labels();

  yAxisLabels.useHtml(true);
  xAxisLabels.useHtml(true);
  xAxisMinorLabels.useHtml(true);

  chart
    .crosshair()
    .yLabel()
    .format("{%tickValue}{decimalsCount:5, zeroFillDecimals: true}");

  yAxisLabels.format(
    "<b style='color:black; font-size:12px'>{%tickValue}{decimalsCount:5, zeroFillDecimals: true}</b>"
  );

  // price indicator
  let indicator = plot.priceIndicator();
  indicator.value("last-visible");
  indicator.stroke("Blue");
  indicator
    .label()
    .background()
    .fill("blue");

  // create event marks
  create_chart_marks({ plot, events });

  // crosshair float mode
  chart.crosshair().displayMode("float");

  //  map the averages
  var mapping2 = dataTable.mapAs({
    value: "avgBlack"
  });
  var mapping3 = dataTable.mapAs({
    value: "avgBlue"
  });
  var mapping4 = dataTable.mapAs({
    value: "avgBrown"
  });
  var mapping5 = dataTable.mapAs({
    value: "avgOrange"
  });
  var mapping6 = dataTable.mapAs({
    value: "avgPurple"
  });

  var series2 = chart
    .plot(0)
    .sma(mapping2, 1)
    .series();
  series2.name("avgBlack");
  series2.stroke("4 black");

  // format indicator series tooltip
  series2.tooltip().format("{%seriesName}: {%value}{decimalsCount:8}");

  var series3 = chart
    .plot(0)
    .sma(mapping3, 1)
    .series();
  series3.name("avgBlue");
  series3.stroke("4 #0000FF");
  // format indicator series tooltip
  series3.tooltip().format("{%seriesName}: {%value}{decimalsCount:8}");

  var series4 = chart
    .plot(0)
    .sma(mapping4, 1)
    .series();
  series4.name("avgBrown");
  series4.stroke("4 #804040");
  // format indicator series tooltip
  series4.tooltip().format("{%seriesName}: {%value}{decimalsCount:8}");

  var series5 = chart
    .plot(0)
    .sma(mapping5, 1)
    .series();
  series5.name("avgOrange");
  series5.stroke("4 #FF8000");
  // format indicator series tooltip
  series5.tooltip().format("{%seriesName}: {%value}{decimalsCount:8}");
  var series6 = chart
    .plot(0)
    .sma(mapping6, 1)
    .series();
  series6.name("avgPurple");
  series6.stroke("4 #8000FF");
  // format indicator series tooltip
  series6.tooltip().format("{%seriesName}: {%value}{decimalsCount:8}");

  // set the yAxis of the chart to the right
  chart
    .plot(0)
    .yAxis()
    .orientation("right");

  // set padding - up, right, bottom, left
  chart.padding(5, 70, 0, 0);

  // set container id
  const id = chartId || "ac-chart-container";

  chart.container(id);

  output = {
    chart,
    mapping,
    dataTable
  };

  return output;
}
