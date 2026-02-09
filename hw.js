<script>
    let applications = JSON.parse(localStorage.getItem("applications")) || [];

    const form = document.getElementById("appForm");
    const appList = document.getElementById("appList");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const app = {
            company: company.value,
            role: role.value,
            stage: stage.value,
            result: result.value,
            date: date.value
        };

        applications.push(app);
        saveAndRender();
        form.reset();
    });

    function saveAndRender() {
        localStorage.setItem("applications", JSON.stringify(applications));
        renderApplications();
        updateSummary();
    }

    function renderApplications() {
        appList.innerHTML = "";

        applications.forEach((app, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${app.company}</td>
                <td>${app.role}</td>
                <td>${app.stage}</td>
                <td>${app.result}</td>
                <td>${app.date}</td>
                <td><button class="delete-btn" onclick="deleteApp(${index})">Delete</button></td>
            `;

            appList.appendChild(row);
        });
    }

    function deleteApp(index) {
        applications.splice(index, 1);
        saveAndRender();
    }

    function updateSummary() {
        document.getElementById("total").innerText = applications.length;
        document.getElementById("interviews").innerText =
            applications.filter(a => a.stage === "Interview").length;
        document.getElementById("offers").innerText =
            applications.filter(a => a.stage === "Offer").length;
        document.getElementById("rejected").innerText =
            applications.filter(a => a.result === "Rejected").length;
    }

    renderApplications();
    updateSummary();
</script>

