// let arr = [{
//     name: 'Don',
//     surname: 'Smith',
//     age: 25,
//     country: 'Ukraine',
//     male: 'man'
// }, {
//     name: 'Mikle',
//     surname: 'Miller',
//     age: '',
//     country: 'Germany'
// }, {
//     name: 'Michael',
//     surname: 'Kors',
//     age: 60,
//     country: 'USA',
//     male: ''
// }, {
//     name: 'Denis',
//     surname: '',
//     age: 32,
//     country: '',
//     male: 'man'
// }, {
//     name: 'Shani',
//     surname: 'Mizrachi',
//     age: 34,
//     country: 'Israel',
//     male: 'women'
// }
// ];

// Модальное окно
let modal = document.querySelector('.modal-background');
let closeButton = document.querySelector('.close');
let modalInputKey = document.querySelector('.myModal .input-key');
let modalInputValue = document.querySelector('.myModal .input-value');
let modalAddButton = document.querySelector('.myModal .btn-tbl');
let modalCreateButton = document.querySelector('.myModal .btn-create');
let outText = document.querySelector('.out');

// Таблица с кнопками
let wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

let modalButton = document.createElement('button');
modalButton.innerText = 'Открыть модальное окно для добавления элементов';

let table = document.createElement('table');
table.classList.add('table-dark', 'table-bordered', 'table');

wrapper.append(modalButton);
wrapper.append(table);
document.body.append(wrapper);

// Пагинация
let pagination = document.querySelector('.pagin');

function tableObj(arr) {
    let modalData = {};

    modalButton.addEventListener('click', showModal);
    //модальное окно закрывается на клик за пределами модального окна
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    //модальное окно закрывается на клик x
    closeButton.addEventListener('click', closeModal);

    modalAddButton.addEventListener('click', function () {
        let key = modalInputKey.value;
        let value = modalInputValue.value;

        if (key && value) {
            modalData[key] = value;

            modalInputKey.value = '';
            modalInputValue.value = '';
            outText.innerHTML += `${key}: ${modalData[key]}<br>`;
        }
    });

    modalCreateButton.addEventListener('click', function () {
        arr.push(modalData);
        render(arr);
        modalData = {};
        closeModal();
        outText.innerHTML = '';
    });
}

function render(arr) {
    let countPage = 5;
    let page = 1;
    table.innerHTML = '';
    let tr2 = document.createElement('tr');
    let columnNames = getColumns(arr);
    if (Array.isArray(columnNames)) {
        columnNames.forEach((item) => {
            let th = document.createElement('th');
            th.innerText = item;
            tr2.append(th);
        });
        table.prepend(tr2);
        paginationPage(arr);
    }
    if (Array.isArray(arr)) {
        arr.slice(countPage * (page - 1), countPage * page).forEach((item) => {
            arr.forEach((item) => {
                let tr = document.createElement('tr');

                columnNames.forEach((key) => {
                    let td = document.createElement('td');
                    td.innerText = item[key] || '';
                    tr.append(td);
                });
                table.append(tr);
            });
            paginationPage();
        });

    }

    document.body.append(table);

}

function getColumns(arr) {
    let columns = [];
    arr.forEach((item) => {
        if (typeof item === 'object') {
            for (let key in item) {
                if (!columns.includes(key)) {
                    columns.push(key);
                }
            }
        }
    });

    return columns;
}

function showModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}


fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
    .then(function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            response.json().then(function (data) {
                tableObj(data);
                render(data);
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });

//
function paginationPage(arr) {
    let pagerWrapper = document.createElement('div');
    pagerWrapper.classList.add('pager-wrapper');

    let countPage = 5;
    //let page = 1;
    let pageAll = Math.ceil(arr.length / countPage); //кол-во страниц
    let pagerElems = [];
    for (let i = 0; i < pageAll; i++) {
        let pagerItem = document.createElement('span');
        pagerItem.innerHTML = i + 1;
        pagerItem.classList.add('pager-item');
        console.log(pagerItem.innerHTML);
        pagerItem.addEventListener('click', function () {
            let page = Number(pagerItem.innerHTML);
            console.log(page);
            this.page = page;
            render();
        });

        pagerElems.push(pagerItem);
        pagerWrapper.append(pagerItem);
    }

    wrapper.append(pagerWrapper);
}


//paginationPage(arr);
