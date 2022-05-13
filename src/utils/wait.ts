export const wait = async (ms = 0): Promise<void> => {
  await new Promise((r) => {
    return setTimeout(r, ms);
  });
};
