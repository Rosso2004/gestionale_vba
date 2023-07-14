export interface IOrders {
    id: string;
    manager: {
        id: string;
        name: string;
    };
    customer: {
        id: string;
        name: string;
    };
    name: string;
    status: {
        id: string;
        name: string;
    };
    type: {
        id: string;
        name: string;
    };
    start_date: string;
    end_date: string;
    note: string;
}