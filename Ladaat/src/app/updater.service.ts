import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Identifiable } from './identifiable';

@Injectable({
  providedIn: 'root'
})
export class UpdaterService {
  donorsRef = firebase.database().ref("donors");
  donationsRef = firebase.database().ref("donations");
  conversationsRef = firebase.database().ref("donor-conversations");
  recordsRef = firebase.database().ref("donor-records");

  private updates = [];

  constructor() { }

  /* 
    Use this to listen to changes in a single object.
    For example, to changes in the info of a specific donor.
  */
  initializeAndListenSingle<T extends Identifiable<T>> (
    ref: firebase.database.Reference,
    key: string,
    previous: Identifiable<T>,
    maker: T): Promise<void | firebase.database.DataSnapshot> {
      return this.initializeSingle<T>(ref, key, previous, maker)
        .then(snap => this.addSingleListener<T>(ref, key, previous, maker));
  }

  /*
    Use this to listen to changes in all objects that have the specified foreign key.
    For example, to changes in any and all donations of a specified donor.
  */
  initializeAndListenList<T extends Identifiable<T>> (
    ref: firebase.database.Reference,
    fkey_name: string,
    fkey: string,
    list: Identifiable<T>[],
    maker: T): Promise<void | firebase.database.DataSnapshot> {
      return this.initializeList<T>(ref, fkey_name, fkey, list, maker)
      .then(snap => this.addListListeners<T>(ref, fkey_name, fkey, list, maker));
  }

  /*
    Use this to listen to changes in all objects of a certain type.
    For example, to changes in any and all donors.
  */
  initializeAndListenAll<T extends Identifiable<T>> (
    ref: firebase.database.Reference,
    list: Identifiable<T>[],
    maker: T): Promise<void | firebase.database.DataSnapshot> {
      return this.initializeAll<T>(ref, list, maker)
      .then(snap => this.addAllListeners<T>(ref, list, maker));
  }

  /* 
    ref: a reference to the root of where all objects of this type are stored. For example: /users
    key: the identifier of a specific child of the ref
    previous: the object that we want to update with the fetched data
    maker: the object to use for creating client-side objects of this type
  */
  initializeSingle<T extends Identifiable<T>> (
    ref: firebase.database.Reference,
    key: string,
    previous: Identifiable<T>,
    maker: T): Promise<firebase.database.DataSnapshot> {
      return ref.child(key).once("value", snapshot => {
        if (snapshot.exists()) {
          let blank: Identifiable<T> = maker.make();
          blank.copy(snapshot.toJSON() as T);
          blank.id = snapshot.key;
          previous.copy(blank);
        }
      });
  }

  initializeList<T extends Identifiable<T>> (
    ref: firebase.database.Reference,
    fkey_name: string,
    fkey: string,
    list: Identifiable<T>[],
    maker: T): Promise<firebase.database.DataSnapshot> {
      return ref.orderByChild(fkey_name).equalTo(fkey).once("value", snapshot => {
        snapshot.forEach(snap => {
          let blank: Identifiable<T> = maker.make();
          blank.copy(snap.toJSON() as T);
          blank.id = snap.key;
          list.push(blank);
        });
      });
    }

    initializeAll<T extends Identifiable<T>> (
      ref: firebase.database.Reference,
      list: Identifiable<T>[],
      maker: T): Promise<firebase.database.DataSnapshot> {
        return ref.once("value", snapshot => {
          snapshot.forEach(snap => {
            let blank: Identifiable<T> = maker.make();
            blank.copy(snap.toJSON() as T);
            blank.id = snap.key;
            list.push(blank);
          });
        });
      }
    
    addSingleListener<T extends Identifiable<T>> (
      ref: firebase.database.Reference,
      key: string,
      previous: Identifiable<T>,
      maker: T) {
        ref.child(key).on("value", snapshot => {
          
          let blank: Identifiable<T> = maker.make();
                  
          if (snapshot.exists()) {
            blank.copy(snapshot.toJSON() as T);
            blank.id = snapshot.key;
            
            this.notifySingle(previous, blank);
          }
          else {
            blank.id = null;
            this.notifySingle(previous, blank);
          }
      });
    }
    
