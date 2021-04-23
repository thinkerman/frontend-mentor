let currentInvoice = localStorage.getItem('currentInvoice');
const PARSED_DETAILS = JSON.parse(currentInvoice);
let invoiceStatusButton = document.querySelector('.invoice-status');

invoiceStatusButton.classList.add(PARSED_DETAILS.status);
invoiceStatusButton.textContent = PARSED_DETAILS.status;

console.log(JSON.parse(currentInvoice));