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

    // Method for update only delete flag
    static deleteDoc(tableName,param){
        this.getDocRef(tableName).doc(param[0].docName).update({
            "isDelete": param[0].deleteFlag
          });
    }

    // Method for update delete flag & reamak
    static deleteDocById(tableName,param){
        this.getDocRef(tableName).doc(param[0].id).update({
            "isDelete": param[0].deleteFlag,
            "remark": param[0].remark
          });
    }
    
    // Method for update approve & reject registered user by Id
    static approvedRejectDocById(tableName,param){
        this.getDocRef(tableName).doc(param[0].id).update({
            "isApproved": param[0].isApproved,
            "isPending": param[0].isPending,
            "isRejected": param[0].isRejected
          });
    }

}