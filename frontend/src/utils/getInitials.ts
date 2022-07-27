export const getInitials = (fullName: string) => {
  const initials = fullName
    ?.match(/\b(\w)/g)
    ?.join('')
    ?.slice(0, 2);
  if (!initials) {
    return 'N/A';
  }
  if (initials.length === 1) {
    return fullName.length === 1 ? fullName + fullName : fullName.slice(0, 2);
  }
  return initials;
};
