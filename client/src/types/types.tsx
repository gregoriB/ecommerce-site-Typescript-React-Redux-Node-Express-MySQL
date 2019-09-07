export interface IAAdd {
    type: string;
    payload: number;
}

export interface IAPopulate {
    type: string;
    payload: IData[];
}

export interface IData {
    imageURL?: string | undefined;
    name?: string | undefined;
    descShort?: string | undefined;
    descLong?: string | undefined;
    price?: number | undefined;
    stock?: number | undefined;
    length?: number | undefined;
    index?: number | undefined;
    show?: boolean | undefined;
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
