export enum PlayerAction {
    MOVE = 'Move',
}

export function isEnumValue(value: string, enumeration: any): boolean {
    return Object.values(enumeration).includes(value);
}
