

const MAIN_ELEMENT = document.querySelector('main');
MAIN_ELEMENT.classList.remove('empty');


const INVOICE_CARD = document.querySelector('.invoice-card');



// let singleInvoice = document.querySelector('.invoice-card');


function invoiceCard(index, id, name, paymentDue, amount, status, address) {
    let card = document.createElement('div');
    card.id = id;
    card.classList.add('invoice-card');

    let cardInner = document.createElement('div');
    cardInner.classList.add('invoice-card-inner');

    cardInner.innerHTML = `<div class="card-details">
                                <p class="invoice-number">#${id}</p>
                                <p class="invoice-name">${name}</p>
                                <p class="date">Due ${paymentDue}</p>
                                <p class="amount">${amount.toLocaleString('en-US', { style: 'currency', currency: 'GBP', })}</p>
                                <div class="invoice-button" >
                                    <span type="button" class="invoice-status ${status}"  
                                        data-id="${id}" 
                                        data-index="${index}" 
                                        >${status}</span>
                                    <img src="./assets/icon-arrow-right.svg" alt="icon-arrow-right">
                                </div>
                            </div>`;

    card.append(cardInner);
    return card;
}


const INVOICE_SECTION = document.querySelector('#invoice-section');

MAIN_ELEMENT.append(INVOICE_SECTION)

if (!localStorage.getItem('invoice-data')) {
    // load all invoices
    fetch('./data.json').then(response => response.json()).then(data => {
        console.log(data)


        document.querySelector('#invoice-count').textContent = `There are ${data.length} invoices`;

        // save all data in localstorage
        if (!localStorage.getItem('invoice-data')) {
            localStorage.setItem('invoice-data', JSON.stringify(data))
        }

        for (const index in data) {
            const CURRENTDATA = data[index];
            INVOICE_SECTION.append(invoiceCard(index, CURRENTDATA.id, CURRENTDATA.clientName, CURRENTDATA.paymentDue, CURRENTDATA.total, CURRENTDATA.status, CURRENTDATA.senderAddress))
        }


    })
} else {
    const data = JSON.parse(localStorage.getItem('invoice-data'))
    for (const index in data) {
        const CURRENTDATA = data[index];
        INVOICE_SECTION.append(invoiceCard(index, CURRENTDATA.id, CURRENTDATA.clientName, CURRENTDATA.paymentDue, CURRENTDATA.total, CURRENTDATA.status, CURRENTDATA.senderAddress))
    }
}




const CARD_SECTION = document.querySelector('#invoice-section');


CARD_SECTION.addEventListener('click', event => {
    if (event.target.classList.contains('invoice-status')) {
        console.log(event.target.dataset)

        // get index of current item
        const INDEX = event.target.dataset.index;
        // get all data
        const DATA = JSON.parse(localStorage.getItem('invoice-data'));

        console.log(DATA[INDEX]);
        localStorage.setItem('invoice-idx', INDEX);
        let url = document.location.pathname.split('/');
        url[url.length - 1] = 'single-invoice.html';
        let newUrl = url.join('/');
        window.location.pathname = newUrl
    }
})


function emptyBodyContent() {
    const EMPTY_BODY_CONTENT = document.createElement('section');
    EMPTY_BODY_CONTENT.id = "test";
    EMPTY_BODY_CONTENT.innerHTML = `
            <section id="empty-image">
                    <div id="empty-result">
                        <img src="./assets/illustration-empty.svg" alt="Empty result image">
                        <h4>There's nothing here</h4>
                        <p>Create an invoice by clicking the New Invoice button and get started</p>
                    </div>
            </section>
        `;
    return (EMPTY_BODY_CONTENT)
}

// check if invoice is empty
if (MAIN_ELEMENT.classList.contains('empty')) {
    MAIN_ELEMENT.append(emptyBodyContent())
} else {
    // MAIN_ELEMENT.innerHTML = ''
}






