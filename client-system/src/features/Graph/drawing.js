import moment from "moment";
import dateformat from "dateformat";

// draw a ling
export function drawLine(chart) {
  chart
    .plot(0)
    .annotations()
    .startDrawing("line-segment")
    .stroke("grey", 2)
    .allowEdit(true);
}

// scrolling event
export function handleWheel(e, chart, mapping, firstCandle) {
  mapping.createSelectable();
  var xScale = null;
  var min = null;
  var max = null;
  var gap = null;
  var delta = null;

  xScale = chart.xScale();
  max = xScale.getMaximum();
  min = xScale.getMinimum();
  gap = max - min;
  delta = (gap * e.deltaY) / 2000;

  if (
    min + delta > xScale.getFullMinimum() &&
    max + delta < xScale.getFullMaximum()
  ) {
    chart.selectRange(min + delta, max + delta);
  }
}

// other drawing option from anychart
export function otherDrawing(type, chart) {
  chart
    .plot(0)
    .annotations()
    .startDrawing(type)
    .allowEdit(true);
}

// draw cross
export function drawCross(chart) {
  chart
    .plot(0)
    .annotations()
    .startDrawing("line-segment")
    .stroke("grey", 2);

  chart.listen("annotationDrawingFinish", doCross);

  function doCross(event) {
    const anno = event.annotation;
    // general settings
    const plot = chart.plot(0);
    let controller = plot.annotations();

    // values
    var value1 = anno.valueAnchor();
    var value2 = anno.secondValueAnchor();

    let ms = Math.abs(anno.secondXAnchor() - anno.xAnchor());

    ms = 1000 * Math.round(ms / 1000); // round to nearest second
    var d = new Date(ms);

    let minutesPassed = d.getUTCMinutes();
    let currPriceSecondValue = value2.toFixed(2);
    let pipsesDiff = Math.floor(Math.abs(value2 - value1).toFixed(2) / 0.1);
    let tooltip = `${minutesPassed}/${pipsesDiff}/${currPriceSecondValue}`;

    controller.label({
      text: tooltip,
      xAnchor: anno.secondXAnchor(),
      valueAnchor: anno.secondValueAnchor()
    });

    // clean up
    chart.unlisten("annotationDrawingFinish", doCross);
  }
}

// draw angle
export function drawAngle(chart) {
  chart
    .plot(0)
    .annotations()
    .startDrawing("line-segment")
    .stroke("grey", 2);

  chart.listen("annotationDrawingFinish", doAngle);

  function doAngle(event) {
    const anno = event.annotation;
    var plotWidth = chart.plot(0).getPixelBounds().width;
    var axisHeight = chart
      .plot(0)
      .yAxis()
      .getPixelBounds().height;

    var ratioX1 = chart.xScale().transform(anno.xAnchor());

    var ratioX2 = chart.xScale().transform(anno.secondXAnchor());
    var ratioY1 = chart
      .plot(0)
      .yScale()
      .transform(anno.valueAnchor());

    var ratioY2 = chart
      .plot(0)
      .yScale()
      .transform(anno.secondValueAnchor());

    var x1 = ratioX1 * plotWidth;
    var x2 = ratioX2 * plotWidth;
    var y1 = ratioY1 * axisHeight;
    var y2 = ratioY2 * axisHeight;

    var angle = (Math.atan((y2 - y1) / (x2 - x1)) * 180) / Math.PI;

    chart
      .plot(0)
      .annotations()
      .label({
        text: angle.toFixed(2),
        xAnchor: anno.secondXAnchor(),
        valueAnchor: anno.secondValueAnchor()
      });

    // clean up
    chart.unlisten("annotationDrawingFinish", doAngle);
  }
}

// remove selected drawing
export function removeSelected(chart) {
  const plot = chart.plot(0);

  // get the selected annotation
  var selectedAnnotation = plot.annotations().getSelectedAnnotation();

  // remove the selected annotation
  plot.annotations().removeAnnotation(selectedAnnotation);

  // clean up
  chart.unlisten("annotationDrawingFinish");
}

// change the graph range view
export function changeGraphRange(chart, actionType, chartType, event) {
  switch (actionType) {
    case "R":
      // return the scrollbar to the last date point
      //todo by time by chart type
      switch (chartType) {
        case "minCandle":
        case "fiveMinuteCandle":
        case "fifteenMinuteCandle":
          chart.selectRange("minute", 100, "last-date");
          break;
        case "hourCandle":
          chart.selectRange("hour", 100, "last-date");
          break;
        case "dayCandle":
          chart.selectRange("day", 100, "last-date");
          break;

        default:
          break;
      }

      break;
    case "event":
      // bring the scrollbar to the event date
      const dates = convertToUtcType(event, chartType);
      chart.selectRange(dates.beforeUTC, dates.afterUTC);

      break;

    default:
      break;
  }
}

// remove all drawing annotations
export function removeAll(chart) {
  chart
    .plot(0)
    .annotations()
    .removeAllAnnotations();

  // clean up
  chart.unlisten("annotationDrawingFinish");
}

export function loadPreviousCandle(chart) {
  chart.listen("selectedRangeChange", function(e) {
    if (e.firstKey === e.firstSelected) {
      // out of service at the moment
    }
  });
}

function convertToValidDate(date) {
  const partA = `${date.slice(0, 2)}`;
  const partB = `${date.slice(3, 5)}`;

  const newDate = date.replace(partB, partA);
  const newDate2 = newDate.replace(partA, partB);

  return newDate2;
}

function convertToUtcType(event, chartType) {
  const validDateString = convertToValidDate(`${event.date} ${event.time}`);

  const beforeValidDateObj = new Date(validDateString);
  const afterValidDateObj = new Date(validDateString);

  const dates = { before: beforeValidDateObj, after: afterValidDateObj };

  const datesMiliseconds = setDateRangeByChartType(chartType, dates);

  const dateBefore = dateformat(datesMiliseconds.before, "mm-dd-yyyy HH:MM");
  const dateAfter = dateformat(datesMiliseconds.after, "mm-dd-yyyy HH:MM");

  const beforeUTC = moment.utc(dateBefore).format();
  const afterUTC = moment.utc(dateAfter).format();

  return {
    beforeUTC,
    afterUTC
  };
}

function setDateRangeByChartType(type, d) {
  switch (type) {
    case "minCandle":
    case "fiveMinuteCandle":
    case "fifteenMinuteCandle":
      const minBefore = d.before.setMinutes(d.before.getMinutes() - 25);
      const minAfter = d.after.setMinutes(d.after.getMinutes() + 25);

      return {
        before: minBefore,
        after: minAfter
      };
    case "hourCandle":
      const hourBefore = d.before.setHours(d.before.getHours() - 25);
      const hourAfter = d.after.setHours(d.after.getHours() + 25);

      return {
        before: hourBefore,
        after: hourAfter
      };
    case "dayCandle":
      const dayBefore = d.after.setDate(d.after.getDay() + 25);
      const dayAfter = d.after.setDate(d.after.getDay() + 25);

      return {
        before: dayBefore,
        after: dayAfter
      };

    default:
      break;
  }
}
