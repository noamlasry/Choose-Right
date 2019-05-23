import { Donor } from './donor';
import { Donation } from './donation';

export const DONORS: Donor[] = [
	{id: '1', firstName: "Jill", lastName: "Smith", telephone: "05416161", age: 25},
	{id: '2', firstName: "Eve", lastName: "Jackson", telephone: "905459654", age: 50},
	{id: '3', firstName: "david", lastName: "cohen", telephone: "05620255", age: 83},
	{id: '4', firstName: "miryam", lastName: "levi", telephone: "05241145", age: 37},
	{id: '5', firstName: "yosef", lastName: "hacohen", telephone: "054220001", age: 28},
];

export const DONATIONS: Donation[] = [
	{donor: '1', date: "2019-02-15", amount: 480},
	{donor: '2', date: "2019-04-20", amount: 720},
	{donor: '3', date: "2018-06-27", amount: 1080},
	{donor: '4', date: "2017-04-27", amount: 1280},
	{donor: '5', date: "2019-01-08", amount: 1920}
];
