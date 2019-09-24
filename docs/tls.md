TLS
===

Transport Layer Security (TLS) for the www.heartpoints.org and heartpoints.org uses the GCP Ingress
automatic certificate management capability [as configured in our k8s yaml](../heartpoints-k8s.yml)

This means that upon creation / update of the k8s ingress for our [GKE cluster](gkeSetup.md) the
hosting environment, in this case Google Compute Platform, ensures there are signed certificates
for both domains and then serves those up for https requests.

Insecure HTTP requests are passed thru to the express web server, which forces redirect to the
equivalent HTTPS address if Request Header `x-forwarded-proto` has value `http`, which indicates
presence of a load-balanced, insecure request.