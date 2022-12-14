export interface IWorker {
    id: number;
    name: string;
    surname: string;
    color: string;
    photo: string;
    active: boolean;
}

export interface IClinet {
    id: number;
    name: string;
    surname: string;
    phone: string;
}

export interface IService {
    id: number;
    name: string;
    time: string;
}

export interface IVisit {
    id: number;
    id_client: number;
    id_worker: number;
    id_service: number;
    date: string; //typ ?
    time: string; //typ ?
    status: boolean;
}