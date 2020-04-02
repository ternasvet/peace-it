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

// let TableModel = function (model) {
//     this.data = data;
//     this.columns = [];
//     this.div = document.querySelector('.wrapper');
//     this.div.classList.add('table');
//
// };

let TABLE = function (data) {
    const obj = {
        table: document.createElement('table'),
        columns: [],
        data: data,
        element: document.querySelector('.wrapper'),
        getColumns: () => {
            this.data.forEach((item) => {
                console.log(item);
                let self = this;
                if (typeof item === 'object') {
                    for (let key in item) {
                        if (!self.columns.includes(key)) {
                            self.columns.push(key);
                        }
                    }
                }
            });
            return this.columns;
        },
        createTable: () => {
           // this.element.classList.add('table');
            this.columns = this.getColumns();
            console.log(this.columns);
            let tr = document.createElement('tr');
            this.columns.forEach((key) => {
                let th = document.createElement('th');
                th.innerHTML = key;
                tr.append(th);
            });
            this.table.append(tr);
            this.data.forEach(function (row) {
                let self = this;
                console.log(row);
                let tr = TR(row);
                self.table.append(tr);

            });
            return table;

        },


        render: function () {
            return this.createTable();
        },

    };

    return obj.render();
};


let TR = function (row) {
    console.log(row);
      if (typeof row !== 'object') {
        return;
    }
    let tr = document.createElement('tr');
    let columns = getColumns();
    columns.forEach((key) => {
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

let TD = function (item) {
    let td = document.createElement('td');
    td.innerHTML = item;
    td.addEventListener('click', function () {
        console.log(item);
    });
    return td;
};

let model = new TABLE(arr);
model.render();
console.log(model);
