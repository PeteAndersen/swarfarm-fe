import applyFilters from '../filters';

const michael = {
  id: 1,
  name: 'Michael',
  age: 47,
  likes: ['dogs', 'sleep', 'food'],
};
const pam = { id: 2, name: 'Pam', age: 29, likes: ['exercise', 'food'] };
const dwight = { id: 3, name: 'Dwight', age: 32, likes: ['cats', 'sleep'] };
const andy = { id: 4, name: 'Andy', age: 33, likes: ['welding', 'cats'] };
const jim = { id: 5, name: 'Jim', age: 29, likes: ['welding', 'cats'] };
const creed = {
  id: 6,
  name: 'Creed',
  age: 54,
  likes: ['tapeworms', 'dogs'],
};
const angela = {
  id: 7,
  name: 'Angela',
  age: 34,
  likes: ['cats', 'planning'],
};

const testObjects = [michael, pam, dwight, andy, jim, creed, angela];
describe('check comparators', () => {
  test('eq works as expected', () => {
    const filters = {
      age__eq: 29,
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([pam, jim]);
  });

  test('neq works as expected', () => {
    const filters = {
      age__neq: 29,
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([michael, dwight, andy, creed, angela]);
  });

  test('gt works as expected', () => {
    const filters = {
      age__gt: 32,
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([michael, andy, creed, angela]);
  });

  test('gte works as expected', () => {
    const filters = {
      age__gte: 32,
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([michael, dwight, andy, creed, angela]);
  });

  test('lt works as expected', () => {
    const filters = {
      age__lt: 32,
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([pam, jim]);
  });

  test('lte works as expected', () => {
    const filters = {
      age__lte: 32,
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([pam, dwight, jim]);
  });

  test('startswith works as expected', () => {
    const filters = {
      name__startswith: 'An',
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([andy, angela]);
  });

  test('istartswith works as expected', () => {
    const filters = {
      name__istartswith: 'an',
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([andy, angela]);
  });

  test('endswith works as expected', () => {
    const filters = {
      name__endswith: 'm',
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([pam, jim]);
  });

  test('iendswith works as expected', () => {
    const filters = {
      name__iendswith: 'M',
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([pam, jim]);
  });

  test('in works as expected', () => {
    const filters = {
      age__in: [29, 32],
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([pam, dwight, jim]);
  });

  test('contains works as expected (array)', () => {
    const filters = {
      likes__contains: 'cats',
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([dwight, andy, jim, angela]);
  });

  test('contains works as expected (substring)', () => {
    const filters = {
      name__contains: 'ee',
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([creed]);
  });

  test('icontains works as expected', () => {
    const filters = {
      name__icontains: 'EE',
    };
    const results = applyFilters(filters, testObjects);
    expect(results).toEqual([creed]);
  });
});

test('eq is default if no comparator specified', () => {
  const filters = {
    id: 5,
  };
  const results = applyFilters(filters, testObjects);
  expect(results).toEqual([jim]);
});

test('objects must pass all provided filters', () => {
  const filters = {
    age: 29,
    likes__contains: 'welding',
  };
  const results = applyFilters(filters, testObjects);
  expect(results).toEqual([jim]);
});
