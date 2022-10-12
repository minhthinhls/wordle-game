/* eslint valid-jsdoc: "off", complexity: "off", no-unused-vars: "off", @typescript-eslint/naming-convention: "off" */

/** @ts-nocheck - Turn this on to ignore this file !*/

"use strict";

/**
 ** Imported TypeScript ES6 Types
 **/
import type {ObjectValues, Paths/*, LiteralPaths*/} from "@types";
import type {RenderedCell, DataIndex} from "rc-table/lib/interface";
import type {ColumnType} from "antd/lib/table";
import * as React from "react";

export interface IColumnTable<RecordType> extends Array<IColumnType<RecordType>> {
    /* [[Interface Attributes Placeholder]] */
}

export interface IColumnType<RecordType, DataKey extends keyof RecordType = keyof RecordType> extends ColumnType<RecordType> {
    /** TODO: Later on ${DataIndex} will be removed in Version 2 Application. Consider refactor Ant Design Table Types !*/
    dataIndex?: '' | DataIndex | DataKey | Paths<RecordType>/* | LiteralPaths<RecordType>*/;
    onFilter?: (value: string | number | boolean, record: RecordType) => boolean;
    render?: (value: RecordType[DataKey] & ObjectValues<RecordType> | any, record: RecordType, index: number) => React.ReactNode | RenderedCell<RecordType>;
    children?: IColumnTable<RecordType>;
}

export interface ITable<RecordType> extends Array<IColumnType<RecordType>> {
    /* [[Interface Attributes Placeholder]] */
}
