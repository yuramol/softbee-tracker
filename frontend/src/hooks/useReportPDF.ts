import { useLazyQuery } from '@apollo/client';
import { REPORT_PDF_QUERY } from 'api/graphql/query/reportPDF';

export const useReportPDF = () => {
  const [downloadPDF, { data, refetch, loading }] = useLazyQuery<
    {
      data: string;
    },
    { query: string }
  >(REPORT_PDF_QUERY);

  const projectPDFData = data?.data;
  console.log('====projectPDFData', data);
  return {
    downloadPDF,
    projectPDFData,
    refetch,
    loading,
  };
};
