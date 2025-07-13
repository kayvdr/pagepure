export const getCleanUrl = (url: string) => {
  const parsed = new URL(url);
  return parsed.origin + parsed.pathname;
};

export const isValidUrl = (url: string) => !!new URL(url);
