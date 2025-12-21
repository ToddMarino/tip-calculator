const billTotal = document.querySelector('#bill-total');
const tipButtons = document.querySelectorAll('[data-tip]');
const customTip = document.querySelector('#customTip');
const btnReset = document.querySelector('.reset-btn');

let billAmount = 0; // bill before tip
let tipPercent = 0;
let totalAmount = 0;
let subTotal = 0;

billTotal.addEventListener('blur', (e) => {
  billAmount = 0;
  billAmount = parseFloat(parseFloat(e.target.value).toFixed(2));
  //   console.log(billAmount);
});

const getSubtotal = (tipPercent) => {
  subTotal = billAmount * tipPercent + billAmount;
  console.log(subTotal);
};

tipButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    getSubtotal(parseFloat(btn.dataset.tip));
  });
});

customTip.addEventListener('blur', (e) => {
  let customTipPercent = e.target.value;
  if (customTipPercent === '') {
    return;
  } else {
    customTipPercent = parseInt(e.target.value) / 100;
    getSubtotal(customTipPercent);
  }
});

btnReset.addEventListener('click', () => {
  billAmount = 0;
  tipPercent = 0;
  totalAmount = 0;
  subTotal = 0;

  billTotal.focus();
});
