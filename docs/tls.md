TLS
===

Transport Layer Security (TLS) for the www.heartpoints.org and heartpoints.org uses the GCP Ingress
automatic certificate management capability [as configured in our k8s yaml](../heartpoints-k8s.yml)

This means that upon creation / update of the k8s ingress for our [GKE cluster](gkeSetup.md) the
hosting environment, in this case Google Compute Platform, ensures there are signed certificates
for both domains and then serves those up for https requests.

Http requests are passed thru to the express web server, which forces redirect if either of the
following are true:

1. ENVIRONMENT VARIABLE `forceSSL=true`
2. Request contains `x-forwarded-proto` header with value `http` indicating the request is LOAD BALANCED

In either case, an http redirect is issued to the client with the https version of the requested url.