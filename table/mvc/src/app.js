import UserModel from "./Models/UserModel.js";
import TableView from "./Views/TableView.js";

let sveta = new UserModel('Света', 'Попова', 24);

let users = [
    new UserModel('Света', 'Попова', 24),
    new UserModel('Леха', 'Попов', 34),
    new UserModel('Данил', 'Попов', 11)
];


users.forEach((user) => (new TableView(user)).renderHTML());