
const currentYear = document.querySelector("#current-year");

function displayCurrentYear() {
    if (currentYear) {
        currentYear.textContent = `${new Date().getFullYear()}`;
    }
}

const upgradeRules = [
    {
        id: "low-ram",
        title: "Consider increasing your RAM",
        condition: (pc) => pc.ram <= 8,
        message: (pc) =>
            `Your system has ${pc.ram} GB of RAM. Consider 16 GB for general multitasking and gaming, or 32 GB for heavier workloads. Check your motherboard's supported memory first.`
    },
    {
        id: "hdd",
        title: "Consider switching to an SSD",
        condition: (pc) => pc.storage === "hdd",
        message: () =>
            `An SSD can improve boot times, application loading, and file access compared with a traditional hard drive. Verify your available drive connections before upgrading.`
    },
    {
        id: "gaming",
        title: "Review gaming performance",
        condition: (pc) => pc.usage === "gaming",
        message: (pc) =>
            `Your graphics card is ${pc.gpu} and your processor is ${pc.cpu}. Compare benchmarks for the games and resolution you use. Check both CPU and GPU performance before buying new hardware.`
    },
    {
        id: "programming",
        title: "Review your development workload",
        condition: (pc) => pc.usage === "programming",
        message: (pc) =>
            `For programming, consider how your ${pc.cpu}, ${pc.ram} GB of RAM, and storage handle your IDE, browser tabs, containers, and virtual machines.`
    },
    {
        id: "everyday",
        title: "Focus on everyday responsiveness",
        condition: (pc) => pc.usage === "everyday",
        message: () =>
            `For everyday tasks, sufficient RAM and solid-state storage can help. Check your actual system performance before spending money on a new processor.`
    },
    {
        id: "creative",
        title: "Check creative application requirements",
        condition: (pc) => pc.usage === "creative",
        message: (pc) =>
            `Creative workloads vary. Check the recommended specifications for your software and evaluate whether your ${pc.cpu}, ${pc.gpu}, and ${pc.ram} GB of RAM meet those needs.`
    },
    {
        id: "enough-ram",
        title: "Your RAM may already be sufficient",
        condition: (pc) => pc.ram >= 16,
        message: (pc) =>
            `${pc.ram} GB of RAM can be sufficient for many workloads. Monitor memory usage to see whether more capacity would actually help.`
    },
    {
        id: "ssd",
        title: "Your system already uses solid-state storage",
        condition: (pc) => pc.storage !== "hdd",
        message: () =>
            `Your selected storage is an SSD. Check available capacity and drive health before deciding whether additional storage is necessary.`
    }
];

function getFormData(form) {
    const data = new FormData(form);

    return {
        cpu: data.get("cpu").trim(),
        gpu: data.get("gpu").trim(),
        ram: Number(data.get("ram")),
        storage: data.get("storage"),
        usage: data.get("usage")
    };
}

function generateRecommendations(pc) {
    const matchedRules = upgradeRules.filter((rule) =>
        rule.condition(pc)
    );

    return matchedRules.map((rule) => ({
        id: rule.id,
        title: rule.title,
        message: rule.message(pc)
    }));
}

function displayRecommendations(pc, recommendations) {
    const results = document.querySelector("#results");
    const summary = document.querySelector("#results-summary");
    const list = document.querySelector("#recommendations");

    if (!results || !summary || !list) {
        return;
    }

    summary.textContent =
        `Your main use is ${pc.usage}. ` +
        `We found ${recommendations.length} suggestions to review.`;

    list.replaceChildren();

    recommendations.forEach((item) => {
        const listItem = document.createElement("li");
        const heading = document.createElement("strong");
        const message = document.createElement("p");

        heading.textContent = item.title;
        message.textContent = item.message;

        listItem.append(heading, message);
        list.append(listItem);
    });

    results.hidden = false;
}

function saveEvaluation(pc, recommendations) {
    const evaluation = {
        pc,
        recommendations,
        savedAt: new Date().toISOString()
    };

    try {
        localStorage.setItem(
            "pcUpgradeEvaluation",
            JSON.stringify(evaluation)
        );
    } catch {
        // The recommendations remain visible if storage is unavailable.
    }
}

function clearSavedEvaluation() {
    try {
        localStorage.removeItem("pcUpgradeEvaluation");
    } catch {
        // The page can still be used without local storage.
    }

    const results = document.querySelector("#results");

    if (results) {
        results.hidden = true;
    }
}

function handleAdvisorSubmit(event) {
    event.preventDefault();

    const pc = getFormData(event.currentTarget);
    const recommendations = generateRecommendations(pc);

    displayRecommendations(pc, recommendations);
    saveEvaluation(pc, recommendations);
}

function restoreEvaluation() {
    try {
        const saved = localStorage.getItem("pcUpgradeEvaluation");

        if (!saved) {
            return;
        }

        const evaluation = JSON.parse(saved);

        if (
            evaluation.pc &&
            Array.isArray(evaluation.recommendations) &&
            evaluation.recommendations.every((item) =>
                item &&
                typeof item.title === "string" &&
                typeof item.message === "string"
            )
        ) {
            displayRecommendations(
                evaluation.pc,
                evaluation.recommendations
            );
        }
    } catch {
        try {
            localStorage.removeItem("pcUpgradeEvaluation");
        } catch {
            // Storage is optional.
        }
    }
}

function initializeAdvisor() {
    const form = document.querySelector("#advisor-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", handleAdvisorSubmit);

    const clearButton = document.querySelector("#clear-evaluation");

    if (clearButton) {
        clearButton.addEventListener("click", clearSavedEvaluation);
    }

    restoreEvaluation();
}

function handleFeedbackSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const feedback = {
        name: data.get("name").trim(),
        rating: Number(data.get("rating")),
        usage: data.get("usage"),
        comments: data.get("comments").trim(),
        submittedAt: new Date().toISOString()
    };

    const status = document.querySelector("#feedback-status");

    try {
        const saved = localStorage.getItem("pcUpgradeFeedback");
        const feedbackList = saved ? JSON.parse(saved) : [];

        if (!Array.isArray(feedbackList)) {
            throw new Error("Invalid saved feedback data");
        }

        feedbackList.push(feedback);

        localStorage.setItem(
            "pcUpgradeFeedback",
            JSON.stringify(feedbackList)
        );

        if (status) {
            status.textContent =
                `Thank you for your feedback! Your rating of ${feedback.rating}/5 has been saved in this browser.`;
        }

        form.reset();
    } catch {
        if (status) {
            status.textContent =
                "Your feedback could not be saved in this browser. Please check your browser storage settings.";
        }
    }
}

function initializeFeedback() {
    const form = document.querySelector("#feedback-form");

    if (form) {
        form.addEventListener("submit", handleFeedbackSubmit);
    }
}

function initializePage() {
    displayCurrentYear();
    initializeAdvisor();
    initializeFeedback();
}

initializePage();
