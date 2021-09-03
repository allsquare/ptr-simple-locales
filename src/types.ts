export type ResourcesLeafType = string | Function | Array<any>;
export type ResourcesNodeType = ResourcesType | ResourcesLeafType;
export type ResourcesType = { [key: string]: ResourcesNodeType };
