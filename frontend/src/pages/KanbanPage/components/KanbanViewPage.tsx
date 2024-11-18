import React from 'react';

import NewTaskDialog from './NewTaskDialog';
import { KanbanBoard } from './KanbanBoard';
import KanbanContainer from 'layouts/KanbanContainer/KanbanContainer';

export default function KanbanViewPage() {
  return (
    <KanbanContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <NewTaskDialog />
        </div>
        <KanbanBoard />
      </div>
    </KanbanContainer>
  );
}