    addListListeners<T extends Identifiable<T>> (
      ref: firebase.database.Reference,
      fkey_name: string,
      fkey: string,
      list: Identifiable<T>[],
      maker: T) {
        ref.orderByChild(fkey_name).equalTo(fkey).on("child_added", snapshot => {
          let blank: Identifiable<T> = maker.make();

          let exists: boolean = false;
          
          list.forEach(element => {
            if (element.id == snapshot.key) {
              exists = true;
            }
          });
          
          if (!exists) {
            blank.copy(snapshot.toJSON() as T);
            blank.id = snapshot.key;
            this.notifyUser(blank, list, UpdaterService.add);
          }
        });
        
        ref.orderByChild(fkey_name).equalTo(fkey).on("child_changed", snapshot => {
          let blank: Identifiable<T> = maker.make();
          let exists: boolean = false;
          
          list.forEach(element => {
          if (element.id == snapshot.key) {
            exists = true;
          }
        });

        if (exists) {
          blank.copy(snapshot.toJSON() as T);
          blank.id = snapshot.key;
          this.notifyUser(blank, list, UpdaterService.change);
        }
      });
      
      ref.orderByChild(fkey_name).equalTo(fkey).on("child_removed", snapshot => {
        let blank: Identifiable<T> = maker.make();

        let exists: boolean = false;
        
        list.forEach(element => {
          if (element.id == snapshot.key) {
            exists = true;
          }
        });

        if (exists) {
          blank.copy(snapshot.toJSON() as T);
          blank.id = snapshot.key;
          this.notifyUser(blank, list, UpdaterService.remove);
        }
      });
    }

    addAllListeners<T extends Identifiable<T>> (
      ref: firebase.database.Reference,
      list: Identifiable<T>[],
      maker: T) {
        ref.on("child_added", snapshot => {
          let blank: Identifiable<T> = maker.make();

          let exists: boolean = false;
          
          list.forEach(element => {
            if (element.id == snapshot.key) {
              exists = true;
            }
          });
          
          if (!exists) {
            blank.copy(snapshot.toJSON() as T);
            blank.id = snapshot.key;
            this.notifyUser(blank, list, UpdaterService.add);
          }
        });
        
        ref.on("child_changed", snapshot => {
          let blank: Identifiable<T> = maker.make();
          let exists: boolean = false;
          
          list.forEach(element => {
          if (element.id == snapshot.key) {
            exists = true;
          }
        });

        if (exists) {
          blank.copy(snapshot.toJSON() as T);
          blank.id = snapshot.key;
          this.notifyUser(blank, list, UpdaterService.change);
        }
      });
      
      ref.on("child_removed", snapshot => {
        let blank: Identifiable<T> = maker.make();

        let exists: boolean = false;
        
        list.forEach(element => {
          if (element.id == snapshot.key) {
            exists = true;
          }
        });

        if (exists) {
          blank.copy(snapshot.toJSON() as T);
          blank.id = snapshot.key;
          this.notifyUser(blank, list, UpdaterService.remove);
        }
      });
    }
    
    private notifySingle<T>(previous: Identifiable<T>, next: Identifiable<T>) {
    if (previous.id == null || previous.equals(next)) {
      UpdaterService.changeOne(next, previous);
    }
    else {
      this.updates.push({
        'previous': previous,
        'next': next,
        'function': UpdaterService.changeOne
      });
    }
  }
  
  private static changeOne<T>(next: Identifiable<T>, previous: Identifiable<T>, ): void {
    previous.copyAll(next);
  }
  
  private notifyUser<T>(next: Identifiable<T>, current: Identifiable<T>[], funk: (object: Identifiable<T>, array: Identifiable<T>[]) => void) {
      this.updates.push({
        'previous': current,
        'next': next,
        'function': funk
      });
  }
  
  private static add<T>(object: Identifiable<T>, array: Identifiable<T>[]): void {
    array.push(object);
  }
  
  private static change<T>(object: Identifiable<T>, array: Identifiable<T>[]): void {
    array.forEach(a => {
      if (a.id == object.id) {
        a.copy(object);
        return;
      }
    });
  }
  
  private static remove<T>(object: Identifiable<T>, array: Identifiable<T>[]): void {
    array.forEach(a => {
      if (a.id == object.id) {
        array.splice(array.indexOf(a), 1);
        return;
      }
    });
  }

  updateAll() {
    while (this.updates.length > 0) {
      let update = this.updates.reverse().pop();
      update.function(update.next, update.previous);
    }
  }

  hasUpdates(): boolean {
		return this.updates.length > 0;
	}
}