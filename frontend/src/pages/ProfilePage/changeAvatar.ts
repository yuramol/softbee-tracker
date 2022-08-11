import { ChangeAvatarProps } from './types';

export const changeAvatar: (props: ChangeAvatarProps) => void = ({
  event,
  avatarId,
  userId,
  uploadMutation,
  removeFileMutation,
  updateUserMutation,
}) => {
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
      .catch((error) => console.log(error));
  }
};
