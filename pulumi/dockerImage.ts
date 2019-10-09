import * as docker from "@pulumi/docker";
import { appName } from "./appName";
import { imageName } from "./imageName";
import { commitSha } from "./commitSha";
import { registryHostAndPort } from "./registryHostAndPort";
import { registryUsername } from "./registryUsername";
import { registryPassword } from "./registryPassword";

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
        username: registryUsername(),
        password: registryPassword()
    }
});
