##First install helm 
apply helm-service-account.yaml
helm init --service-account tiller
Ensure success -- look for tiller pod

##Install cert manager
see install-cert-manager.sh
Test with 
kubectl get pods --namespace cert-manager
deploy the sample-self-signed-cert.yaml

##Create cluster issuer
kubectl apply -f ./heartpoints.org/cert/cluster-issuer.yaml

## craete cert 
kubectl apply -f ./heartpoints.org/cert/certificate.yaml 

## apply ingress