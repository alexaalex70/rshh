const amIMentor = (userId: string, channel: any) => {
  if (channel?.member?.id !== userId) return true;
  return false;
};
const amIMember = (userId: string, channel: any) => {
  if (channel?.member?.id === userId) return true;
  return false;
};

export { amIMember, amIMentor };
