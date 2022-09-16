import { useLazyQuery } from '@apollo/client';
import { REPORT_PDF_QUERY } from 'api/graphql/query/reportPDF';

export type ReportPDF = {
  reportPDF: {
    blob: Blob;
  };
};

export const useReportPDF = () => {
  const [downloadPDF, { data, refetch, loading }] = useLazyQuery<
    ReportPDF,
    { query: string }
  >(REPORT_PDF_QUERY);
  const reportPDFData = data;
  return {
    downloadPDF,
    reportPDFData,
    refetch,
    loading,
  };
};
