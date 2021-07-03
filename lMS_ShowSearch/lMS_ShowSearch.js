import { LightningElement,wire } from 'lwc';
import { subscribe , MessageContext } from 'lightning/messageService';
import searchMessageChannel from '@salesforce/messageChannel/searchRecords__c';
import getRecords from '@salesforce/apex/lms_searchRecords.returnContacts';

export default class LMS_ShowSearch extends LightningElement {

    @wire(MessageContext)
    messageContext;
    contactList;
    listData = [];
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email' },
        { label: 'Title', fieldName: 'Title'}
    ];

    connectedCallback(){
        console.log('show search lms')
        this.subscribeMessageChannel();
        this._subscribeMessageChannel();
    }

    subscribeMessageChannel = () =>
    {
        subscribe(this.messageContext, searchMessageChannel, (message)=>
        {
            console.log(message);
            this.contactList = message.recordData;
            this.listData = message.recordData;
        }) 
    }

    _subscribeMessageChannel = () =>{

        subscribe(this.messageContext, searchMessageChannel, (message)=>
        {
            console.log('record data subscribe',message);
            getRecords({ContactName:message.recordData})
            .then(response =>{
                console.log('--response--',response);
                this.contactList = response;
                this.listData = response;
             })
        }) 

    }

}