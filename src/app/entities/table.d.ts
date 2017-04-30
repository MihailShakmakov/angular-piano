declare namespace entities.table {
    interface IColumnField {
        show: boolean,
        clickable: boolean
    }

    export interface IColumns {
        author: IColumnField,
        theme: IColumnField,
        tags: IColumnField,
        answers: IColumnField
    }
}