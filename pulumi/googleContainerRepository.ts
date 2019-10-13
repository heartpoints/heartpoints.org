import * as gcp from "@pulumi/gcp"

export const googleContainerRepository = gcp.container.getRegistryRepository();
