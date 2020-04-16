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

    getSelected() {
        return this.selected;
    };


}

class CreateTable {
    constructor(arr) {
        this.arr = arr;
        this.columns = this.getColumns(arr);
        this.table = document.createElement('table');
        this.table.className = 'table';
        this.table();
        this.render();
    }

    table() {
        let self = this;
        arr.forEach((item) => {
            new createTr(item, self.columns, self.table);
        });

        new createHr(this.columns, this.table);
        document.body.append(this.table);
    }

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

class createTr {
    constructor(item, columns, table) {
        this.item = item;
        this.columns = columns;
        this.table = table;
        this.tr = document.createElement('tr');
        this.tr();
    }

    tr() {
        this.table.append(tr);
        let self = this;
        this.columns.forEach((key) => {
            if (self.item.hasOwnProperty(key)) {
                new createTd(self.tr, self.item[key], self.cb, self.item)
            } else {
                new createTd(self.tr, '', self.cb, self.item);
            }
        });
        this.tr.addEventListener('click', function () {
            self.cb(self.item);
            new rowClick(self.tr, self, self.item);
        });
    }

}

class rowClick {
    constructor(tr, self, item) {
        this.tr = tr;
        this.item = item;
        this.click();
    }

    click() {
        let self = this;
        if (this.tr.classList.contains('selected')) {
            this.tr.classList.remove('selected');
            self.selected = self.selected.filter(function (itm) {
                return itm.id !== self.item.id;
            });
        } else {
            this.tr.classList.add('selected');
            self.selected.push(self.item);
        }
    }
}

class createTd {
    constructor(tr, content) {
        this.tr = tr;
        this.content = content;
        this.td = document.createElement('td');
        this.td();
    }

    td() {
        let self = this;
        this.tr.append(this.td);
        if (Array.isArray(self.content)) {
            self.content.forEach((item) => {
                if (self.isElement(item)) {
                    self.td.append(item);
                }
            });
        } else {
            if (self.isElement(self.content)) {
                self.append(self.content);
            } else {
                self.td.innerHTML = self.content;
            }
        }
    }
}

class createHr {
    constructor(columns, table) {
        this.columns = columns;
        this.table = table;
        this.tr = document.createElement('tr');
        this.hr();
    }

    hr() {
        this.columns.forEach((item) => {
            let th = document.createElement('th');
            th.innerText = item;
            this.tr.append(th);
        });
        new CreateTable.prepend(this.tr);
    }
}

//let clb = (clickValue) => console.log(clickValue);


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
    let table = new Table(data, (clickValue) => console.log(clickValue));

    function createCheckbox(item) {
        let self = this;
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('myCheckboxInput');

        checkbox.addEventListener('change', function (e) {

            let tr = e.target.parentElement.parentElement.parentElement;
            table.rowClick(tr, self, item);

        });

        let label = document.createElement('label');
        let span = document.createElement('span');
        span.classList.add('ourBox');
        label.append(checkbox);
        label.append(span);
        return label;
    }

    table.arr = data.map((item) => {
        let subActions = [];
        let label = createCheckbox(item);
        //checkbox.
        subActions.push(label);
        delete item['bundle_pivot'];
        delete item['bundle_part_data'];
        return Object.assign({'action': subActions}, item);
    });

    table.render();
});
