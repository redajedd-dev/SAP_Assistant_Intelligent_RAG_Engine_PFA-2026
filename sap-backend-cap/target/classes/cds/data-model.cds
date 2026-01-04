namespace com.emsi.sapgenai;

entity BusinessPartners {
    key ID : String;
    Name : String;
    Email : String;
    Region : String;
    IBAN : String;
}

entity PurchaseOrders {
    key ID : Integer;
    Partner : Association to BusinessPartners;
    OrderDate : Date;
    TotalAmount : Decimal(10,2);
    Currency : String;
    Status : String;
    Description : String;
}

entity Invoices {
    key ID : String;
    Order : Association to PurchaseOrders;
    InvoiceDate : Date;
    Amount : Decimal(10,2);
    PaymentStatus : String;
}
