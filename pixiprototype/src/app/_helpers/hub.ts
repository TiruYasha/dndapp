import { HubConnection } from '@microsoft/signalr';
import { HubCommand, HubMethod } from '../_models/hub/method.model';

export class Hub {

    constructor(private connection: HubConnection) {

    }

    start(): Promise<void> {
        return this.connection.start();
    }

    on<T>(methodName: string, callback: (data: HubMethod<T>) => any): void {
        this.connection.on(methodName, callback);
    }

    send<T>(methodName: string, data: T): void {
        const contentWithMetaData: HubCommand<T> = {
            data
        };
        this.connection.send(methodName, contentWithMetaData);
    }
}
