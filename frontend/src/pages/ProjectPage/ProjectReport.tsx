import React from 'react';

import { Scalars } from 'types/GraphqlTypes';

import { ProjectReportTab } from 'components';

type Props = {
  id: Scalars['ID'];
};
export const ProjectReport = ({ id }: Props) => {
  return (
    <>
      <ProjectReportTab projectId={id} />
    </>
  );
};
