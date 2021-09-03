declare const CustomResourcesLeafTypeSymbol: unique symbol;
declare type CustomResourcesLeafType = {
    [CustomResourcesLeafTypeSymbol]: true;
};
export declare type ResourcesLeafType = string | Function | Array<any> | CustomResourcesLeafType;
export declare type ResourcesNodeType = ResourcesType | ResourcesLeafType;
export declare type ResourcesType = {
    [key: string]: ResourcesNodeType;
};
export declare function isResourcesLeafType(node: ResourcesLeafType | Record<string, unknown>): node is ResourcesLeafType;
export declare function makeResourcesLeafType<T extends object>(type: T): T & CustomResourcesLeafType;
export {};
