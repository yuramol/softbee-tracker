import { gql } from '@apollo/client';

export const REPORT_PDF_QUERY = gql`
  query ReportPDF($query: String!) {
    projectPDF @rest(path: '/report/pdf?{args.query}', method: 'GET', type: 'ProjectPDFPayload') {
      data
    }
  }
`;
