export const fileUploadHandler = handlerFromProps => async (event) => {
    const {target: {files}} = event
    const reader = new FileReader();
    const file = files[0];
    if(file) {
        reader.onload = function (e: any) {
            if (e.target) {
                const src = e.target.result;
                file.src = src;
                handlerFromProps(src);
            }
        };
        reader.readAsDataURL(file);
    }
};
