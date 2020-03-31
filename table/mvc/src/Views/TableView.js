export default class TableView {
    userModel;

    constructor(TableModel) {
        this.userModel = TableModel;
    }

    render() {
        console.log(
            "Имя:", this.userModel.firstName,
            "\nФамилия:", this.userModel.lastName,
            "\nВозраст: ", this.userModel.age
        );
    }

    renderHTML() {
        document.body.insertAdjacentHTML(
            'beforeend',
            `<h2>Имя:</h2> ${this.userModel.firstName}
 <h3>Фамилия:</h3> ${this.userModel.lastName} 
<h4>Возраст:</h4> ${this.userModel.age}`
        );
    }
}