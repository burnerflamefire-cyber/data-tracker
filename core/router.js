window.AppRouter = {
    load(mode) {
        window.AppState.mode = mode;

        if (mode === "programme") {
            ProgrammeDashboard.render();
        }

        if (mode === "project") {
            ProjectDashboard.render();
        }

        Navigation.updateSelection();
    }
};
