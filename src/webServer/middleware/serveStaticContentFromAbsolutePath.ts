import express, { Application } from "express"

export const serveStaticContentFromAbsolutePath = 
    (expressApplication:Application) => 
    (absolutePath:string) => 
    expressApplication.use(express.static(absolutePath))
