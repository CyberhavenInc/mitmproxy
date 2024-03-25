import * as React from "react";
import { render, screen } from "../test-utils";
import FlowView from "../../components/FlowView";
import * as flowActions from "../../ducks/flows";
import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import { fireEvent } from "@testing-library/react";
import { TStore } from "../ducks/tutils";
import { Provider } from "react-redux";

enableFetchMocks();

test("FlowView", async () => {
    fetchMock.mockReject(new Error("backend missing"));

    const { asFragment, store } = render(<FlowView />);
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByText("Response"));
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByText("WebSocket"));
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByText("Connection"));
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByText("Timing"));
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByText("Comment"));
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByText("Error"));
    expect(asFragment()).toMatchSnapshot();

    store.dispatch(flowActions.select(store.getState().flows.list[2].id));

    fireEvent.click(screen.getByText("Stream Data"));
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByText("Error"));
    expect(asFragment()).toMatchSnapshot();

    store.dispatch(flowActions.select(store.getState().flows.list[3].id));

    fireEvent.click(screen.getByText("Request"));
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByText("Response"));
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByText("Error"));
    expect(asFragment()).toMatchSnapshot();

    store.dispatch(flowActions.select(store.getState().flows.list[4].id));

    fireEvent.click(screen.getByText("Datagrams"));
    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(screen.getByText("Error"));
    expect(asFragment()).toMatchSnapshot();
});

test("FlowView close button", async () => {
    const store = TStore();

    const { getByTestId } = render(
        <Provider store={store}>
            <FlowView />
        </Provider>
    );
    fireEvent.click(getByTestId("close-button-id"));
    expect(store.getActions()).toEqual([
        { flowIds: [], type: flowActions.SELECT },
    ]);
});
