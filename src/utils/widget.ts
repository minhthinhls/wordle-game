/* Zopim helper */
export function setVisitor() {
    let interval = setInterval(() => {
        // @ts-ignore
        if(window.onSetVisitorInfo) {
            clearInterval(interval);
            // @ts-ignore
            window.onSetVisitorInfo();
        }
    },500);
}
