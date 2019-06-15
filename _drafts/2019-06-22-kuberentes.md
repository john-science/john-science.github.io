---
layout: post
title: "Getting Started with Kubernetes"
tags: [Software, DevOps, Linux, Kubernetes, Minikube]
summary: First steps playing with Kubernetes
---
{% include JB/setup %}

TODO

## Installing Minikube

After some conversation, I have been convinced that I should start by installing Minikube, which is made by the Kubernetes team so you can play with Kubernetes on your laptop.

[Here](https://kubernetes.io/docs/tasks/tools/install-minikube/) is the installation guide that easily worked for me on Ubuntu 18.08.

I also installed [VirtualBox](https://www.virtualbox.org/) and [Docker](https://www.docker.com/), because this is typically the stack you'll be using.

#### Success!

Okay, the installation went pretty easy. So far, so good.

```shell
$ minikube start
😄  minikube v1.1.1 on linux (amd64)
💿  Downloading Minikube ISO ...
 131.29 MB / 131.29 MB [============================================] 100.00% 0s
🔥  Creating virtualbox VM (CPUs=2, Memory=2048MB, Disk=20000MB) ...
🐳  Configuring environment for Kubernetes v1.14.3 on Docker 18.09.6
💾  Downloading kubeadm v1.14.3
💾  Downloading kubelet v1.14.3
🚜  Pulling images ...
🚀  Launching Kubernetes ... 
⌛  Verifying: apiserver proxy etcd scheduler controller dns
🏄  Done! kubectl is now configured to use "minikube"
```

## Hello Minikube

Okay, now that we have Minikube installed, it's time to play around with it. For lack of a better idea, I'm just going to work through the ["Hello Minikube"](https://kubernetes.io/docs/tutorials/hello-minikube/) tutorial on the Kube website.

