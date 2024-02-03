type Opt<T> = T | undefined;

export type Pointer<T> = {
    deref?: T;
}