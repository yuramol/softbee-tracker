import React from 'react';

import { ScrollArea } from 'components/ui/ScrollArea';

export default function KanbanContainer({
  children,
  scrollable = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)] overflow-auto">
          <div className="h-full py-4">{children}</div>
        </ScrollArea>
      ) : (
        <div className="h-full py-4">{children}</div>
      )}
    </>
  );
}
