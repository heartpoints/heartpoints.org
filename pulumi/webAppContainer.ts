import { appName } from "./appName";
import { dockerImage } from "./dockerImage";
import { probeCommons } from "./probeCommons";

export const webAppContainer = {
    name: appName,
    image: dockerImage.id,
    imagePullPolicy: "IfNotPresent",
    resources: {
        requests: { cpu: "25m" },
    },
    readinessProbe: {
        ...probeCommons,
        periodSeconds: 5
    },
    livenessProbe: {
        ...probeCommons,
        periodSeconds: 10
    }
};
