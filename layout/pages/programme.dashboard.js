window.ProgrammeDashboard = {
    render() {
        Navigation.setSecondary(`
            <h3>Programme Menu</h3>
            <ul>
                <li>Overview</li>
                <li>Budgets</li>
                <li>Cashflow</li>
            </ul>
        `);

        document.getElementById("page-content").innerHTML = `
            <h1>Programme Dashboard</h1>
            <p>Welcome, ${AppState.user.email}</p>
        `;
    }
};
