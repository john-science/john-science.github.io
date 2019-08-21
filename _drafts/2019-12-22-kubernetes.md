---
layout: post
title: "Getting Started with Kubernetes"
tags: [Software, DevOps, Linux, Kubernetes, Minikube]
summary: First steps playing with Kubernetes
---
{% include JB/setup %}

Kubernetes is a orchestration layer for containerized applications. This is basically a stripped-down version of what Google uses that they have made open source. This is particularly helpful for designing multi-service applications, if your deployment is done through Docker containers. My interest in this is microservice design.

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

Another couple of quick checks:

```shell
$ minikube version
minikube version: v1.1.1

$ kubectl cluster-info
Kubernetes master is running at https://192.168.98.100:8443
KubeDNS is running at https://192.168.98.100:8443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

## Hello Minikube

Okay, now that we have Minikube installed, it's time to play around with it. For lack of a better idea, I'm just going to work through the ["Hello Minikube"](https://kubernetes.io/docs/tutorials/hello-minikube/) tutorial on the Kube website.

First things first, Kube is known for having a handy dashboard, so I'll take a look at that even though I know it won't be too exciting right now:

```shell
$ minikube dashboard
🔌  Enabling dashboard ...
🤔  Verifying dashboard health ...
🚀  Launching proxy ...
🤔  Verifying proxy health ...
🎉  Opening http://127.0.0.1:43155/api/v1/namespaces/kube-system/services/http:kubernetes-dashboard:/proxy/ in your default browser...
```
Apparently, this dashboard has a lot more bells and whistles when you're using the "real" Kubernetes, and not just Minikube. Oh well.

#### The App - Single HTML page

Okay, this little web app will be a Node.js server running the world's simplest website. And it will be put on a Docker image. Moreover, I won't even look at the Docker image or the Node.js code. I am just trying to learn about Kubernetes, so I will grab the image from the cloud somewhere and move on with my life.

Okay, so apparently the *real* Kubernetes has this great dashboard that comes with all these bells and whistles. But minikube comes with a paired down version:

```shell
minikube dashboard
```

Okay, in this line I grab a simple example website in a Docker image from the Minikube website and deploy it with Minikube:

```shell
kubectl create deployment hello-node --image=gcr.io/hello-minikube-zero-install/hello-node
```

If you don't want to use the dashboard, there are a ton of command line options available through Kubernetes Control (`kubectl`). For instance, you can list all your active deployments:

```shell
$ $ kubectl get deployments
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hello-node   1/1     1            1           3m
```

You can list the pods you have running, or how your Kube master node is configured:

```shell
$ kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
hello-node-78cd77d68f-dxsxn   1/1     Running   0          34m
username@computername:hello-node$ kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority: /home/username/.minikube/ca.crt
    server: https://192.168.98.100:8443
  name: minikube
contexts:
- context:
    cluster: minikube
    user: minikube
  name: minikube
current-context: minikube
kind: Config
preferences: {}
users:
- name: minikube
  user:
    client-certificate: /home/username/.minikube/client.crt
    client-key: /home/username/.minikube/client.key
```

Okay, but back to the meet of it. Our little web app isn't any help if we can't expose it to the outside world on some port:

```shell
$ kubectl expose deployment hello-node --type=LoadBalancer --port=8080
service/hello-node exposed
```

To view all the services you have running:

```shell
$ kubectl get services
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
hello-node   LoadBalancer   10.109.43.230   <pending>     8080:31140/TCP   5m
kubernetes   ClusterIP      10.96.0.1       <none>        443/TCP          12m

$ minikube service hello-node
🎉  Opening kubernetes service default/hello-node in default browser...
```

There it is!  We have a little website that displays "Hello, World!".  The website was stored on a Docker image and Kurbernetes was used to orchestrate the site.\ We have a little load balancing going. And if we had concerns about scaling our web app we would have all the tools we need baked right in to handle such things. Cool.

Now, to shut all of this down:

```shell
kubectl delete service hello-node
kubectl delete deployment hello-node
minikube stop
minikube delete
```




## Resources

* [The Official, Written Tutorial](https://kubernetes.io/docs/tutorials/hello-minikube/)
* [Kubernetes Tutorial - YouTube](https://www.youtube.com/playlist?list=PLot-YkcC7wZ9xwMzkzR_EkOrPahSofe5Q)
* [Services vs Deployments vs Replica Sets vs Pods vs Containers - YouTube](https://www.youtube.com/watch?v=ohSUtEfDefc)
