import React from 'react';

import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { useSortable } from '@dnd-kit/sortable';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'components/ui/AlertDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/DropdownMenu';
import { Badge } from 'components/ui/Badge';
import { Button } from 'components/ui/Button';
import { Task, useTaskStore } from 'lib/store';
import { Card, CardContent, CardHeader } from 'components/ui/Card';
import { useNotification } from 'hooks';

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const notification = useNotification();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    attributes: {
      roleDescription: 'Task',
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary',
      },
    },
  });

  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const removeTask = useTaskStore(
    (state: { removeTask: any }) => state.removeTask
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
      })}
    >
      <CardHeader className="space-between relative flex flex-row border-b-2 border-secondary px-3 py-3">
        <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className="-ml-2 h-auto cursor-grab p-1 text-secondary-foreground/50"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        <Badge variant={'outline'} className="ml-auto font-semibold">
          Task
        </Badge>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild className="border">
            <Button variant="secondary" className="ml-1">
              <span className="sr-only">Actions</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onSelect={() => setShowDeleteDialog(true)}
              className="text-red-600"
            >
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure want to delete task?
              </AlertDialogTitle>
              <AlertDialogDescription>
                NOTE: All tasks related to this category will also be deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={() => {
                  // yes, you have to set a timeout
                  setTimeout(
                    () => (document.body.style.pointerEvents = ''),
                    100
                  );

                  setShowDeleteDialog(false);
                  removeTask(task.id);
                  notification({
                    message: 'This task has been deleted.',
                    variant: 'success',
                  });
                }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap px-3 pb-6 pt-3 text-left">
        <p className="mb-2 text-[20px] font-bold"> {task.title}</p>
        <p> {task.description}</p>
      </CardContent>
    </Card>
  );
}
