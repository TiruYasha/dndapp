import { fakeAsync, tick } from '@angular/core/testing';
import { HubConnection } from '@microsoft/signalr';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { HubCommand } from './models/method.model';
import { Hub } from './hub';

describe('Generic Hub', () => {
    let sut: Hub;

    const mockedHubConnection = mock(HubConnection);

    // beforeEach(() => {
    //     sut = new Hub(instance(mockedHubConnection));
    // });

    // it('start should call connection start and return promise', () => {
    //     // arrange
    //     when(mockedHubConnection.start()).thenReturn(Promise.resolve());

    //     // action
    //     sut.start()
    //         .then(() => {
    //             // assert
    //             expect(true).toBeTruthy();
    //             verify(mockedHubConnection.start()).called();
    //         });
    // });

    // it('on should listen to event', () => {
    //     // arrange
    //     const methodName = 'exampleMethod';
    //     const callback = (_: any) => {
    //         expect(true).toBeTruthy();
    //     };
    //     when(mockedHubConnection.on(methodName, callback)).thenCall(callback);

    //     // action
    //     sut.on<string>(methodName, callback);

    //     // assert
    //     verify(mockedHubConnection.on(methodName, callback)).called();
    // });

    // it('send should send event to backend', () => {
    //     // arrange
    //     const methodName = 'exampleMethod';
    //     const content = '';
    //     // action
    //     sut.send(methodName, content);

    //     // assert
    //     verify(mockedHubConnection.send(methodName, anything())).called();
    // });
});
