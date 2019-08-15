export interface IActionAdd {
    type: string;
    payload: number;
}

export interface IActionPopulate {
    type: string;
    payload: IData[];
}

export interface IData {
    imageURL: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    length?: number;
    index?: number;
    show?: boolean;
    onHide?(): void;
}
