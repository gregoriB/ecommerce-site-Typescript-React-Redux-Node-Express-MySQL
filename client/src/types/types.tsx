export interface IAAdd {
    type: string;
    payload: number;
}

export interface IAPopulate {
    type: string;
    payload: IData[];
}

export interface IData {
    imageURL: string;
    name: string;
    descShort: string;
    descLong: string;
    price: number;
    length?: number;
    index?: number;
    show?: boolean;
    category?: string;
    onHide?(): void;
}

export interface IAChangeFilter {
    type: string;
    payload: string[] | undefined[];
}

export interface IAUpdateSearch {
    type: string;
    payload: string;
}

export interface IUpdateUserData {
    type: string;
    payload: any;
}
