class Person {
  constructor(firstname, lastname, ssn) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._ssn = ssn;
    this._address = null;
    this._birthYear = null;
  }

  get ssn() {
    return this._ssn;
  }

  get firstname() {
    return this._firstname;
  }

  get lastname() {
    return this._lastname;
  }

  get fullname() {
    return this._firstname + this._lastname;
  }

  get address() {
    return this._address;
  }

  get birthYear() {
    return this._birthYear;
  }

  set birthYear(year) {
    this._birthYear = year;
  }

  set address(addr) {
    this._address = addr;
  }

  set lastname(lastname) {
    return new Person(this._firstname, lastname, this._ssn);
  }

  toString() {
    return `Person(${this._firstname}, ${this._lastname})`;
  }

  peopleInSameCountry(friends) {
    var result = [];
    for (let idx in friends) {
      var friend = friends[idx];
      if(this.address.country === friend.address.country) {
        result.push(friend);
      }
    }
    return result;
  };
}

class Address {
  constructor(country, state, city, zip, street) {
    this._country = country;
    this._state = state;
    this._city = city;
    this._zip = zip;
    this._street = street;
  }

  get street() {
    return this._street;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zip() {
    return this._zip;
  }

  get country() {
    return this._country;
  }
}


class Student extends Person {
  constructor(firstname, lastname, ssn, school) {
    super(firstname, lastname, ssn);
    this._school = school;
  }

  get school() {
    return this._school;
  }

  studentsInSameCountryAndSchool(friends) {
    var closeFriends = super.peopleInSameCountry(friends);
    var result = [];
    for(let idx in closeFriends) {
      var friend = closeFriends[idx];
      if(friend.school === this.school) {
        result.push(friend);
      }
    }
    return result;
  }
}


const p1 = new Person('Haskell', 'Curry', '111-11-1111');
p1.address = new Address('US');
p1.birthYear = 1900;

const p2 = new Person('Barkley', 'Rosser', '222-22-2222');
p2.address = new Address('Greece');
p2.birthYear = 1907;

const p3 = new Person('John', 'von Neumann', '333-33-3333');
p3.address = new Address('Hungary');
p3.birthYear = 1903;

const p4 = new Person('Alonzo', 'Church', '444-44-4444');
p4.address = new Address('US');
p4.birthYear = 1903;

const name = p => p.fullname;
console.log(name(p1));

var result = [];
var persons = [p1, p2, p3, p4];

for(let i = 0; i < persons.length; i++) {
  var p = persons[i];
  if(p !== null && p !== undefined) {
    result.push(p.fullname);
  }
}


_.map(persons, s => (s !== null && s !== undefined) ? s.fullname : '');

function map(arr, fn) {
  const len = arr.length,
         result = new Array(len);
  for (let idx = 0; idx < len; ++idx) {
    result[idx] = fn(arr[idx], idx, arr);
  }
  return result;
}

_(persons).reverse().map(
  p => (p !== null && p !== undefined) ? p.fullname : ''
);

function reduce(arr, fn, accumulator) {
  let idx = -1, len = arr.length;

  if(!accumulator && len > 0) {
    accumulator = arr[++idx];
  }

  while (++idx < len) {
    accumulator = fn(accumulator, arr[idx], idx, arr);
  }
  return accumulator;
}

_(persons).reduce((stat, person) => {
   const country = person.address.country;
   stat[country] = _.isUndefined(stat[country]) ? 1 : stat[country] + 1;
   return stat;
}, {});

const getCountry = person => person.address.country;

const isValid = val => !_.isUndefined(val) && !_.isNull(val);
const allValid = args => _(args).every(isValid);

const gatherStats = function (stat, country) {
  if(!isValid(stat[country])) {
    stat[country] = {'name': country, 'count': 0};
  }
  stat[country].count++;
  return stat;
};

_(persons).map(getCountry).reduce(gatherStats, {});

const cityPath = ['address', 'city'];
const cityLens = R.lens(R.path(cityPath), R.assocPath(cityPath));

_(persons).map(R.view(cityLens)).reduce(gatherStats, {});

_.groupBy(persons, R.view(cityLens));

const isNotValid = val => _.isUndefined(val) || _.isNull(val);

const notAllValid = args => _(args).some(isNotValid);

notAllValid(['string', 0, null, undefined]);
notAllValid(['string', 0, {}]);



allValid(['string', 0, null]);
allValid(['string', 0, {}]);

function filter(arr, predicate) {
  let idx = -1, len = arr.length, result = [];

  while (++idx < len) {
    let value = arr[idx];
    if (predicate(value, idx, this)) {
      result.push(value);
    }
  }
  return result;
}

var names = ['alonzo church', 'Haskell curry', 'stephen_kleene', 'John Von Neumann', 'stephen_kleene'];

// 명령형 프로그래밍 

var result = [];
for (let i = 0; i < names.length; i++) {
  var n = names[i];
  if (n !== undefined && n !== null) {
    var ns = n.replace(/_/, ' ').split(' ');
    for(let j = 0; j < ns.length; j++) {
      var p = ns[j];
      p = p.charAt(0).toUpperCase() + p.slice(1);
      ns[j] = p;
    }
    if (result.indexOf(ns.join(' ')) < 0) {
      result.push(ns.join(' '));
    }
  }
}

result.sort();

_.chain(names)
  .filter(isValid)
  .map(s => s.replace(/_/, ' '))
  .uniq()
  .map(_.startCase)
  .sort()
  .value();


  const p5 = new Person('David', 'Hilbert', '555-55-5555');
  p5.address = new Address('Germany');
  p5.birthYear = 1903;

  const p6 = new Person('Alan', 'Turing', '666-66-6666');
  p6.address = new Address('England');
  p6.birthYear = 1912;

  const p7 = new Person('Stephen', 'Kleene', '777-77-7777');
  p7.address = new Address('US');
  p7.birthYear = 1909;

_.chain(persons)
  .filter(isValid)
  .map(_.property('address.country'))
  .reduce(gatherStats, {})
  .values()
  .sortBy('count')
  .reverse()
  .first()
  .value()
  .name;

_.mixin({
  'select': _.map,
  'from': _.chain,
  
})