/**
 * File Name: Datastore.js
 * Description: This file is a data access layer for integrating with Firestore database
 * Created by: Mahesh Kedari <mahesh.kedari@eternussolutions.com>
 * Created on: 
 */
import {firebaseConfig, firestoredb} from '../config';

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
    //added by snehal patil
    static addDoc(tableName ,docName ,doc ,callbackFn ,errorFn){
        this.getDocRef(tableName)
        .doc(docName)
        .set(doc)
        .then((docRef) =>{
            callbackFn(docRef);
        })
        .catch((ex) => {
            errorFn(ex);
        });
    }
    static addChangeListener(tableName, callbackFn, errorFn){
        this.getDocRef(tableName).onSnapshot((querySnapshot) =>{
            //Audit listener
            callbackFn(querySnapshot);

        });
    }
}