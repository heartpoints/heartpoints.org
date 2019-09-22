#!/usr/bin/env bash

private_key_path() {
    echo "./cert/heartpoints.key"
}

public_key_path() {
    echo "./cert/heartpoints.pub"
}

cert_signing_request_path() {
    echo "./cert/heartpoints.csr"
}

cert_path() {
    echo "./cert/heartpoints.crt"
}

private_key_gen() {
    mkdir -p ./cert
    openssl genrsa -out "$(private_key_path)" 2048
    openssl rsa -in "$(private_key_path)" -pubout > "$(public_key_path)"
}

cert_signing_request_create() {
    private_key_gen
    openssl req -new -key "$(private_key_path)" -out "$(cert_signing_request_path)" -subj "/CN=heartpoints.org"
}

hp_cert_create() {
    cert_signing_request_create
    openssl x509 -req -days 365 -in "$(cert_signing_request_path)" -signkey "$(private_key_path)" -out "$(cert_path)"
}