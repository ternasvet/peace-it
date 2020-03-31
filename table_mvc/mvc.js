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
let TableController = function (TableModel, TableView) {
    this.TableModel = TableModel;
    this.TableView = TableView;
};

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
        let data = this.model.data;
        let columns = this.model.columns;
        let result = `<table>`;
        data.forEach((row) => {
            result += `<tr>`;
            columns.forEach((key) => {
                if (row.hasOwnProperty(key)) {
                    result += `<th>${key}</th>`;
                    result += `<td>${row[key]}</td>`;
                } else {
                    result += `<td></td>`;
                }


                // if (Array.isArray(columnNames)) {
                //     columnNames.forEach((item) => {
                //         let th = document.createElement('th');
                //         th.innerText = item;
                //         tr2.append(th);
                //     });
                //     table.prepend(tr2);
                // }

            });
            result += `</tr>`;
        });
        result += `</table>`;

        return result;
    };
    let self = this;
    this.model.div.innerHTML = self.render();

};

let model = new TableModel(arr);
let tview = new TableView(model);
tview.render();
