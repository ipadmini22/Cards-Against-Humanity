// Contains the location of the different stored data.
// Keys generated via: https://codebeautify.org/string-hex-converter
const lit = <V extends keyof any>(v: V) => v;
export const StorageKeys = {
    USER_REFRESH_TOKEN: lit('4c4f47494e'),
    USER_ID: lit('sdf32423sd'),
    USER_MAIL: lit('555345525f4d41494c'),
    USER_NICKNAME: lit('555345525f4e414d45'),
};
export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
