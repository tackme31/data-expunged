export const getTimeLeft = (timeout: any) => {
  const sec = timeout._idleStart + timeout._idleTimeout - Date.now();
  return Math.ceil(sec / 1000);
};