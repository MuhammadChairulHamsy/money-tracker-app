const Edit = {
  async init() {
    await this._initialData();
    await this._initialListener();
  },

  async _initialData() {
    const transactionId = Number(this._getTransactionId());

    if (!transactionId) {
      alert('Data dengan id yang dicari tidak ditemukan');
      return;
    }

    const fetchRecords = await fetch('/data/DATA.json');
    const responseRecords = await fetchRecords.json();
    const userTransactionsHistory = responseRecords.result.transactionsHistory;

    const dataRecord = userTransactionsHistory.find((item) => item.id === transactionId);

    this._populateTransactionToForm(dataRecord);
  },

  
};
