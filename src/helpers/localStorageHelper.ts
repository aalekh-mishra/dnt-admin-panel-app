/*  removeStorage: removes a key from localStorage and its sibling expiracy key
    params:
        key <string>     : localStorage key to remove
    returns:
        <boolean> : telling if operation succeeded
 */
export function removeStorage(key:any) {
    try {
        localStorage.setItem(key, "");
        localStorage.setItem(`${key}_expiresIn`, "");
    } catch (e) {
        console.log(`removeStorage: Error removing key [" ${key} "] from localStorage: ${JSON.stringify(e)}`);
        return false;
    }
    return true;
}
        
/*  getStorage: retrieves a key from localStorage previously set with setStorage().
        params:
            key <string> : localStorage key
        returns:
            <string> : value of localStorage key
            null : in case of expired key or failure
*/
export function getStorage(key:any) {
    // epoch time, lets deal only with integer
    const now = Date.now(); 
    // set expiration for storage
    let expiresIn = localStorage.getItem(`${key}_expiresIn`) as any
    if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
    }
        
    expiresIn = Math.abs(expiresIn);
    if (expiresIn < now) {
        // Expired
        removeStorage(key);
        return null;
    }

    try {
        const value = JSON.parse(localStorage.getItem(key) as string);
        return value;
    } catch (e) {
        console.log(`getStorage: Error reading key [" ${key} "] from localStorage: ${JSON.stringify(e)}`);
        return null;
    }
}
        
        /*  setStorage: writes a key into localStorage setting a expire time
            params:
                key <string>     : localStorage key
                value <string>   : localStorage value
                expires <number> : number of seconds from now to expire the key
            returns:
                <boolean> : telling if operation succeeded
         */
        export function setStorage(key:string, value:Object, expires?:number) {
            // default: seconds for 1 day
            if (expires === undefined || expires === null) {
                expires = 30 * 24 * 60 * 60; 
            }
            // millisecs since epoch time, lets deal only with integer
            const now = Date.now(); 
            const schedule = now + expires * 1000 as any
            try {
                localStorage.setItem(key, JSON.stringify(value));
                localStorage.setItem(`${key}_expiresIn`, schedule);
            } catch (e) {
                console.log(`setStorage: Error setting key [" ${key} "] in localStorage: ${JSON.stringify(e)}`);
                return false;
            }
            return true;
        }