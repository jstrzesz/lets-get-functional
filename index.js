#!/usr/bin/env node
const _ = require("lodown-jstrzesz");
'use strict';

const customers = require("./data/customers.json");


/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */

//1
var maleCounter = 0;
_.filter(customers, function(e, i, c){
    if (e['gender'] === 'male') maleCounter += 1;
});
var males = 'The number of males is ' + maleCounter + '.';

//2
var femaleCounter = 0;
_.filter(customers, function(e, i, c){
    if (e['gender'] === 'female') femaleCounter += 1;
});
var females = 'The number of females is ' + femaleCounter + '.';

var transgenderCounter = 0;
_.filter(customers, function(e, i, c){
    if (e['gender'] === 'transgender') transgenderCounter  += 1;
});
var transgenders = 'The number of people who identify as transgender is ' + transgenderCounter + '.';

//3
var ages = _.pluck(customers, 'age');
var oldestAge = ages.reduce(function(a, b) {
    return Math.max(a, b);
});
var oldestPerson = _.filter(customers, function(e, i, a) {
    if (customers[i]['age'] === oldestAge) 
    return customers[i]['age'] + ' ' + customers[i]['name'];
});
var oldestPersonFinal = 'The oldest person is ' + oldestPerson[0]['name'] + '.' + ' He/she is ' + oldestPerson[0]['age'] + ' years old.';

//4
var youngestAge = ages.reduce(function(a, b) {
    return Math.min(a, b);
});
var youngestPerson = _.filter(customers, function(e, i, a) {
    if (customers[i]['age'] === youngestAge) 
    return customers[i]['age'] + ' ' + customers[i]['name'];
});
var youngestPersonFinal = 'The youngest person is ' + youngestPerson[0]['name'] + '.' + ' He/she is ' + youngestPerson[0]['age'] + ' years old.';

//5
var balances = _.pluck(customers, 'balance');
var newBalances = [];

balances.map(function(e, i, c){
    e = e.replace('$', '');
    e = e.replace(',', '');
    newBalances.push(Number(e));
});
var sumBalance = newBalances.reduce(function(a, b) {
      return a + b;
}, 0);
var averageBalance = '$' + ((sumBalance /= newBalances.length).toFixed(2));
var finalAverageBalance = 'The average balance of the customers is ' + averageBalance + '.';

//6
function beginsWith(collection, input){
    var names = _.pluck(customers, 'name');
    var nameCounter = 0;
    _.filter(names, function(e, c){
        if ((e.slice(0, 1).toLowerCase()) === input.slice(0, 1).toLowerCase()) nameCounter += 1;
    });
    return nameCounter;
}

//7
function friendsBeginsWith(collection, input){
    var friendsNameCounter = 0;
    _.filter(collection, function(person, i, c){
        _.filter(person.friends, function(friend, i, c) {
            if ((friend['name'].charAt(0).toLowerCase()) === input.charAt(0).toLowerCase()) friendsNameCounter += 1;
        });
    });
        return friendsNameCounter;
}

//8
function customerIsFriend(customers, input){
    var customerIsFriend = '';
    _.filter(customers, function(person, i, c){
        _.filter(person.friends, function(friend, i, c){
            if ((friend['name'].toLowerCase()) === input.toLowerCase()) customerIsFriend += (' ' + person.name);
        });
    });
    if (customerIsFriend === '') customerIsFriend = 'nobody';
    return customerIsFriend;
}

//9
function mostCommonTags(customers){
  var tagArrayStorage = _.pluck(customers, 'tags');
  var tagCountObject = {};
  _.filter(tagArrayStorage, function(tagArray, i, collection){
    _.filter(tagArray, function(tag, i, collection){
      if(tagCountObject[tag]) tagCountObject[tag] += 1;
      if(!tagCountObject[tag]) tagCountObject[tag] = 1;
    });
  });
  var mostCommonTags = [];
  var mostCommonTagCount = 1;
  _.each(tagCountObject, function(value, key){
    if(value >= mostCommonTagCount) {
      mostCommonTagCount = value;
      mostCommonTags.unshift(key);
    }
  });
  var top3 = mostCommonTags.slice(0,3);
  return top3.join(", ");
}

//10
function genders(customers){
    var summary = {};
    customers.reduce(function(seed, e, i) {
    if(summary[e.gender]) summary[e.gender] += 1;
    if(!summary[e.gender]) summary[e.gender] = 1;
}, 0);
    return summary;
}

console.log(males);
console.log(females);
console.log(transgenders);
console.log(oldestPersonFinal);
console.log(youngestPersonFinal);
console.log(finalAverageBalance);
console.log('The number of customers names that begin with d is ' + beginsWith(customers, 'd')) + '.';
console.log('The number of friends names that begin with c is ' + friendsBeginsWith(customers, 'c')) + '.';
console.log(customerIsFriend(customers, 'Doyle Erikson'));
console.log('The most common tags are ' + mostCommonTags(customers));
console.log(genders(customers));
