async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);

    return tab;
}

chrome.commands.onCommand.addListener(async (command) => {
    switch (command) {
        case "New tab":
            await chrome.tabs.create({ active: true });
            break;

        case "New tab in the current group":
            const currentTab = await getCurrentTab();
            const newTab = await chrome.tabs.create({ active: true });

            if (currentTab.groupId === chrome.tabGroups.TAB_GROUP_ID_NONE) {
                return;
            }

            await chrome.tabs.group({
                groupId: currentTab.groupId,
                tabIds: newTab.id,
            });
            break;
    }
});
