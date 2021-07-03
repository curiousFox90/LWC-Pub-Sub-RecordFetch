import { LightningElement,wire } from 'lwc';

import { publish , MessageContext } from 'lightning/messageService';
import searchMessageChannel from '@salesforce/messageChannel/searchRecords__c';
import getRecords from '@salesforce/apex/lms_searchRecords.returnContacts';

export default class LMS_SearchPanel extends LightningElement {

    recordData;
    contactLastName;
    @wire(MessageContext)
    messageContext;

    handleChange(event){
        this.contactLastName = event.target.value;
    }

    handleSearchPublish = () =>{
        getRecords({ContactName:this.contactLastName})
        .then(response =>{
            this.recordData = response;
            const message={
                recordData : this.recordData,
            }
            console.log(message);
            publish(this.messageContext, searchMessageChannel, message);
        })
    }

    handleSearchSubscribe =() =>{

        const message = {recordData : this.contactLastName};
        publish(this.messageContext, searchMessageChannel, message);
    }

}