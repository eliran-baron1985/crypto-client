export function createMarks(eventMarkers, i, mark, name, showAt) {
  eventMarkers.group(i, [mark]);
  eventMarkers.group(i).format(name);
  eventMarkers
    .group(i)
    .normal()
    .stroke("black", 1);
  eventMarkers.normal().fontColor("black");

  switch (name) {
    case "3.1":
    case "3.2":
    case "4.1":
    case "4.2":
    case "1":
    case "1.2":
    case "1.4":
    case "1.6":
    case "1.8":
    case "2":
    case "2.2":
    case "2.4":
    case "2.6":
    case "2.8":
    case "5":
    case "6":
      eventMarkers
        .group(i)
        .normal()
        .fill("yellow");

      break;
    case "buy_open":
      eventMarkers
        .group(i)
        .normal()
        .fill("green")
        .format("⬆")
        .fontColor("black");

      break;
    case "buy_close":
      eventMarkers
        .group(i)
        .normal()
        .fill("green")
        .format("⬇")
        .fontColor("black");

      break;
    case "sell_open":
      eventMarkers
        .group(i)
        .normal()
        .fill("red");

      eventMarkers
        .group(i)
        .format("⬇")
        .fontColor("black");
      break;

    case "sell_close":
      eventMarkers
        .group(i)
        .normal()
        .fill("red");

      eventMarkers
        .group(i)
        .format("⬆")
        .fontColor("black");
      break;

    default:
      eventMarkers
        .group(i)
        .normal()
        .fill("white").fontColor("black");

      break;
  }

  eventMarkers.group(i).fieldName(showAt);
  if (showAt === "high") {
    eventMarkers.group(i).direction("up");
  }
  if (showAt === "low") {
    eventMarkers.group(i).direction("down");
  }
}

export function create_chart_marks(helper) {
  const { plot, events } = helper;

  const eventMarkers = plot.eventMarkers();
  eventMarkers.position("series");
  eventMarkers.normal().height(25);
  eventMarkers.normal().width(25);
  eventMarkers.connector().length("25");

  if (events !== undefined && events !== null) {
    if (events.length) {
      events.forEach((event, i) => {
        const dateTime = `${event.date} ${event.time}`;

        const mark = {
          date: dateTime,
          description:
            event.lastName !== undefined
              ? `event: ${event.lastName}, ${event.timingPosition}`
              : event.date
        };

        // if (eventsGroupNum === undefined) {
        //   initialLastGroupNum = true;
        // } else if (i === 0) {
        //   initialLastGroupNum = false;
        //   i++;
        //   lastGroupNum[graph][graphType][symbol] += i;
        // } else {
        //   initialLastGroupNum = false;
        //   lastGroupNum[graph][graphType][symbol] += i;
        // }

        // initialLastGroupNum ? i : lastGroupNum[graph][graphType][symbol],
        return createMarks(eventMarkers, i, mark, event.name, event.showAt);
      });
    }
  }
}
