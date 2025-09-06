import Transactions from '../../network/transactions';

const Add = {
  async init() {
    this._initialUI();
    this._initialListener();
  },

  _initialUI() {
    const listInputRadioTransactionType = [
      { inputId: 'recordType1', value: 'income', caption: 'Pemasukan', required: true },
      { inputId: 'recordType2', value: 'expense', caption: 'Pengeluaran', required: true },
    ];

    const inputRadioTransactionTypeAdd = document.querySelector('#inputRadioTransactionTypeAdd');
    inputRadioTransactionTypeAdd.setAttribute(
      'listRadio',
      JSON.stringify(listInputRadioTransactionType),
    );
  },

  _initialListener() {
    const addFormRecord = document.querySelector('#addRecordForm');
    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  async _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData(formData)) {
      console.log('formData', formData);

      try {
        await Transactions.store(formData);
        window.alert('New transaction added successfully');
        this._goToDashboardPage();
      } catch (error) {
        console.error(error);
      }
    }
  },

  _getFormData() {
    const nameInput = document.querySelector('#validationCustomRecordName');
    const amountInput = document.querySelector('#validationCustomAmount');
    const dateInput = document.querySelector('#validationCustomDate');
    const descriptionInput = document.querySelector('#validationCustomNotes');
    const typeInput = document.querySelector('input[name="recordType"]:checked');

    return {
      name: nameInput.value,
      amount: Number(amountInput.value),
      date: new Date(dateInput.value),
      description: descriptionInput.value,
      type: typeInput.value,
    };
  },

  _validateFormData(formData) {
    return Object.values(formData).every((item) => item !== '');
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Add;
