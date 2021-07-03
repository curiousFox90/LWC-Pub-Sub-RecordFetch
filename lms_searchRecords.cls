public with sharing class lms_searchRecords {
    
    @AuraEnabled
    public static List<Contact> returnContacts(String ContactName){
        try {
            
            return [Select id, name, email, title from contact where lastname like : '%'+ContactName+'%'];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
