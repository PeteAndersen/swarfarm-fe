import _ from 'lodash/fp';

import { Filter, FilterEntity, ComparatorMap } from './filters.types';
import { CurriedFunction1 } from 'lodash';

// Convert any two-arity function into case insensitive version
const iCompare = (compareFunc: any) =>
  _.overArgs(compareFunc, [_.toLower, _.toLower]);

const comparators: ComparatorMap = {
  eq: _.eq,
  neq: !_.eq,
  gt: _.curry((b: any, a: any) => a > b),
  gte: _.curry((b: any, a: any) => a >= b),
  lt: _.curry((b: any, a: any) => a < b),
  lte: _.curry((b: any, a: any) => a <= b),
  startswith: _.startsWith,
  istartswith: iCompare(_.startsWith),
  endswith: _.endsWith,
  iendswith: iCompare(_.endsWith),
  in: _.curry((b: any, a: any[]) => _.includes(a, b)),
  contains: _.includes,
  icontains: iCompare(_.includes),
};

const entityValue = _.curry(
  (path: string[], entity: FilterEntity): any => {
    // path is a flat string as specified by _.get documentation
    const len = path.length;
    let index = 0;

    const reducer = (accum: any[], curr: any) => {
      const remainingPath = path.slice(index + 1);
      return accum.concat(entityValue(remainingPath, curr));
    };

    // Drill down into the object object properties specified in the path
    while (entity != null && index < len) {
      entity = entity[path[index]];

      if (Array.isArray(entity) && len > index + 1) {
        // When an array is encountered, recurse and grab the individual
        // values of the objects in the array. Return value is an array.
        return entity.reduce(reducer, []);
      }
      index++;
    }

    return index && index === len ? entity : undefined;
  },
);

const splitComparator = (
  attributePath: string,
): [CurriedFunction1<FilterEntity, any>, any] => {
  // Split off the comparison type from attribute path (if any)
  const path = attributePath.split('__');
  if (path.length <= 1) {
    // No comparator on end, defaults to 'eq'
    return [entityValue(path), comparators.eq];
  } else {
    const possibleComparator = path[path.length - 1];

    if (_.contains(possibleComparator, Object.keys(comparators))) {
      const comparator: any = comparators[possibleComparator];
      const newPath = path.slice(0, path.length - 1);
      return [entityValue(newPath), comparator];
    } else {
      // No comparator
      return [entityValue(path), comparators.eq];
    }
  }
};

const generateFilters = (filterParams: Filter): any[] =>
  Object.entries(filterParams).map(
    _.spread((attributePath: string, filterParam: any) => {
      const [attribute, comparator] = splitComparator(attributePath);
      return _.curry((entity: FilterEntity) =>
        comparator(filterParam, attribute(entity)),
      );
    }),
  );

const applyFilters = _.curry(
  (filters: Filter, entities: any[]): any[] => {
    const filterFuncs = _.allPass(generateFilters(filters));
    return entities.filter(filterFuncs);
  },
);

export default applyFilters;
