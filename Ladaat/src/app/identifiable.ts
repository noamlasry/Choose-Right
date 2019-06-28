import { User } from './login/model/user';

export interface Identifiable<T> {
    id: string;
    modifiedBy: string;

    toJSON(); //Don't include id, do include modifiedBy
	copy(other: Identifiable<T>); //everything except id
    copyAll(other: Identifiable<T>); //Is this used by anything or can it be removed?
    equals(other: Identifiable<T>); //so far doesn't include modifiedBy comparison
    make(): Identifiable<T>;
}