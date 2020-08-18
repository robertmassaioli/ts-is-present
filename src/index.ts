export function isPresent<T>(t: T | undefined | null | void): t is T {
  return t !== undefined && t !== null;
}

export function isDefined<T>(t: T | undefined): t is T {
  return t !== undefined;
}

export function isFilled<T>(t: T | null): t is T {
  return t !== null;
}

/**
 * Returns a function that can be used to filter down objects
 * to the ones that have a key `k`.
 */
export function hasKey<K extends string | number | symbol>(k: K) {
  return function <T, V>(a: T & { [k in K]?: V }): a is T & { [k in K]: V } {
    return k in a;
  };
}

/**
 * Returns a function that can be used to filter down objects
 * to the ones that have a defined non-null value under a key `k`.
 *
 * @example
 * ```ts
 * const filesWithUrl = files.filter(file => file.url);
 * files[0].url // In this case, TS might still treat this as undefined/null
 *
 * const filesWithUrl = files.filter(hasPresentKey("url"));
 * files[0].url // TS will know that this is present
 * ```
 *
 * See https://github.com/microsoft/TypeScript/issues/16069
 * why is that useful.
 */
export function hasPresentKey<K extends string | number | symbol>(k: K) {
  return function <T, V>(
    a: T & { [k in K]?: V | null }
  ): a is T & { [k in K]: V } {
    return a[k] !== undefined && a[k] !== null;
  };
}

/**
 * Returns a function that can be used to filter down objects
 * to the ones that have a defined value under a key `k`.
 *
 * @example
 * ```ts
 * const filesWithUrl = files.filter(file => file.url);
 * files[0].url // In this case, TS might still treat this as undefined/null
 *
 * const filesWithUrl = files.filter(hasDefinedKey("url"));
 * files[0].url // TS will know that this is defined
 * ```
 *
 * See https://github.com/microsoft/TypeScript/issues/16069
 * why is that useful.
 */
export function hasDefinedKey<K extends string | number | symbol>(k: K) {
  return function <T, V>(a: T & { [k in K]?: V }): a is T & { [k in K]: V } {
    return a[k] !== undefined;
  };
}

/**
 * Returns a function that can be used to filter down objects
 * to the ones that have a specific value V under a key `k`.
 *
 * @example
 * ```ts
 * const imageFiles = files.filter(file => file.type === "image");
 * files[0].type // In this case, TS might still treat this as string/undefined/null
 *
 * const filesWithUrl = files.filter(hasValueKey("type", "image" as "image"));
 * files[0].type // TS will know that this is "image"
 * Note the cast is necessary otherwise TS will only know that type is a string
 * ```
 *
 * See https://github.com/microsoft/TypeScript/issues/16069
 * why is that useful.
 */
export function hasValueAtKey<K extends string | number | symbol, V>(
  k: K,
  v: V
) {
  return function <T>(a: T & { [k in K]: any }): a is T & { [k in K]: V } {
    return a[k] === v;
  };
}
