export interface LoadNames {
    generate: () => Promise<void>;
    getNames: () => Promise<Array<LoadNames.Model>>;
}

namespace LoadNames {
    export interface Model {
        name: string;
    }
}