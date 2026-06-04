window.Navigation = {
    updateSelection() {
        document.querySelectorAll(".nav-primary button").forEach(btn => {
            btn.classList.toggle(
                "active",
                btn.dataset.mode === AppState.mode
            );
        });
    },

    setSecondary(html) {
        document.getElementById("secondary-content").innerHTML = html;
    }
};
