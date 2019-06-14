export const textChangeHandler = 
    handlerFromProps => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    handlerFromProps(event.target.value)
