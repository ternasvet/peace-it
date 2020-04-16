let arr = [{
    name: 'Don',
    surname: 'Smith',
    age: 25,
    country: 'Ukraine',
    male: 'man'
}, {
    name: 'Mikle',
    surname: 'Miller',
    age: '',
    country: 'Germany'
}, {
    name: 'Michael',
    surname: 'Kors',
    age: 60,
    country: 'USA',
    male: ''
}, {
    name: 'Denis',
    surname: '',
    age: 32,
    country: '',
    male: 'man'
}, {
    name: 'Shani',
    surname: 'Mizrachi',
    age: 34,
    country: 'Israel',
    male: 'women'
}
];
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

        closeModal();
        outText.innerHTML = '';
        setDataForTable(arr);
    });
}

function render(arr) {
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
    }
    if (Array.isArray(arr)) {
        arr.forEach((item) => {
            let tr = document.createElement('tr');

            columnNames.forEach((key) => {
                let td = document.createElement('td');
                td.innerText = item[key] || '';
                tr.append(td);
            });
            table.append(tr);
        });
    }
    document.body.append(table);

}

render(getDataForTable(arr));

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

tableObj(arr);

function getDataForTable(defaultData) {
    try {
        if (localStorage.getItem('myObj')) {
            console.log(localStorage.getItem('myObj'));
            return JSON.parse(localStorage.getItem('myObj'));
        }

    } catch (e) {
       console.log(e);
    }


    return defaultData;
}

function setDataForTable(data) {
    localStorage.setItem('myObj', JSON.stringify(data));
}
