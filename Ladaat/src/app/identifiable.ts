import { User } from './login/model/user';

export interface Identifiable<T> {
    id: string;
    modifiedBy: string;

    toJSON();
	copy(other: Identifiable<T>);
    copyAll(other: Identifiable<T>);
    equals(other: Identifiable<T>);
    make(): Identifiable<T>;
}