package com.emsi.sapgenai;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.math.BigDecimal;

@RestController
@RequestMapping("/odata/v4/CatalogService")
public class MockController {

    @GetMapping("/PurchaseOrders")
    public Map<String, Object> getOrders() {
        List<Map<String, Object>> orders = new ArrayList<>();

        Map<String, Object> o1 = new HashMap<>();
        o1.put("ID", 1000001);
        o1.put("OrderDate", "2023-01-15");
        o1.put("TotalAmount", 5000.00);
        o1.put("Currency", "EUR");
        o1.put("Status", "Approved");
        orders.add(o1);

        Map<String, Object> o2 = new HashMap<>();
        o2.put("ID", 1000002);
        o2.put("OrderDate", "2023-01-20");
        o2.put("TotalAmount", 1250.50);
        o2.put("Currency", "USD");
        o2.put("Status", "Pending");
        orders.add(o2);

        Map<String, Object> o3 = new HashMap<>();
        o3.put("ID", 1000003);
        o3.put("OrderDate", "2023-02-10");
        o3.put("TotalAmount", 800.00);
        o3.put("Currency", "EUR");
        o3.put("Status", "Rejected");
        orders.add(o3);

        Map<String, Object> response = new HashMap<>();
        response.put("value", orders);
        return response;
    }

    @GetMapping("/BusinessPartners")
    public Map<String, Object> getPartners() {
        List<Map<String, Object>> partners = new ArrayList<>();

        Map<String, Object> p1 = new HashMap<>();
        p1.put("ID", "BP001");
        p1.put("Name", "TechSolutions Inc.");
        p1.put("Region", "EMEA");
        p1.put("Email", "contact@techsolutions.com");
        partners.add(p1);

        Map<String, Object> p2 = new HashMap<>();
        p2.put("ID", "BP002");
        p2.put("Name", "Global Logistics Corp");
        p2.put("Region", "NA");
        p2.put("Email", "info@globallogistics.com");
        partners.add(p2);

        Map<String, Object> response = new HashMap<>();
        response.put("value", partners);
        return response;
    }
}
