export default function colorVariant(status) {
  let color;
  switch (status) {
    case 'approved':
    case 'success':
      color = 'rgb(0 225 103 / 64%)';
      break;
    case 'settled':
      color = 'rgb(1 208 69 / 33%)';
      break;
    case 'credited':
      color = 'rgb(89 59 193 / 50%)';
      break;
    case 'denied':
      color = 'rgb(255 70 70 / 50%)';
      break;
    default:
      color = 'rgb(255 170 70 / 50%)';
      break;
  }

  return color;
}
