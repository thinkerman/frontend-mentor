function dateToYMD(date) {
    var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
}



let currentInvoice = localStorage.getItem('currentInvoice');
const PARSED_DETAILS = JSON.parse(currentInvoice);

let invoiceStatusButton = document.querySelector('.invoice-status');
invoiceStatusButton.classList.add(PARSED_DETAILS.status);
invoiceStatusButton.textContent = PARSED_DETAILS.status;

const INVOICE_ID = document.querySelector('.item-id');
const ITEM_NAME = document.querySelector('.item-name');
const CREATED_DATE = document.querySelector('.created-date');
const PAID_DATE = document.querySelector('.paid-date');
const BUYER_EMAIL = document.querySelector('.buyer-email');
const BUYER_NAME = document.querySelector('.buyer-name');
const BUYER_ADDRESS_ELEMENT = document.querySelector('.buyer-address');
const ITEMS_TABLE = document.querySelector('#items-table tbody');
const POPUP_ITEMS_TABLE = document.querySelector('#items-list');
const AMOUNT_DUE = document.querySelector('#invoice-amount-due');
const PARSED_INVOICE = JSON.parse(currentInvoice);
const ITEMS_LIST = PARSED_INVOICE.items;
const PYMNT_TERMS = document.querySelector('#popup-to-post-payment-terms');




INVOICE_ID.textContent = `#${PARSED_INVOICE.id}`;
ITEM_NAME.textContent = `${PARSED_INVOICE.description}`;

CREATED_DATE.textContent = `${dateToYMD(new Date(PARSED_INVOICE.createdAt))}`;
PAID_DATE.textContent = `${dateToYMD(new Date(PARSED_INVOICE.paymentDue))}`;
const BUYER_ADDRESS = PARSED_INVOICE.clientAddress;


let clientAddress = '';
for (const [key, value] of Object.entries(BUYER_ADDRESS)) {
    clientAddress += `${value} <br><br>`;
}

BUYER_ADDRESS_ELEMENT.innerHTML = clientAddress;
BUYER_EMAIL.textContent = PARSED_INVOICE.clientEmail
BUYER_NAME.textContent = PARSED_INVOICE.clientName

for (const [key, value] of Object.entries(ITEMS_LIST)) {

    const ITEM = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdQty = document.createElement('td');
    let tdPrice = document.createElement('td');
    let tdTotal = document.createElement('td');
    tdName.textContent = value.name
    tdQty.textContent = value.quantity
    tdPrice.textContent = value.price.toLocaleString('en-US', { style: 'currency', currency: 'GBP', });
    tdTotal.textContent = value.total.toLocaleString('en-US', { style: 'currency', currency: 'GBP', });



    ITEM.append(tdName);
    ITEM.append(tdQty);
    ITEM.append(tdPrice);
    ITEM.append(tdTotal);

    ITEMS_TABLE.append(ITEM);
}

let n = ITEMS_TABLE.cloneNode(true)
POPUP_ITEMS_TABLE.appendChild(n)


AMOUNT_DUE.textContent = PARSED_INVOICE.total.toLocaleString('en-US', { style: 'currency', currency: 'GBP', })


// edit invoice
const EDIT_BUTTON = document.querySelector('.edit');
const HEADER = document.querySelector('.menu-container');
const BACKDROP = document.querySelector('.popup')
EDIT_BUTTON.addEventListener('click', e => {
    BACKDROP.classList.toggle('active');
    for (let idx = 0; idx < PYMNT_TERMS.length; idx++) {
        if (PYMNT_TERMS[idx].value == PARSED_DETAILS.paymentTerms) {
            PYMNT_TERMS.selectedIndex = idx;
        }
    }

})

const CANCEL_BUTTON = document.querySelector('#cancel');
CANCEL_BUTTON.addEventListener('click', e => {
    BACKDROP.classList.toggle('active')
})
console.log(PARSED_DETAILS)
const STREET_ADDRESS = document.querySelector('#popup-street-from-address');
const SENDER_CITY = document.querySelector('#popup-from-city');
const SENDER_POST_CODE = document.querySelector('#popup-from-post-code');
const SENDER_COUNTRY = document.querySelector('#popup-from-street-address');


const CLIENT_NAME = document.querySelector('#popup-clients-name');
const CLIENT_EMAIL = document.querySelector('#popup-clients-email');
const CLIENT_STREET = document.querySelector('#popup-street-to-address');
const CLIENT_CITY = document.querySelector('#street-address');
const CLIENT_COUNTRY = document.querySelector('#popup-to-post-country');
const CLIENT_PC = document.querySelector('#popup-to-post-code');
const INV_D = document.querySelector('#popup-to-post-invoice-date');
const PYMT_TERMS = document.querySelector('#popup-to-post-payment-terms');
const PRJ_DESC = document.querySelector('#project-description');


STREET_ADDRESS.value = PARSED_DETAILS.senderAddress.street;
SENDER_CITY.value = PARSED_DETAILS.senderAddress.city;
SENDER_POST_CODE.value = PARSED_DETAILS.senderAddress.postCode;
SENDER_COUNTRY.value = PARSED_DETAILS.senderAddress.country;

CLIENT_NAME.value = PARSED_DETAILS.clientName;
CLIENT_EMAIL.value = PARSED_DETAILS.clientEmail;
CLIENT_STREET.value = PARSED_DETAILS.clientAddress.street;
CLIENT_CITY.value = PARSED_DETAILS.clientAddress.city;
CLIENT_COUNTRY.value = PARSED_DETAILS.clientAddress.country;
CLIENT_PC.value = PARSED_DETAILS.clientAddress.postCode;
INV_D.value = PARSED_DETAILS.paymentDue;
PYMT_TERMS.value = PARSED_DETAILS.paymentTerms;
PRJ_DESC.value = PARSED_DETAILS.description;
// CLIENT_NAME.value = PARSED_DETAILS.clientName;
