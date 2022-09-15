import { useLazyQuery } from '@apollo/client';
import { PROJECT_PDF_QUERY } from 'api/graphql/query/project';

export const useReportPDF = (query: string) => {
  const [dowloadPDF, { data, refetch, loading }] = useLazyQuery<{
    data: string;
  }>(PROJECT_PDF_QUERY, {
    variables: { query },
  });

  const projectPDFData = data?.data;
  console.log('====projectPDFData', data);
  return {
    dowloadPDF,
    projectPDFData,
    refetch,
    loading,
  };
};
