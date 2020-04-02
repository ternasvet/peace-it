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
let TableModel = function (data) {
    this.data = data;
    this.columns = [];
    this.div = document.querySelector('.wrapper');
    this.div.classList.add('table');

    this.getColumns = function () {
        this.data.forEach((item) => {
            if (typeof item === 'object') {
                for (let key in item) {
                    if (!this.columns.includes(key)) {
                        this.columns.push(key);
                    }
                }
            }
        });

    };

    this.add = function (item) {
        console.log(item);
        this.data.push(item);
        this.getColumns();
    };


    this.getColumns();
};


let TableView = function (model) {
    this.model = model;
    this.show = function () {
        console.log(this.model);
    };

    this.render = function () {
        return this.TABLE(this.model.data);
    };

    this.TABLE = function (data) {
        let self = this;
        let table = document.createElement('table');
        let tr = document.createElement('tr');
        this.model.columns.forEach((key) => {
            let th = document.createElement('th');
            th.innerHTML = key;
            tr.append(th);
        });
        table.append(tr);
        data.forEach(function (row) {
            console.log(row);
            let tr = self.TR(row);
            table.append(tr);

        });
        return table;
    };

    this.TR = function (row) {
        if (typeof row !== 'object') {
            return;
        }
        let tr = document.createElement('tr');
        this.model.columns.forEach((key) => {
            if (row.hasOwnProperty(key)) {
                let td = this.TD(row[key]);
                tr.append(td);
            } else {
                let td = this.TD('');
                tr.append(td);
            }
        });

        tr.addEventListener("click", function () {
            console.log(row);
        });

        return tr;
    };

    this.TD = function (item) {
        let td = document.createElement('td');
        td.innerHTML = item;
        td.addEventListener('click', function () {
            console.log(item);
        });
        return td;
    };

    this.model.div.append(this.render())

};

let model = new TableModel(arr);
let tview = new TableView(model);
tview.render();
