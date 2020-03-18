import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { IRaceResultDataEntry } from './race-result-data-entry';
import { RaceResultDataService } from './race-result-data.service';

@Component({
  selector: 'app-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.css']
})
export class RaceResultsComponent implements OnInit {
  raceResultData = [];
  errorMessage: string;

  // List values for drop down filters
  raceClasses = []
  raceWeeks = []
  raceHeats = []

  // The selected item from each filter
  theClass = "";
  theWeek = "";
  theHeat = "";



  raceArrayRes = []

  constructor(private _raceResultDataService: RaceResultDataService) { }

  private raceDayResultsChartData: any = {
    labels: [
    ],
    series: [
    ]
  };

  private raceDayResultsChartOptions: any = {
    stackBars: true,
    horizontalBars: true,
    reverseData: false,
    height: 500,
    chartPadding: {
      top: 15,
      right: 15,
      bottom: 15,
      left: 15
    },
    axisY: {
      offset: 140,
      position: 'start',
      labelOffset: {
        x: 0,
        y: 0
      },
      showLabel: true,
      showGrid: true,
      scaleMinSpace: 30,
      onlyInteger: false
    },
    axisX: {
      position: 'end',
      labelOffset: {
        x: -10,
        y: 0
      },
      labelInterpolationFnc: function (value) {
        return value + 's';
      }
    }
  };

  onClassSelected() {
    this._raceResultDataService.getRaceWeeks(this.theClass).subscribe(res => {
      this.raceWeeks = res._embedded
      this.raceWeeks.sort(function (a, b) {
        let aa = new Date(a._id)
        let bb = new Date(b._id)
        if (aa > bb) {
          return -1;
        }
        if (bb > aa) {
          return 1;
        }
        return 0;
      });
    })
  }

  onHeatSelected() {
    this._raceResultDataService.getRaceResultData(this.theClass, this.theWeek, this.theHeat).subscribe(res => {
      this.processResults(res._embedded)
    })
  }

  processResults(raceData) {

    this.raceDayResultsChartData.labels = []
    this.raceDayResultsChartData.series = []
    let raceStruct = {}
    this.raceArrayRes = []

    for (var i = 0; i < raceData.length; i++) {

      let tempLaps = []
      if (!(raceData[i]["Driver Name"] in raceStruct)) {

        // go through the array looking for  laps
        for (var x = 0; x < raceData.length; x++) {
          if (raceData[x]["Driver Name"] == raceData[i]["Driver Name"]) {
            // found a lap
            tempLaps.push({ "lap": raceData[x]["Race Lap Number"], "time": raceData[x]["Race Lap Time"] })
          }
        }

        // we've got all the laps, so lets sort them in order
        tempLaps.sort((a, b) => a.lap - b.lap)
        raceStruct[raceData[i]["Driver Name"]] = Object.assign({}, tempLaps);

        // now just convert to standard array
        let tArr = []
        this.raceDayResultsChartData.labels.push(raceData[i]["Driver Name"]);

        for (var x = 0; x < tempLaps.length; x++) {
          tArr.push(tempLaps[x].time)
        }

        this.raceArrayRes.push(tArr)

      }

    }

    // now we need to prepare the data for the graph

    for (var i = 0; i < this.raceArrayRes.length; i++) {
      // go through each person
      for (var x = 0; x < this.raceArrayRes[i].length; x++) {
        if (typeof this.raceDayResultsChartData.series[x] === 'undefined') {
          let emptyArr = []
          for (var c = 0; c < this.raceArrayRes.length; c++) {
            emptyArr.push(0)
          }
          this.raceDayResultsChartData.series.push(emptyArr)
        }

        this.raceDayResultsChartData.series[x][i] = this.raceArrayRes[i][x]
      }
    }

    this.initialiseChart()
  }

  onWeekSelected() {
    console.log("OPTIONS SELECTED")

    this._raceResultDataService.getRaceHeats(this.theClass, this.theWeek).subscribe(res => {
      console.log("GOT WEEKS")
      console.log(res)
      this.raceHeats = res._embedded
      this.raceHeats.sort(function (a, b) {
        let aa = new String(a._id)
        let bb = new String(b._id)
        if (aa > bb) {
          return -1;
        }
        if (bb > aa) {
          return 1;
        }
        return 0;
      });
      this.raceHeats.sort(function (a, b) {
        let aaa = a._id.substring(0, 1)
        let bbb = b._id.substring(0, 1)
        if (bbb == "F" && aaa == "H") {
          return 1;
        }
        else if (bbb == "H" && aaa == "F") {
          return 1;
        }
        return 0;
      });
    })
  }

