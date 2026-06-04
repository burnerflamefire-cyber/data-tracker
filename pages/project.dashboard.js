window.ProjectDashboard = {
    render() {
        Navigation.setSecondary(`
            <h3>Project Menu</h3>
            <ul>
                <li>Project Info</li>
                <li>Cost Reports</li>
                <li>CEs</li>
            </ul>
        `);

        document.getElementById("page-content").innerHTML = `
            <h1>Project Dashboard</h1>
            <p>Select a project to continue.</p>
        `;
    }
};
