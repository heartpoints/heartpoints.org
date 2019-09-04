import { fileForAbsolutePath } from "../../utils/files/fileForAbsolutePath"
import { Response } from "express";

export const useStaticFile = 
    (absoluteFilePath:string) => 
    (httpResponse:Response) => 
    fileForAbsolutePath(absoluteFilePath).pipe(httpResponse)
