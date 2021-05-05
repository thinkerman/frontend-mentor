function dateToYMD(date) {
    var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
}


let ALL_INVOICES = localStorage.getItem('invoice-data');
let xx = JSON.parse(ALL_INVOICES);
function updateInvoice(index, field, value) {

    if (!index || !field) return;

    if (typeof (field) == "object" && field.length < 3) {
        xx[index][field[0]][field[1]] = value;
    } else {
        xx[index][field] = value;
    }
    localStorage.setItem('invoice-data', JSON.stringify(xx))

}

const PARSED_INVOICE = JSON.parse(ALL_INVOICES)[localStorage.getItem('invoice-idx')];
const INVOICE_STATUS_BUTTON = document.querySelector('.invoice-status');

INVOICE_STATUS_BUTTON.classList.add(PARSED_INVOICE.status);
INVOICE_STATUS_BUTTON.textContent = PARSED_INVOICE.status;

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

const ITEMS_LIST = PARSED_INVOICE.items;
const PYMNT_TERMS = document.querySelector('#popup-to-post-payment-terms');
const EDIT_HEADER = document.querySelector('#edit-header');
const MARK_PAID = document.querySelector('#mark-paid');
const SAVE_CHANGES = document.querySelector('#save-changes');
const DELETE = document.querySelector('#delete');

let SENDER_STREET = document.querySelector('.seller-street');
let SENDER_CITY = document.querySelector('.seller-city');
let SENDER_POSTCODE = document.querySelector('.seller-postcode');
let SENDER_COUNTRY = document.querySelector('.seller-country');


function populateFields() {
    EDIT_HEADER.textContent = `EDIT #${PARSED_INVOICE.id}`

    INVOICE_ID.textContent = `#${PARSED_INVOICE.id}`;
    ITEM_NAME.textContent = `${PARSED_INVOICE.description}`;

    CREATED_DATE.textContent = `${dateToYMD(new Date(PARSED_INVOICE.createdAt))}`;
    PAID_DATE.textContent = `${dateToYMD(new Date(PARSED_INVOICE.paymentDue))}`;
    const BUYER_ADDRESS = PARSED_INVOICE.clientAddress;

    let clientAddress = '';
    for (const [key, value] of Object.entries(BUYER_ADDRESS)) {
        clientAddress += `${value} <br><br>`;
    }

    SENDER_STREET.textContent = PARSED_INVOICE.senderAddress.street
    SENDER_CITY.textContent = PARSED_INVOICE.senderAddress.city
    SENDER_POSTCODE.textContent = PARSED_INVOICE.senderAddress.postCode
    SENDER_COUNTRY.textContent = PARSED_INVOICE.senderAddress.country

    BUYER_ADDRESS_ELEMENT.innerHTML = clientAddress;
    BUYER_EMAIL.textContent = PARSED_INVOICE.clientEmail
    BUYER_NAME.textContent = PARSED_INVOICE.clientName
}

populateFields()




for (const [key, value] of Object.entries(ITEMS_LIST)) {

    const ITEM = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdQty = document.createElement('td');
    let tdPrice = document.createElement('td');
    let tdTotal = document.createElement('td');
    tdName.textContent = value.name
    tdQty.textContent = value.quantity
    tdPrice.textContent = value.price;
    tdTotal.textContent = value.total;



    ITEM.append(tdName, tdQty, tdPrice, tdTotal);
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
        if (PYMNT_TERMS[idx].value == PARSED_INVOICE.paymentTerms) {
            PYMNT_TERMS.selectedIndex = idx;
        }
    }

})

const CANCEL_BUTTON = document.querySelector('#cancel');
CANCEL_BUTTON.addEventListener('click', e => {
    BACKDROP.classList.toggle('active')
})

const SENDER_STREET_ADDRESS = document.querySelector('#popup-street-from-address');
const SENDER_CITY_NAME = document.querySelector('#popup-from-city');
const SENDER_POST_CODE = document.querySelector('#popup-from-post-code');
const SENDER_COUNTRY_NAME = document.querySelector('#popup-from-street-address');


const CLIENT_NAME = document.querySelector('#popup-clients-name');
const CLIENT_EMAIL = document.querySelector('#popup-clients-email');
const CLIENT_STREET = document.querySelector('#popup-street-to-address');
const CLIENT_CITY = document.querySelector('#street-address');
const CLIENT_COUNTRY = document.querySelector('#popup-to-post-country');
const CLIENT_PC = document.querySelector('#popup-to-post-code');
const INV_D = document.querySelector('#popup-to-post-invoice-date');
const PYMT_TERMS = document.querySelector('#popup-to-post-payment-terms');
const PRJ_DESC = document.querySelector('#project-description');
const ADD_ITEM = document.querySelector('#add-new-item');


SENDER_STREET_ADDRESS.value = PARSED_INVOICE.senderAddress.street;
SENDER_CITY_NAME.value = PARSED_INVOICE.senderAddress.city;
SENDER_POST_CODE.value = PARSED_INVOICE.senderAddress.postCode;
SENDER_COUNTRY_NAME.value = PARSED_INVOICE.senderAddress.country;

