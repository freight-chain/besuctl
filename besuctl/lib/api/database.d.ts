import low from 'lowdb';
declare const db: low.LowdbSync<any>;
export declare const getPreferences: () => any;
export declare const setPreferences: (newPrefs: any) => any;
export declare const getItems: () => any;
export declare const addItem: (p: any) => any;
export declare const updateItem: (p: any) => any;
export declare const deleteItem: (id: string) => any;
export default db;
