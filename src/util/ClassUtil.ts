export function cloneInstance(instance) {
    return Object.assign(Object.create(Object.getPrototypeOf(instance)), instance);
}