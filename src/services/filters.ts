import _, { LodashGet5x1 } from 'lodash/fp';

import { Filter, FilterEntity, ComparatorMap } from './filters.types';

// Convert any two-arity function into case insensitive version
export const insensitize = (compareFunc: any): any =>
  _.overArgs(compareFunc, [_.toLower, _.toLower]);

export const comparators: ComparatorMap = {
  eq: _.eq,
  neq: _.curry((b: any, a: any) => !_.eq(b, a)),
  gt: _.curry((b: any, a: any) => a > b),
  gte: _.curry((b: any, a: any) => a >= b),
  lt: _.curry((b: any, a: any) => a < b),
  lte: _.curry((b: any, a: any) => a <= b),
  startswith: _.startsWith,
  istartswith: insensitize(_.startsWith),
  endswith: _.endsWith,
  iendswith: insensitize(_.endsWith),
  in: _.curry((b: any, a: any[]) => _.includes(a, b)),
  contains: _.includes,
  icontains: insensitize(_.includes),
};

export const splitComparator = (attributePath: string): [LodashGet5x1, any] => {
  // Split off the comparison type from attribute path (if any)
  // Returns a curried function that will return the value of the property specified in path
  //  when passed an object, and the selected comparison function
  const path = attributePath.split('__');
  if (path.length <= 1) {
    // No comparator on end, defaults to 'eq'
    return [_.get(path), comparators.eq];
  } else {
    const possibleComparator = path[path.length - 1];

    if (_.contains(possibleComparator, Object.keys(comparators))) {
      const comparator: any = comparators[possibleComparator];
      const newPath = path.slice(0, path.length - 1);
      return [_.get(newPath), comparator];
    } else {
      // No comparator
      return [_.get(path), comparators.eq];
    }
  }
};

export const generateFilters = (filterParams: Filter): any[] =>
  // Convert filter parameters into functions that can be run against an object using normal
  // array filter methods
  Object.entries(filterParams).map(
    _.spread((attributePath: string, filterParam: any) => {
      if (filterParam !== undefined) {
        const [attribute, comparator] = splitComparator(attributePath);
        return _.curry((entity: FilterEntity) =>
          comparator(filterParam, attribute(entity)),
        );
      } else {
        // Filters with 'undefined' value are ignored and always pass
        return () => true;
      }
    }),
  );

const applyFilters = _.curry(
  (filters: Filter, entities: any[]): any[] => {
    const filterFuncs = _.allPass(generateFilters(filters));
    return entities.filter(filterFuncs);
  },
);

export default applyFilters;
