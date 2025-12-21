const billTotal = document.querySelector('#bill-total');
const tipButtons = document.querySelectorAll('[data-tip]');
const customTip = document.querySelector('#customTip');
const btnReset = document.querySelector('.reset-btn');
const numPeople = document.querySelector('#number-of-people');
const tipPerPerson = document.querySelector('#tipPerPerson');
const totalPerPerson = document.querySelector('#totalPerPerson');

const errorSpan = document.querySelector('.error-message');

let billAmount = 0; // bill before tip
let tipPercent = 0;
let tipTotal = 0;
let totalAmount = 0;
let subTotal = 0;
let totalPeople = 0;

billTotal.addEventListener('blur', (e) => {
  billAmount = 0;
  billAmount = parseFloat(parseFloat(e.target.value).toFixed(2));
});

const getSubtotal = (tipPercent) => {
  tipTotal = billAmount * tipPercent;
  subTotal = billAmount * tipPercent + billAmount;
};

tipButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    getSubtotal(parseFloat(btn.dataset.tip));
    numPeople.focus();
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

numPeople.addEventListener('blur', (e) => {
  console.log(e.target.value);
  if (e.target.value === '') {
    errorSpan.classList.toggle('show');
    numPeople.focus();
    //   errorSpan.classList.toggle('show')
  } else {
    if (errorSpan.classList.contains('show')) {
      errorSpan.classList.remove('show');
    }
    totalPeople = parseInt(e.target.value);
    updateDisplay(subTotal, totalPeople);
    btnReset.classList.toggle('completed');
  }

  // enable reset button
});

const updateDisplay = (subTotal, totalPeople) => {
  const totalPerPersonAmount = parseFloat((subTotal / totalPeople).toFixed(2));
  const tipPerPersonAmount = parseFloat((tipTotal / totalPeople).toFixed(2));
  tipPerPerson.innerText = `$${tipPerPersonAmount}`;
  totalPerPerson.innerText = `$${totalPerPersonAmount}`;
};

btnReset.addEventListener('click', () => {
  // clear inputs
  billTotal.value = '';
  numPeople.value = '';
  customTip.value = '';

  // reset variables
  billAmount = 0;
  tipPercent = 0;
  tipTotal = 0;
  totalAmount = 0;
  subTotal = 0;
  totalPeople = 0;

  // reset innerText
  tipPerPerson.innerText = '$0.00';
  totalPerPerson.innerText = '$0.00';

  // return focus to bill input
  billTotal.focus();

  btnReset.classList.toggle('completed');
});
