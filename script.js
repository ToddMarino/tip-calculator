const el = {
  bill: document.querySelector('#bill-total'),
  people: document.querySelector('#number-of-people'),
  tipButtons: document.querySelectorAll('[data-tip]'),
  customTip: document.querySelector('#customTip'),
  reset: document.querySelector('.reset-btn'),
  tipPerPerson: document.querySelector('#tipPerPerson'),
  totalPerPerson: document.querySelector('#totalPerPerson'),
  error: document.querySelector('.error-message'),
};

const state = {
  billAmount: 0,
  tipPercent: 0,
  totalPeople: 0,
};

let isWholeNumber = (value) => /^[1-9][0-9]*$/.test(value);
let isFloat = (value) => /^(?:\d+|\d*\.\d+)$/.test(value);
let toNumber = (value) => parseFloat(value) || 0;

// bill-total input
el.bill.addEventListener('input', (e) => {
  const value = e.target.value.trim();

  if (!isFloat(value)) {
    state.billAmount = 0;
    calculate();
    return;
  }

  const num = toNumber(value);
  state.billAmount = num;
  calculate();
});

// tip buttons
el.tipButtons.forEach((tipButton) => {
  tipButton.addEventListener('click', () => {
    const value = tipButton.getAttribute('data-tip');

    if (!isWholeNumber(value)) {
      state.tipPercent = 0;
      calculate();
      return;
    }

    const num = toNumber(value);
    state.tipPercent = num / 100;
    calculate();
  });
});

// custom tip input
el.customTip.addEventListener('input', (e) => {
  const value = e.target.value.trim();

  if (!isWholeNumber(value)) {
    state.tipPercent = 0;
    calculate();
    return;
  }

  const num = toNumber(value);
  state.tipPercent = num / 100;
  calculate();
});

// number-of-people input
el.people.addEventListener('input', (e) => {
  const value = e.target.value.trim();

  if (!isWholeNumber(value)) {
    state.totalPeople = 0;
    calculate();
    return;
  }

  const num = toNumber(value);
  // console.log(num)
  state.totalPeople = num;
  calculate();
});

const updateDisplay = (perPersonTip, perPersonTotal) => {
  tipPerPerson.innerText = `$${perPersonTip}`;
  totalPerPerson.innerText = `$${perPersonTotal}`;
};

const calculate = () => {
  if (
    state.billAmount === '' ||
    state.tipPercent === '' ||
    state.totalPeople === ''
  ) {
    return;
  }

  if (state.billAmount > 0 && state.tipPercent >= 0 && state.totalPeople > 0) {
    tipTotal = state.billAmount * state.tipPercent;
    subTotal = state.billAmount + tipTotal;

    const perPersonTip = (tipTotal / state.totalPeople).toFixed(2);
    const perPersonTotal = (subTotal / state.totalPeople).toFixed(2);
    // console.log(perPersonTip, perPersonTotal);
    updateDisplay(perPersonTip, perPersonTotal);
  }
};

el.reset.addEventListener('click', () => {
  // clear inputs
  state.billAmount = 0;
  state.tipPercent = 0;
  state.totalPeople = 0;

  // clear state
  el.bill.value = '';
  el.customTip.value = '';
  el.people.value = '';

  // reset innerText
  el.tipPerPerson.innerText = '$0.00';
  el.totalPerPerson.innerText = '$0.00';

  // return focus to bill input
  el.bill.focus();

  // return reset button class
  el.reset.classList.toggle('completed');
});
