const cache: any = {};

function set(key: string, data: Object): void {
    cache[key] = {
        data,
        cachedAt: new Date().getTime()
    };
}

function get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
        resolve(cache[key] && cache[key].cachedAt + 15 * 60 * 1000 > new Date().getTime() ? cache[key].data : null);
    })
}

export default { set, get };