declare const CustomResourcesLeafTypeSymbol: unique symbol;
declare type CustomResourcesLeafType = {
    [CustomResourcesLeafTypeSymbol]: true;
};
export declare type ResourcesLeafType = string | Function | ReadonlyArray<any> | CustomResourcesLeafType;
export declare type ResourcesNodeType = _ResourcesType | ResourcesLeafType;
export declare type ResourcesType<KeyType extends string | number | symbol> = Record<KeyType, ResourcesNodeType>;
interface _ResourcesType extends ResourcesType<string | number | symbol> {
}
export declare function isResourcesLeafType(node: ResourcesLeafType | object): node is ResourcesLeafType;
export declare function makeResourcesLeafType<T extends object>(type: T): T & CustomResourcesLeafType;
export {};
