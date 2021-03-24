import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";
import { createChannel, deleteChannel, fetchChannel, fetchChannels, updateChannel } from "./actions/channel_actions";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
            users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    window.fetchChannel = fetchChannel;
    window.fetchChannels = fetchChannels;
    window.createChannel = createChannel;
    window.updateChannel = updateChannel;
    window.deleteChannel = deleteChannel;

    window.getState = store.getState;
    window.dispatch = store.dispatch;
    ReactDOM.render(<Root store={store}/>, root);
});