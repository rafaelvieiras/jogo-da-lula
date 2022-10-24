export interface UseCaseInterface {
    execute<T>(input?: T): Promise<any>;
}