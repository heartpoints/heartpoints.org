export const fileUploadHandler = handlerFromProps => async (image) => {
    const reader = new FileReader();
    const file = image[0];
    reader.onload = function (e: any) {
        if (e.target) {
            const src = e.target.result;
            file.src = src;
            handlerFromProps(src);
        }
    };
    reader.readAsDataURL(file);
};
