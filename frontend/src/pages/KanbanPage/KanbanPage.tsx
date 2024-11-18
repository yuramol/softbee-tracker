import React from 'react';

import { PageProps } from '../types';
import { ComponentContainer } from 'layouts';
import KanbanViewPage from './components/KanbanViewPage';

const KanbanPage: React.FC<PageProps> = ({ title }) => {
  return (
    <ComponentContainer className="flex flex-col">
      <h1 className="text-[32px] font-bold">{title}</h1>
      <KanbanViewPage />
    </ComponentContainer>
  );
};

export default KanbanPage;
