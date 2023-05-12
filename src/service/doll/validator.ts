export default function CustomValidator() {
  return function (
    target: Object,
    name: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalFunction = descriptor.value;
    descriptor.value = function (...args: unknown[]) {
      // business logic here
      return originalFunction.apply(this, args);
    };
    return descriptor;
  };
}
