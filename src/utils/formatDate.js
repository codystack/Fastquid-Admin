export default function formatDate(value) {
  const date = new Date(value);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(date?.getTime())) {
    return value;
  }

  return date.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}
