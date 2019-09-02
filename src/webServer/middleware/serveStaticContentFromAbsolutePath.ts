import express from "express"

export const serveStaticContentFromAbsolutePath = 
    expressApplication => 
    absolutePath => 
    expressApplication.use(express.static(absolutePath))
