export default function iconVariant(status) {
  let icon;
  switch (status) {
    case 'approved':
    case 'success':
      icon = 'eva:checkmark-fill';
      break;
    case 'settled':
      icon = 'eva:diagonal-arrow-left-down-fill';
      break;
    case 'credited':
      icon = 'eva:diagonal-arrow-left-up-fill';
      break;
    case 'denied':
      icon = 'eva:close-fill';
      break;
    default:
      icon = 'eva:diagonal-arrow-right-up-fill';
      break;
  }

  return icon;
}
