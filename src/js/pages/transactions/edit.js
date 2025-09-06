import Transactions from "../../network/transactions";

const Edit = {
  async init() {
    this._initialUI();
    await this._initialData();
    this._initialListener();
  },

  _initialUI() {
    const listInputRadioTransactionType = [
      { inputId: 'recordType1', value: 'income', caption: 'Pemasukan', required: true },
      { inputId: 'recordType2', value: 'expense', caption: 'Pengeluaran', required: true },
    ];

    const inputRadioTransactionTypeEdit = document.querySelector('#inputRadioTransactionTypeEdit');
    inputRadioTransactionTypeEdit.setAttribute(
      'listRadio',
      JSON.stringify(listInputRadioTransactionType)
    );
  },

  async _initialData() {
    const transactionId = this._getTransactionId();
    if (!transactionId) {
      alert('Data dengan id yang dicari tidak ditemukan');
      return;
    }

    try {
      const transaction = await Transactions.getById(transactionId);
      this._populateTransactionToForm(transaction);
    } catch (error) {
      console.error(error);
    }
  },

  _initialListener() {
    const editForm = document.querySelector('#editRecordForm');
    editForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopPropagation();
      editForm.classList.add('was-validated');
      await this._sendPost();
    });
  },

  async _sendPost() {
    const formData = this._getFormData();
    if (!this._validateFormData(formData)) return;

    try {
      await Transactions.update({ ...formData, id: this._getTransactionId() });
      window.alert(`Transaction with id ${this._getTransactionId()} has been edited`);
      this._goToDashboardPage();
    } catch (error) {
      console.error(error);
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
      type: typeInput?.value,
    };
  },

  _populateTransactionToForm(transaction) {
    document.querySelector('#validationCustomRecordName').value = transaction.name;
    document.querySelector('#validationCustomAmount').value = transaction.amount;
    document.querySelector('#validationCustomDate').value = new Date(transaction.date).toISOString().slice(0, 16);
    document.querySelector('#validationCustomNotes').value = transaction.description;

    document.querySelectorAll('input[name="recordType"]').forEach((item) => {
      item.checked = item.value === transaction.type;
    });
  },

  _validateFormData(formData) {
    const requiredFields = ['name', 'amount', 'date', 'description', 'type'];
    return requiredFields.every(key => formData[key] !== '' && formData[key] !== null && formData[key] !== undefined);
  },

  _getTransactionId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Edit;
