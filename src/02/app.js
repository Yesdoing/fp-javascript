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

var curry = new Student('Haskell', 'Curry', '111-11-1111', 'Penn State');
// curry.address = new Address('US');
curry.address = 'US';

var turing = new Student('Alan', 'Turing', '222-22-2222', 'Princeton');
// turing.address = new Address('England');
turing.address = 'England';

var church = new Student('Alonzo', 'Church', '333-33-3333', 'Princeton');
// church.address = new Address('US');
church.address = 'US';

var kleene = new Student('Stephen', 'Kleene', '444-44-4444', 'Princeton');
// kleene.address = new Address('US');
kleene.address = 'US';

// church.studentsInSameCountryAndSchool([curry, turing, kleene]);

var selector = (country, school) => (student) => student.address.country === country && student.school === school;

var findStudentsBy = (friends, selector) => friends.filter(selector);

findStudentsBy([curry, turing, church, kleene], selector('US', 'Princeton'));

function zipCode(code, location) {
  let _code = code;
  let _location = location || '';

  return {
    code: function() {
      return _code;
    },
    location: function() {
      return _location;
    },
    fromString: function(str) {
      let parts = str.split('-');
      return zipCode(parts[0], parts[1]);
    },
    toString: function() {
      return _code + '-' + _location;
    }
  }
}

const princetonZip = zipCode('08544', '3345');
princetonZip.toString();

function coordinate(lat, long) {
  let _lat = lat;
  let _long = long;

  return {
    latitude: function() {
      return _lat;
    },
    longitude: function() {
      return _long;
    },
    translate: function(dx, dy) {
      return coordinate(_lat + dx, _long + dy);
    },
    toString: function() {
      return '(' + _lat + ',' + _long + ')';
    }
  };
}

const greenwich = coordinate(51.4778, 0.0015);
greenwich.toString();
greenwich.translate(10, 10).toString();

// const person = Object.freeze(new Person('Haskell', 'Curry', '444-44-4444'));
// person.firstname = 'Bob';

var person = new Person('Haskell', 'Curry', '444-44-4444');
person.address = new Address('US', 'NJ', 'Princeton', zipCode('08544', '1234'), 'Alexander St.');

person = Object.freeze(person);

person.address._country = 'France';
person.address.country;

var isObject = (val) => val && typeof val === 'object';

function deepFreeze(obj) {
  if(isObject(obj) && !Object.isFrozen(obj)) {
    Object.keys(obj).forEach(name => deepFreeze(obj[name]));

    Object.freeze(obj);
  }
  return obj;
}

function multiplier(a,b) {
  return a*b;
}

// const square = function(x) {
//   return x * x;
// }

const square = x => x * x;

const fruit = ['Coconut', 'apples'];
fruit.sort('Count', 'apples')


function applyOperation(a, b, opt) {
  return opt(a, b);
}

const multiplier = (a, b) => a * b;

function add(a) {
  return function(b) {
    return a + b;
  }
}

applyOperation(2, 3, multiplier);
add(3)(3);

function printPeopleInTheUs(people) {
  for (let i = 0; i < people.length; i++) {
    var thisPerson = people[i];
    if(thisPerson.address.country === 'US') {
      console.log(thisPerson);
    }
  }
}

printPeopleInTheUs([p1, p2, p3]);

function printPeople(people, selector, printer) {
  people.forEach(function (person) {
    if(selector(person)) {
      printer(person)
    }
  })
}

const inUs = person => person.address.country === 'US';

printPeople(people, isUs, console.log);

function makeAddFunction(amount) {
  function add(number) {
    return number + amount;
  }
  return add;
}

function makeExponetialFunction(base) {
  function raise(exponent) {
    return Math.pow(base, exponent);
  }
  return raise;
}

var addTenTo = makeAddFunction(10);
addTenTo(10);

var raiseThreeTo = makeExponetialFunction(3);
raiseThreeTo(2);

var outerVar = 'Outer';
function makeInner(params) {
    var innerVar = 'Inner';

    function inner() {
      console.log(
        `${outerVar}, ${innerVar}, ${params}이(가) 보여요!`);
    }
    return inner;
}

var inner = makeInner('Params');
inner();

'Functional Programming'.substring(0, 10).toLowerCase() + ' is fun';
