
export function scrollToOffsetFromBottom(offset = 200, smooth = true) {
    const doc = document.documentElement;
    const body = document.body;
    const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
    const target = Math.max(0, scrollHeight - window.innerHeight - offset);
    window.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'auto' });
}


export function waitForStableHeight(timeout = 2000, stableMs = 200) {
    return new Promise((resolve) => {
        const start = performance.now();
        let lastHeight = document.documentElement.scrollHeight;
        let stableSince = performance.now();

        const check = () => {
            const h = document.documentElement.scrollHeight;
            if (h !== lastHeight) {
                lastHeight = h;
                stableSince = performance.now();
            }
            if (performance.now() - stableSince >= stableMs) {
                resolve();
            } else if (performance.now() - start > timeout) {
                resolve();
            } else {
                requestAnimationFrame(check);
            }
        };
        requestAnimationFrame(check);
    });
}

export async function scrollToOffsetFromBottomWhenStable(offset = 200) {
    await waitForStableHeight();
    scrollToOffsetFromBottom(offset, true);
}