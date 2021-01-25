import { HubConnection } from "@aspnet/signalr";
import { Method } from "../_models/hub/method.model";

export class Hub {

    constructor(private connection: HubConnection) {

    }

    start(): Promise<void> {
        return this.connection.start();
    }

    on<T>(methodName: string, callback: (data: Method<T>) => any) {
        this.connection.on(methodName, callback);
    }
}