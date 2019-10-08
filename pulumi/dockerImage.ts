import { appName } from "./appName";
import { imageName } from "./imageName";
import { commitSha } from "./commitSha";
import { registryHostAndPort } from "./registryHostAndPort";
import * as docker from "@pulumi/docker";

//TODO: Error: [repositoryUrl] should not contain a tag: 5000/heartpoints.org
//see: https://github.com/pulumi/pulumi-docker/pull/107/files
//temp workaround: use an internet-based docker repo! booooo
export const dockerImage = new docker.Image(appName, {
    build: {
        context: "../",
        args: {
            commitSha: commitSha()
        }
    },
    imageName: imageName(),
    registry: {
        server: registryHostAndPort(),
        username: "heartpointsorg",
        password: "inmo5428"
    }
});
