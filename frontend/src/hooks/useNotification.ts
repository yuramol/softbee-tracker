import { useCallback } from 'react';
import { useSnackbar, VariantType } from 'notistack';

import { formatGraphqlError } from 'helpers';

type useNotificationProps = {
  message?: string;
  error?: unknown;
  variant?: VariantType;
};

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    ({ message, error, variant = 'error' }: useNotificationProps) => {
      if (error) {
        enqueueSnackbar(formatGraphqlError(error), {
          variant: 'error',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          preventDuplicate: true,
        });
      }
      if (message) {
        enqueueSnackbar(message, {
          variant,
          autoHideDuration: 30000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          preventDuplicate: true,
        });
      }
    },
    [enqueueSnackbar]
  );
};
