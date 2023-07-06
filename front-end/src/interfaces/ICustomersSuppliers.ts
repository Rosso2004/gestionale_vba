import {IResourcesType} from "./IResourcesType";
import {IResourcesFunction} from "./IResourcesFunction";

export interface ICustomersSuppliers {
    id: string;
    type: IResourcesType;
    function: IResourcesFunction;
    name: string;
    city: string;
    address: string;
    cap: string;
    phone_number: string;
    email: string;
    piva: string;
    iban: string
}