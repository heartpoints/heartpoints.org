export const isMobile = () => {
    const largestMobileScreenWidth = 480;

    return window.innerWidth <= largestMobileScreenWidth;
}