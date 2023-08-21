export let users: string[] = [];
export let rooms: string[] = [];

module.exports = { //! Installerat npm i @types/node --save-dev 
	users,
	rooms,
};
// How to use this module in server.ts:
// import { users, rooms } from './storage/data';
//
// console.log(users);
// console.log(rooms);
