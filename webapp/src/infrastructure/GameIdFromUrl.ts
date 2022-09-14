function lastPart(urlWithoutPublicURl: string) {
    const trimmed = urlWithoutPublicURl.trim();
    if (trimmed === '' || trimmed === '/') return undefined
    const urlParts = trimmed.split('/');
    return urlParts[urlParts.length - 1];
}

function publicUrl() {
    return process.env.PUBLIC_URL!!;
}

function currentPath() {
    return window.location.pathname.replace(/\/+$/, '');
}

export function noGameIdInUrl() {
    return currentPath() === process.env.PUBLIC_URL;
}

export function addGameIdToUrl(gameId: string) {
    window.history.pushState({}, 'GameId', currentPath() + '/' + gameId);
}

export function gameIdFromUrl() {
    if (publicUrl() !== "" && window.location.pathname.startsWith(publicUrl())) {
        return lastPart(window.location.pathname.substring(publicUrl().length));
    }
    return lastPart(window.location.pathname);
}