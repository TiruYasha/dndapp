import { fakeAsync, tick } from "@angular/core/testing";
import { HubConnection } from "@aspnet/signalr";
import { instance, mock, verify, when } from "ts-mockito";
import { Hub } from "./hub";

describe('Generic Hub', () => {
    let sut: Hub;

    const mockedHubConnection = mock(HubConnection);

    beforeEach(() => {
        sut = new Hub(instance(mockedHubConnection));
    });

    it('start should call connection start and return promise', () => {
        // arrange
        when(mockedHubConnection.start()).thenReturn(Promise.resolve());

        // action
        sut.start()
            .then(() => {
                // assert
                expect(true).toBeTruthy();
                verify(mockedHubConnection.start()).called();
            });
    });

    it('on should listen to event', () => {
        // arrange
        const eventName = 'exampleEvent';
        const callback = (_) => {
            expect(true).toBeTruthy();
        };
        when(mockedHubConnection.on(eventName, callback)).thenCall(callback);

        // action
        sut.on<string>(eventName, callback);

        // assert
        verify(mockedHubConnection.on(eventName, callback)).called();
    });
});
