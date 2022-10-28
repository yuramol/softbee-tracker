export const usePageTitle = () => {
  const setTitle = (title: string) => {
    document.title = `SoftBee Tracker | ${title}`;
  };
  return { setTitle };
};
