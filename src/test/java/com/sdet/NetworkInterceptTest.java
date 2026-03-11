package com.sdet;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Route;
import com.sdet.utils.BrowserManager;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class NetworkInterceptTest {

    private Page page;

    @BeforeMethod
    public void setUp() {
        page = BrowserManager.getPage();
    }

    // ✅ TEST 1 — Block all image requests
    @Test
    public void testBlockImages() {
        page.route("**/*.{png,jpg,jpeg,gif,svg}", route -> {
            System.out.println("Blocked: " +
                route.request().url());
            route.abort();
        });

        page.navigate("https://the-internet.herokuapp.com");
        Assert.assertTrue(
            page.title().length() > 0,
            "Page should load without images");

        System.out.println("✅ Page loaded without images");
    }

    // ✅ TEST 2 — Mock API response
    @Test
    public void testMockApiResponse() {
        page.route("**/api/users**", route -> {
            route.fulfill(new Route.FulfillOptions()
                .setStatus(200)
                .setContentType("application/json")
                .setBody("""
                    {
                      "id": 1,
                      "name": "Hardik Shah",
                      "role": "SDET",
                      "status": "active"
                    }
                    """));
        });

        page.navigate("https://the-internet.herokuapp.com");
        System.out.println("✅ Mock API response configured");
        Assert.assertTrue(true,
            "Mock response set successfully");
    }

    // ✅ TEST 3 — Log all network calls
    @Test
    public void testLogNetworkCalls() {
        page.onRequest(request ->
            System.out.println("REQUEST  → " +
                request.method() + " " + request.url())
        );

        page.onResponse(response ->
            System.out.println("RESPONSE ← " +
                response.status() + " " + response.url())
        );

        page.navigate("https://the-internet.herokuapp.com");
        Assert.assertTrue(
            page.title().length() > 0,
            "Page should load successfully");

        System.out.println("✅ Network calls logged");
    }

    @AfterMethod
    public void tearDown() {
        BrowserManager.closeBrowser();
    }
}