  ngOnInit() {
    this._raceResultDataService.getRaceClasses().subscribe(res => {
      this.raceClasses = res._embedded
      console.log("Getting distinct race class data")
      console.log(this.raceClasses)
      this.raceClasses.reverse()
      console.log(this.raceClasses)
    })

  }

  /**
   * Initialise Chartist bar chart with data and options
   */
  initialiseChart() {
    const raceDayResultsChart = new Chartist.Bar(
      '#raceDayResultsChart',
      this.raceDayResultsChartData,
      this.raceDayResultsChartOptions
    )
      .on('draw', data => this.customiseChart(data))
      .on('created', context => {
        this.setTargetLine(context, 'x', 300);
        this.setLapPositions();
        this.setLabels();
      });
  }

  /**
   * Trigger various chart customisations
   * @param data
   */
  customiseChart(data) {
    const bar = data.type === 'bar';
    if (bar) {
      this.setStrokeWidth(data);
      this.setStyles(data);
      this.setCustomAttribute(data);
      this.generateBarLabels(data);
    }
  }

  /**
   * Set the width of the bar #JSTE#
   * just repeats above rationalise
   * @param data
   */
  setStrokeWidth(data) {
    const barWidth = 60;
    data.element.attr({
      style: `stroke-width: ${barWidth}px`
    });
  }

  /**
   * Add the custom label text as an attribute to the bar
   * for use by a tooltip #JSTE# said ct:series at end
   * - what should it be?
   * @param data
   */
  setCustomAttribute(data) {
    const lap = 'Lap ' + (data.seriesIndex + 1);
    data.element.attr({ label: lap }, 'ct:raceDayResultsChart');
  }

  /**
   * RERR: Not exactly sure what this is needed for?
   * @param data
   */
  setStyles(data) {
    const classLabelMap = '';
    let labelText;
    // need to grab the CSS classes that were applied to the bar
    const barClasses = data.element.parent().classes();
    // typically each bar gets two classes, ct-series and ct-series-<color>
    // (cardinal, flamingo, etc)
    barClasses.forEach(className => {
      // eliminate the basic series class...we can't do anything with that
      let color = className.replace('ct-series', '');
      // once that is stripped off, if there's anything left, then we have
      // the class that specifies the color of the bar...
      if (color.length) {
        // strip off the remaining leading dash
        color = color.substr(1, color.length);
        // use the color class to map to the text we want to display in
        // the custom label for the bar
        labelText = classLabelMap[color];
      }
    });
  }

  /**
   * create a custom label element to insert into the bar
   * #JSTE# example on https://github.com/gionkunz/chartist-js/issues/196
   * fails due to insufficient arguments - guessed second one
   * @param data
   */
  generateBarLabels(data) {
    const barWidth = 60;
    const barHorizontalCenter = data.x1 + data.element.width() * 0.5;
    const barVerticalCenter = data.y1 + barWidth * 0.08;
    const lapText = data.value.x > 0 ? 'Lap ' + (data.seriesIndex + 1) : '';
    const lapStyles = 'font-weight: bold;';
    const labelText = data.value.x > 0 ? data.value.x : '';

    // Lap Number
    this.setSVGLabel(
      data,
      lapText,
      barHorizontalCenter,
      barVerticalCenter - 18,
      lapStyles
    );

    // Lap Time
    this.setSVGLabel(data, labelText, barHorizontalCenter, barVerticalCenter);

    // Lap Position
  }

  /**
   * Append SVG text element
   * @param data
   * @param text
   * @param x
   * @param y
   */
  setSVGLabel(data: any, text: string, x: number, y: number, styles?: string) {
    let label;
    const setStyles =
      'font-family: \'proxima-nova-alt\', Helvetica, Arial, sans-serif; font-size: 12px; fill: rgb(88,88,88)';
    const allStyles = styles ? styles + setStyles : setStyles;
    label = new Chartist.Svg('text', {});
    label.text(text);
    label.attr({
      x: x,
      y: y,
      'text-anchor': 'middle',
      style: allStyles
    });
    data.group.append(label);
  }

