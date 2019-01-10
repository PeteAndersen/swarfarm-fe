// Filter - input format
export interface Filter {
  [key: string]: boolean | number | string | any[] | undefined;
}

export interface FilterEntity {
  [key: string]: any;
}

export interface ComparatorMap {
  [key: string]: any;
  eq: any;
  neq: any;
  gt: any;
  gte: any;
  lt: any;
  lte: any;
  startswith: any;
  istartswith: any;
  endswith: any;
  iendswith: any;
  in: any;
  contains: any;
  icontains: any;
}
