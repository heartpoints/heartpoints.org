heartpoints.org domain
======================

# Domain Registrar

The heartpoints.org domain is registered with [google domains](https://domains.google.com/m/registrar/heartpoints.org)

# DNS

The public DNS is served by DNS servers associated with the 
[Google Domains DNS Management UI](https://domains.google.com/m/registrar/heartpoints.org/dns).

## Version Controlled Copies of DNS Config

We keep a version controlled copy. If any changes are made via the UI, we MUST update these copies
contemporaneously.

- [Local Copy of DNS Configuration - BIND format](../src/dns/heartpoints.org.txt) 
- [Local Copy of DNS Configuration - GCP-specific YAML format](../src/dns/heartpoints.org.YAML)

## Possible Future DNS Solutions

In the future, we wish to more carefully code control the DNS settings, and then ensure our target cloud is configured
with the correct DNS settings whenever we merge to master, whether we build and deploy a docker image running
DNS or take advantage of GCP / GKE DNS configuration via REST options (eg: thru clients like kubectl or terraform)

- [GCP Cloud DNS](https://console.cloud.google.com/net-services/dns/zones?project=heartpoints-org&dnsPoliciessize=50)
- [GKE DNS](https://console.cloud.google.com/kubernetes/list?project=heartpoints-org)