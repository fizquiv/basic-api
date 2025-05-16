document.addEventListener("DOMContentLoaded", () => {
  const displayResult = (
    containerId,
    data,
    isError = false,
    statusCode = null
  ) => {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const statusDiv = document.createElement("div");
    statusDiv.className = `status-code ${isError ? "error" : "success"}`;
    statusDiv.innerHTML = `Status Code: ${statusCode}`;
    container.appendChild(statusDiv);

    if (isError) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "error";
      errorDiv.innerHTML = `Error: ${data.message || JSON.stringify(data)}`;
      container.appendChild(errorDiv);
      return;
    }

    if (Array.isArray(data)) {
      const list = document.createElement("ul");
      data.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = JSON.stringify(item, null, 2);
        list.appendChild(li);
      });
      container.appendChild(list);
    } else {
      const resultDiv = document.createElement("pre");
      resultDiv.textContent = JSON.stringify(data, null, 2);
      container.appendChild(resultDiv);
    }
  };

  const handleFormSubmit = async (
    event,
    endpoint,
    method,
    resultContainerId
  ) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};

    for (let [key, value] of formData.entries()) {
      if (value) {
        if (key === "items") {
          data[key] = value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item);
        } else {
          data[key] = value;
        }
      }
    }

    try {
      const url = endpoint.includes(":id")
        ? endpoint.replace(":id", data.id)
        : endpoint;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? JSON.stringify(data) : undefined,
      });

      const result = await response.json();

      displayResult(resultContainerId, result, !response.ok, response.status);

      if (method !== "GET" && response.ok) {
        event.target.reset();
      }
    } catch (error) {
      displayResult(resultContainerId, error, true, 500);
    }
  };

  document
    .getElementById("register-item-form")
    .addEventListener("submit", (e) =>
      handleFormSubmit(e, "/api/items", "POST", "items-result")
    );

  document
    .getElementById("get-item-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("get-item-id").value;
      handleFormSubmit(
        e,
        id ? `/api/items/${id}` : "/api/items",
        "GET",
        "items-result"
      );
    });

  document
    .getElementById("update-item-form")
    .addEventListener("submit", (e) =>
      handleFormSubmit(e, "/api/items/:id", "PUT", "items-result")
    );

  document
    .getElementById("delete-item-form")
    .addEventListener("submit", (e) =>
      handleFormSubmit(e, "/api/items/:id", "DELETE", "items-result")
    );

  document
    .getElementById("register-user-form")
    .addEventListener("submit", (e) =>
      handleFormSubmit(e, "/api/users", "POST", "users-result")
    );

  document
    .getElementById("get-user-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("get-user-id").value;
      handleFormSubmit(
        e,
        id ? `/api/users/${id}` : "/api/users",
        "GET",
        "users-result"
      );
    });

  document
    .getElementById("update-user-form")
    .addEventListener("submit", (e) =>
      handleFormSubmit(e, "/api/users/:id", "PUT", "users-result")
    );

  document
    .getElementById("delete-user-form")
    .addEventListener("submit", (e) =>
      handleFormSubmit(e, "/api/users/:id", "DELETE", "users-result")
    );
});
