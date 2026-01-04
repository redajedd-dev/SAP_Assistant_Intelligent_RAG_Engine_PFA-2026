using com.emsi.sapgenai as db from './data-model';

service CatalogService {
    @readonly entity BusinessPartners as projection on db.BusinessPartners;
    @readonly entity PurchaseOrders as projection on db.PurchaseOrders;
    @readonly entity Invoices as projection on db.Invoices;
}
