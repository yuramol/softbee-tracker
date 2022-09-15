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
      description: string,
      projectName: string,
      hoursMinutes: number;
  } []
}

type generateHtmlReportsParams = {
  usersFullName: string,
  period: {
      start: Date,
      end: Date
  },
  trackersGroupDay: TTrackerGroup[],
}

export function generateHtmlReports(data: generateHtmlReportsParams) {
  let html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${data.usersFullName}</title>
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
          vertical-align: center;
        }

        table {
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
          font-family: Poppins, sans-serif;
          color: rgba(0, 0, 0, 0.87);
          text-align: left;
        }

        tr {
          border-bottom: 1px solid rgba(224, 224, 224, 1);
        }

        tbody tr:last-child {
          border-bottom: none;
        }

        td {
          font-size: 0.875rem;
          line-height: 1.43;
          padding: 16px;
        }

        .table-header {
          font-size: 0.875rem;
          line-height: 1.5rem;
          padding: 16px;
        }

        .table-project {
          font-size: 1rem;
          line-height: 1.75;
          font-weight: 600;
        }

        .table-description {
          font-size: 1rem;
          line-height: 1.5;
        }

        .table-employee {
          font-size: 0.875rem;
          line-height: 1.43;
          margin-top: 16px;
        }
      </style>
    </head>
    <body>
      <h2>${data.usersFullName}</h2>
      <h3>Period - <b>${format(data.period.start, 'MM/dd/yyyy')} - ${format(data.period.start, 'MM/dd/yyyy')}</b></h3>
      <table>
        <thead>
          <tr>
            <th class="table-header">Date</th>
            <th class="table-header">Description</th>
            <th class="table-header">Time</th>
          </tr>
        </thead>
        <tbody>`;
    let totalTime = 0;
    data.trackersGroupDay.forEach((group) => {
        group.trackers.forEach((tracker) => {
            totalTime += tracker.hoursMinutes;
            html += `<tr>
                <th class="table-header">${format(group.date, 'MM/dd/yyyy')}</th>
                <td>
                  <h6 class="table-project">${tracker.projectName}</h6>
                  <p class="table-description">
                    ${tracker.description}
                  </p>
                </td>
                <td>${toHoursAndMinutes(tracker.hoursMinutes)}</td>
              </tr>`
        })
    })
    html += `
          <tr>
            <th class="table-header"><b>Total</b></th>
            <td></td>
            <td><b>${toHoursAndMinutes(totalTime)}</b></td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>`;
  return html
}