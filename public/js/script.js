document.addEventListener("DOMContentLoaded", async () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  console.log("BEGINNING AUTOMATED ENDPOINT TESTS...");

  await sleep(3000);

  try {
    const res1 = await fetch("/api/items");
    console.log("GET /api/items:", await res1.json());
    await sleep(2000);

    const res2 = await fetch("/api/items/sword01");
    console.log("GET /api/items/sword01:", await res2.json());
    await sleep(2000);

    const res3 = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "testitem",
        name: "Debug Blade",
        type: "weapon",
        effect: "Used for testing only",
      }),
    });
    console.log("POST /api/items:", await res3.json());
    await sleep(2000);

    const res4 = await fetch("/api/items/testitem", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Upgraded Debug Blade",
        type: "weapon",
        effect: "Now it slices bugs faster",
      }),
    });
    console.log("PUT /api/items/testitem:", await res4.json());
    await sleep(2000);

    const res5 = await fetch("/api/items/testitem", { method: "DELETE" });
    console.log("DELETE /api/items/testitem:", await res5.json());
    await sleep(2000);

    const res6 = await fetch("/api/users");
    console.log("GET /api/users:", await res6.json());
    await sleep(2000);

    const res7 = await fetch("/api/users/user01");
    console.log("GET /api/users/user01:", await res7.json());
    await sleep(2000);

    const res8 = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "usertest",
        name: "Test User",
        email: "test@api.com",
        items: ["potion01"],
      }),
    });
    console.log("POST /api/users:", await res8.json());
    await sleep(2000);

    const res9 = await fetch("/api/users/usertest", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Updated Test User",
        email: "updated@api.com",
        items: ["elixir01"],
      }),
    });
    console.log("PUT /api/users/usertest:", await res9.json());
    await sleep(2000);

    const res10 = await fetch("/api/users/usertest", { method: "DELETE" });
    console.log("DELETE /api/users/usertest:", await res10.json());
  } catch (error) {
    console.error("Error during testing:", error);
  }

  console.log("ALL TESTS COMPLETED.");
});