CLIENT_NAME.value = PARSED_INVOICE.clientName;
CLIENT_EMAIL.value = PARSED_INVOICE.clientEmail;
CLIENT_STREET.value = PARSED_INVOICE.clientAddress.street;
CLIENT_CITY.value = PARSED_INVOICE.clientAddress.city;
CLIENT_COUNTRY.value = PARSED_INVOICE.clientAddress.country;
CLIENT_PC.value = PARSED_INVOICE.clientAddress.postCode;
INV_D.value = PARSED_INVOICE.paymentDue;
PYMT_TERMS.value = PARSED_INVOICE.paymentTerms;
PRJ_DESC.value = PARSED_INVOICE.description;


const INDEX = localStorage.getItem('invoice-idx');

MARK_PAID.addEventListener('click', (e) => {
    if (PARSED_INVOICE.status == 'paid') return;

    PARSED_INVOICE.status = 'paid';

    updateInvoice(INDEX, 'status', 'paid');

    INVOICE_STATUS_BUTTON.classList.remove('pending');
    INVOICE_STATUS_BUTTON.classList.add('paid');
    INVOICE_STATUS_BUTTON.textContent = 'paid';
});
SAVE_CHANGES.addEventListener('click', () => {

    PARSED_INVOICE.senderAddress.street = SENDER_STREET_ADDRESS.value;
    PARSED_INVOICE.senderAddress.city = SENDER_CITY_NAME.value
    PARSED_INVOICE.senderAddress.postCode = SENDER_POST_CODE.value;
    PARSED_INVOICE.senderAddress.country = SENDER_COUNTRY_NAME.value;

    PARSED_INVOICE.clientName = CLIENT_NAME.value;
    PARSED_INVOICE.clientEmail = CLIENT_EMAIL.value;
    PARSED_INVOICE.clientAddress.street = CLIENT_STREET.value;
    PARSED_INVOICE.clientAddress.city = CLIENT_CITY.value;
    PARSED_INVOICE.clientAddress.country = CLIENT_COUNTRY.value;
    PARSED_INVOICE.clientAddress.postCode = CLIENT_PC.value;
    PARSED_INVOICE.paymentDue = INV_D.value;
    PARSED_INVOICE.paymentTerms = PYMT_TERMS.value;
    PARSED_INVOICE.description = PRJ_DESC.value;



    updateInvoice(INDEX, 'clientEmail', PARSED_INVOICE.clientEmail);

    updateInvoice(INDEX, ['clientAddress', 'city'], PARSED_INVOICE.clientAddress.city);
    updateInvoice(INDEX, ['clientAddress', 'country'], PARSED_INVOICE.clientAddress.country);
    updateInvoice(INDEX, ['clientAddress', 'postCode'], PARSED_INVOICE.clientAddress.postCode);
    updateInvoice(INDEX, ['clientAddress', 'street'], PARSED_INVOICE.clientAddress.street);


    updateInvoice(INDEX, ['senderAddress', 'city'], PARSED_INVOICE.senderAddress.city);
    updateInvoice(INDEX, ['senderAddress', 'country'], PARSED_INVOICE.senderAddress.country);
    updateInvoice(INDEX, ['senderAddress', 'postCode'], PARSED_INVOICE.senderAddress.postCode);
    updateInvoice(INDEX, ['senderAddress', 'street'], PARSED_INVOICE.senderAddress.street);


    updateInvoice(INDEX, 'paymentDue', PARSED_INVOICE.paymentDue);
    updateInvoice(INDEX, 'paymentTerms', PARSED_INVOICE.paymentTerms);
    updateInvoice(INDEX, 'description', PARSED_INVOICE.description);

    let tableRows = document.querySelector('#items-list tbody');
    function GetCellValues() {
        let tdd = [];
        let total = 0;
        for (var r = 0, n = tableRows.rows.length; r < n; r++) {

            console.log(tableRows.rows[r]);

            let x = {};

            for (var c = 0, m = tableRows.rows[r].cells.length; c < m; c++) {

                x.name = tableRows.rows[r].cells[0].innerHTML;
                x.price = tableRows.rows[r].cells[1].innerHTML;
                x.quantity = tableRows.rows[r].cells[2].innerHTML;
                x.total = tableRows.rows[r].cells[3].innerHTML;
                total += x.total;

            }
            tdd.push(x);

        }
        console.log(tdd)
        return {
            tdd: tdd,
            amount: total
        };
    }
    // GetCellValues();
    // console.log(GetCellValues())
    updateInvoice(INDEX, 'items', GetCellValues().tdd);
})




DELETE.addEventListener('click', () => {
    delete PARSED_INVOICE[INDEX];
    History.back()
})


ADD_ITEM.addEventListener('click', () => {
    const ITEM = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdQty = document.createElement('td');
    let tdPrice = document.createElement('td');
    let tdTotal = document.createElement('td');
    let body = document.querySelector('#items-list tbody')

    tdName.setAttribute('contenteditable', true)
    tdQty.setAttribute('contenteditable', true)
    tdPrice.setAttribute('contenteditable', true)
    tdTotal.setAttribute('contenteditable', true)

    ITEM.append(tdName, tdQty, tdPrice, tdTotal);
    body.appendChild(ITEM);

})