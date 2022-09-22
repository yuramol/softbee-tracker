import { format } from "date-fns";

function toHoursAndMinutes(totalMinutes) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export type TTrackerGroup = {
  date: Date,
  trackers: {
      createdAt: Date,
      description: string,
      projectName: string,
      userName: string,
      hoursMinutes: number;
  } []
}

type generateHtmlReportsParams = {
  usersFullName: string[],
  period: {
      start: Date,
      end: Date
  },
  trackersGroupDay: TTrackerGroup[],
}

export function generateHtmlReports(data: generateHtmlReportsParams) {
  let htmlTrackers = ""
  let totalTime = 0;
  data.trackersGroupDay.forEach((group) => {
      group.trackers.forEach((tracker, index) => {
          totalTime += tracker.hoursMinutes;
          htmlTrackers += `<tr>
              ${index === 0 ? `<th rowspan="${group.trackers.length + 1}" class="table-header">${format(group.date, 'MM/dd/yyyy')}</th>` : ''}
              <td><h6 class="table-description">${tracker.userName}</h6></td>
              <td>
                <h6 class="table-description">${tracker.projectName}</h6>
                <p class="table-project">
                  ${tracker.description}
                </p>
              </td>
              <td class="table-common-time">${format(tracker.createdAt, 'MM/dd/yyyy HH:mm')}</td>
              <td class="table-time">${toHoursAndMinutes(tracker.hoursMinutes)}</td>
            </tr>`
      })
  });

  let html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html,
      body,
      h6,
      p,
      th {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      body {
        margin: 15px;
      }
      h1 {
        font-family: Poppins, sans-serif;
        margin-bottom: 10px;
        font-size: 24px;
        font-weight: 600;
        line-height: 1.167;
      }
      p {
        font-size: 15px;
      }
      .wrapper {
        margin: 15px 0 10px 15px;
      }
      .container {
        display: flex;
        font-family: Poppins, sans-serif;
      }
      .period {
        font-weight: 600;
        padding-left: 5px;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        font-family: Poppins, sans-serif;
        color: rgba(0, 0, 0, 0.87);
        text-align: left;
        font-size: 12px;
      }
      tr {
        border-bottom: 1px solid rgba(224, 224, 224, 1);
      }
      tbody tr:last-child {
        border-bottom: none;
      }
      td {
        line-height: 1.43;
        padding: 8px;
      }
      .logo {
        margin: 0 0 15px 15px;
        width: 150px;
      }
      .table-wrapper {
        border-bottom: 1px solid rgba(224, 224, 224, 1);
      }
      .table-wrapper:last-child {
        border-bottom: none;
      }
      .table-header {
        font-weight: 600;
        line-height: 1.5rem;
        padding: 8px;
      }
      .table-common td {
        padding: 10px 8px;
      }
      .table-common-time {
        vertical-align: bottom;
        color: grey;
      }
      .table-time {
        vertical-align: baseline;
      }
      .table-date {
        font-weight: 400;
        line-height: 1.5rem;
        padding: 8px;
      }
      .table-project {
        font-size: 0.875rem;
        line-height: 1.75;
      }
      .table-description {
        line-height: 1.5;
      }
      .all-time {
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div>
      <img
        class="logo"
        src="data:image/jpeg;base64,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"
        alt="SoftBee"
      />
    </div>
    <div class="wrapper">
      <h1>${data.usersFullName.join(', ')}</h1>
      <div class="container">
        <p>Period:</p>
        <p class="period">${format(data.period.start, 'MM/dd/yyyy')} - ${format(data.period.start, 'MM/dd/yyyy')}</p>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th class="table-header">Date</th>
          <th class="table-header">User name</th>
          <th class="table-header">Description</th>
          <th class="table-header"></th>
          <th class="table-header">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-common">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="all-time">${toHoursAndMinutes(totalTime)}</td>
        </tr>
        ${htmlTrackers}
      </tbody>
      </table>
    </body>
  </html>
      `;
  return html
}