export interface IWorker {
    id: number;
    name: string;
    surname: string;
    color: string;
    photo: string;
    active: boolean;
    checked: boolean;
}

export interface ICustomer {
    id: number;
    name: string;
    surname: string;
    phone: string;
}

export interface IOffer {
    id: number;
    name: string;
    time: string;
    price: number;
}

export interface IVisit {
    id: number;
    customer: ICustomer;
    worker: IWorker;
    offer: IOffer;
    date: Date; //typ ?
    time: Date; //typ ?
    status: boolean;
}