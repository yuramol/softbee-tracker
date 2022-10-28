import { gql } from '@apollo/client';
export const REPORT_PDF_QUERY = gql`
  query ReportPDF($query: String!) {
    reportPDF(input: $query)
      @rest(
        path: "/report/pdf?{args.input}"
        method: "GET"
        type: "ReportPDFPayload"
        endpoint: "blob"
      ) {
      blob
    }
  }
`;
