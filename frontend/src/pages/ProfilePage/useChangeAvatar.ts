import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { UPLOAD_MUTATION, REMOVE_FILE_MUTATION } from 'api';
import { useNotification } from 'hooks/useNotification';
import { ChangeAvatarProps } from './types';

export const useChangeAvatar = () => {
  const showNotification = useNotification();
  const [uploadMutation] = useMutation(UPLOAD_MUTATION);
  const [removeFileMutation] = useMutation(REMOVE_FILE_MUTATION);

  return useCallback(
    ({ event, avatarId, userId, updateUserMutation }: ChangeAvatarProps) => {
      const [file] = event.target.files;

      if (file) {
        return uploadMutation({
          variables: {
            file,
          },
        })
          .then(({ data }) => {
            if (data?.upload?.data.id && avatarId) {
              removeFileMutation({
                variables: {
                  id: avatarId,
                },
              }).then(() => {
                updateUserMutation({
                  variables: {
                    id: userId,
                    data: { avatar: data?.upload?.data.id },
                  },
                });
              });
            } else if (data?.upload?.data.id) {
              updateUserMutation({
                variables: {
                  id: userId,
                  data: { avatar: data?.upload?.data.id },
                },
              });
            }
          })
          .catch((error) => showNotification({ error }));
      }
    },
    []
  );
};
