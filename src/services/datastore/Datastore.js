import {firebaseConfig, firestoredb} from '../config';

// Initialize firebase instance


export class DBUtil {

    constructor(){
    }
    static get firebasedb(){
        return firebasedb;
    }
    static getList(tableName, callbackFn, errorFn) {
        this
            .getDocRef(tableName)
            .get()
            .then((querySnapshot) => {
                //Audit query
                callbackFn(querySnapshot);
            })
            .catch((ex) => {
                //Audit error
                errorFn(ex);
            });
    }

    static getDocRef(tableName) {
        return firestoredb.collection(tableName);

    }

    static addObj(tableName, obj, callbackFn, errorFn) {
        this
            .getDocRef(tableName)
            .add(obj)
            .then((docRef) => {
                //Audit object add
                callbackFn(docRef);
            })
            .catch((ex) => {
                errorFn(ex);
            });
    }
}