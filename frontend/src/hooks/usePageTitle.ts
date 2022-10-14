export const usePageTitle = (title: string) => {
  const setTitle = () => {
    document.title = `SoftBee Tracker | ${title}`;
  };
  return { setTitle };
};
