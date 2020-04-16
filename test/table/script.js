let items = [{
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


class Table {
    columns = [];

    constructor(arr, cb) {
        this.arr = arr;
        this.cb = cb;
        this.selected = [];

        let btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerText = 'Выбранные элементы';
        document.body.append(btn);
        let self = this;
        btn.addEventListener('click', function () {
            console.log(self.selected);
        });
    }

    table(arr) {
        let columns = this.getColumns(arr);
        let table = document.createElement('table');
        table.className = 'table';
        let self = this;
        arr.forEach((item) => {
            self.createTr(item, columns, table);
        });

        this.createHr(columns, table);
        document.body.append(table);

    };

    createTr(item, columns, table) {
        let tr = document.createElement('tr');
        table.append(tr);
        let self = this;
        columns.forEach((key) => {
            if (item.hasOwnProperty(key)) {
                self.createTd(tr, item[key])
            } else {
                self.createTd(tr, '');
            }
        });
        tr.addEventListener('click', function () {
            self.rowClick(tr, self, item);
        })
    };

    rowClick(tr, self, item) {
        self.cb(item);
        let checkbox = tr.querySelector('.myCheckboxInput');
        if (tr.classList.contains('selected')) {
            tr.classList.remove('selected');
            self.selected = self.selected.filter(function (itm) {
                return itm.id !== item.id;
            });
            checkbox.checked = false;
        } else {
            tr.classList.add('selected');
            self.selected.push(item);
            checkbox.checked = true;
        }
    }

    createTd(tr, content) {
        let td = document.createElement('td');
        tr.append(td);
        if (Array.isArray(content)) {
            content.forEach((item) => {
                if (this.isElement(item)) {
                    td.append(item);
                }
            });
        } else {
            if (this.isElement(content)) {
                td.append(content);
            } else {
                td.innerHTML = content;
            }
        }
    };

    createHr(columns, table) {
        let tr = document.createElement('tr');
        columns.forEach((item) => {
            let th = document.createElement('th');
            th.innerText = item;
            tr.append(th);
        });
        table.prepend(tr);
    };

    getSelected() {
        return this.selected;
    };

    render() {
        this.table(this.arr);
    };


    getColumns(arr) {
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
    };

    isElement(o) {
        return (
            //проверка является ли объект DOM элементом
            typeof HTMLElement === "object" ? o instanceof HTMLElement :
                o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
        );
    };
}

let clb = (clickValue) => console.log((clickValue));


const fetchData = (url) => {
    if (!IS_API_WORKING) {
        if (url === 'parts') {
            return Promise.resolve(items);
        }
        if (url.indexOf('parts') !== -1) {
            return Promise.resolve(items);
        }

    }
    return fetch(API_URL + url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            return response.data;
        });
};

fetchData('parts').then((data) => {
    let table = new Table(data, clb);

    function createCheckbox(item) {
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('myCheckboxInput');
        return checkbox;
    }

    table.arr = data.map((item) => {
        let subActions = [];
        let label = createCheckbox(item);
        subActions.push(label);
        delete item['bundle_pivot'];
        delete item['bundle_part_data'];
        return Object.assign({'action': subActions}, item);
    });

    table.render();
});
