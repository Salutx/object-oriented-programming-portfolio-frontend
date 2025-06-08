/* eslint-disable import/prefer-default-export */
export const handleCaptalize = (value?: string): string => {
  if (!value) return '';
  const formatted = value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
  return formatted;
};
