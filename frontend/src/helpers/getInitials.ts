export const getInitials = (
  firstName?: string,
  lastName?: string,
  name?: string
) => {
  const initials = `${firstName?.charAt(0)}${lastName?.charAt(0)} `;
  if (!initials) {
    return 'N/A';
  }

  return initials;
};