  /**
   * Draws a target line on a chart
   * #JSTE# - need to draw target line see https://www.npmjs.com/package/chartist-plugin-targetline
   * @param context
   * @param axis
   * @param position
   */
  setTargetLine(context: any, axis: 'y' | 'x', position: number) {
    const projectTarget = {
      y: function (chartRect, bounds, value) {
        const targetLineY =
          chartRect.y1 - chartRect.height() / bounds.max * value;

        return {
          x1: chartRect.x1,
          x2: chartRect.x2,
          y1: targetLineY,
          y2: targetLineY
        };
      },
      x: function (chartRect, bounds, value) {
        const targetLineX =
          chartRect.x1 + chartRect.width() / bounds.max * value;

        return {
          x1: targetLineX,
          x2: targetLineX,
          y1: chartRect.y1,
          y2: chartRect.y2
        };
      }
    };

    const targetLine = projectTarget[axis](
      context.chartRect,
      context.bounds,
      position
    );

    context.svg.elem('line', targetLine, 'target-line');
  }

  /**
   * Identify who is winning at the end of each lap (i.e. total time is lowest
   * at the end of lap where total time = lap time x n laps) and add label
   * @param context
   */
  setLapPositions() {
    // Select chart series from DOM
    const series = Array.from(document.querySelectorAll('.ct-series'));

    // Create blank array to collect lap time data
    const cumulativeTimes = Array<any>();

    // Loop through series (laps)
    series.forEach((element, seriesIndex) => {
      // Select each bar inside of series
      const bars = Array.from(element.querySelectorAll('.ct-bar'));

      // Loop through bars
      bars.forEach((bar, index) => {
        // Store the bar value
        const value = +bar.getAttribute('ct:value');

        // Add required lap data to the array
        if (cumulativeTimes[index]) {
          cumulativeTimes[index].time = value;
          cumulativeTimes[index].laps += value > 0 ? 1 : 0;
          cumulativeTimes[index].totalTime += value;
          cumulativeTimes[index].bar = bar;
        } else {
          cumulativeTimes[index] = {};
          cumulativeTimes[index].time = value;
          cumulativeTimes[index].laps = 1;
          cumulativeTimes[index].totalTime = value;
          cumulativeTimes[index].bar = bar;
        }

        // When the final series bar has been looped through
        if (bars.length - 1 === index) {
          // Create copy of lap data array
          const times = cumulativeTimes.slice();

          // order the lap data array to see who has won each lap
          times.sort((a, b) => {
            const aValue = +a.time > 0 ? +a.totalTime : 10000;
            const bValue = +b.time > 0 ? +b.totalTime : 10000;
            return aValue - bValue;
          });

          // loop through ordered array and add text label of position
          times.forEach((item, timesIndex) => {
            const time = item.time;
            const barRef = item.bar;
            if (time > 0) {
              const position = timesIndex + 1;
              const nextElement = <HTMLElement>barRef.nextSibling.cloneNode();
              nextElement.innerHTML = this.ordinalSuffixOf(position);
              const y = +nextElement.getAttribute('y');
              nextElement.setAttribute('y', '' + (y + 34));
              barRef.parentElement.insertBefore(
                nextElement,
                barRef.nextSibling
              );
            }
          });
        }
      });
    });
  }

  /**
   * Amend label text to include extra details
   */
  setLabels() {
    const labels = Array.from(document.querySelectorAll('.ct-start'));
    labels.forEach((label, index) => {
      let fastest = Number.MAX_SAFE_INTEGER;
      let total = 0;
      let laps = 0;
      let fastestlap = 0;
      this.raceDayResultsChartData.series.forEach(res => {
        if (res[index] > 0) {
          laps++;
        }
      });
      this.raceDayResultsChartData.series.forEach((res, seriesIndex) => {
        const lapTime = res[index];
        if (lapTime > 0) {
          total = +(total + lapTime).toFixed(
            2
          ); /* #JSTE# Need to ignore the first lap time on best */
          if (seriesIndex > 1) {
            if (lapTime < fastest) {
              fastest = lapTime;
              fastestlap = seriesIndex;
            }
          }
        }
        if (laps - 1 === seriesIndex) {
          const average = (total / laps).toFixed(2);
          const currentLabel = label.innerHTML;
          const template = `<b>${currentLabel}</b><br><b>${laps} / ${total}s</b><br><font size="1px">Avg: ${average}s | Best: ${fastest}s [${fastestlap + 1}]</font>`;
          label.innerHTML = template;
          // #JSTE# need to sort the text sizing - seems random 1px...
        }
      });
    });
  }

  /**
   * Add ordinal suffix to number
   * @param i
   */
  ordinalSuffixOf(i) {
    const j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + 'st';
    }
    if (j === 2 && k !== 12) {
      return i + 'nd';
    }
    if (j === 3 && k !== 13) {
      return i + 'rd';
    }
    return i + 'th';
  }
}
