import 'intl';
import 'intl/locale-data/jsonp/en';

const formatCurrency = (value, currency = '') => {
  let amount;
  if (!value) {
    amount = '₦0.0';
  }

  amount = `${currency || '₦'}${parseFloat(value)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
  return amount;
};

export default formatCurrency;
