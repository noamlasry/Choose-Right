export interface Identifiable<T> {
    id: string;
    toJSON();
	copy(other: Identifiable<T>);
    copyAll(other: Identifiable<T>);
    equals(other: Identifiable<T>);
    make(): Identifiable<T>;
}