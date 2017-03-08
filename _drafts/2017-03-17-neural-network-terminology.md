---
layout: post
title: "Neural Network Jagon"
tags: [Software, Neural Networks, Machine Learning]
summary: A beginner's dictionary of important neural network terminology.
---
{% include JB/setup %}

<script type="text/javascript">
function hideshow(a){document.getElementById&&("block"==a.style.display?a.style.display="none":a.style.display="block")}
</script>

<p>Jargon is always a huge stopping block for anyone new to a field.  And the study of neural networks is no different.  In fact, for such a young field, there is already quite a lot of jargon. What follows is a short list of important terminology designed to aid beginners wading through their first extercises studies of neural networks.</p>

<p>If I missed something important, feel free to leave a comment below and I will add it to the list when I get a chance.</p>

<ul>

<li>
<a href="javascript:hideshow(document.getElementById('acc'))">Accuracy</a>
<div id="acc" style="display: none">
<p>In science and engineering, the "<a href="https://en.wikipedia.org/wiki/Accuracy_and_precision" target="_blank">accuracy</a>" of a measurement is a description of how close that measurement is to some "true" value. By contrast, the "precision" of a measurement describes how reproducible that measurement is.</p>
<p>The accuracy of a neural network is a representation of how many inputs to the neural network result in the correct output. The accuracy of a neural network should only be trusted if it was measured against proper test data.</p>
<p style="font-size:small">(see Loss Function, Test Data)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('act_fun'))">Activation Function</a>
<div id="act_fun" style="display: none">
<p>Each neuron in an artificial neural network takes in an arbitrary number of numerical inputs and outputs (usually) a single value. There are, obviously, many different mathematical functions and algorithms possible to do this computation, and they are collectively known as <a href="https://en.wikipedia.org/wiki/Activation_function" target="_blank">Activation Functions</a>.</p>
<p>There are a <a href="https://en.wikibooks.org/wiki/Artificial_Neural_Networks/Activation_Functions" target="_blank">huge</a> <a href="https://en.wikipedia.org/wiki/Activation_function#Comparison_of_activation_functions" target="_blank">variety</a> of activation functions in use in neural networks. Some of the more common include: the Step Function, variations on the Sigmoid Function, Softmax, and ReLU.</p>
<p style="font-size:small">(see Artificial Neural Network, Neuron, ReLU, Step Function, Sigmoid, Softmax)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('ai'))">Artificial Intelligence (AI)</a>
<div id="ai" style="display: none">
<p><a href="https://en.wikipedia.org/wiki/Artificial_intelligence" target="_blank">Artificial Intelligence</a> is the field of computer science devoted to building software that can mimick complex analytical tasks previously only achievable by humans.</p> 
<p>NOTE: Compare and Contrast with Machine Learning.</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('ann'))">Artificial Neural Network</a>
<div id="ann" style="display: none">
<p>
https://en.wikipedia.org/wiki/Artificial_neural_network
</p>
<p style="font-size:small">(see Artificial Neural)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('artn'))">Artificial Neuron</a>
<div id="artn" style="display: none">
<p>
(neuron)
(see NN)
https://en.wikipedia.org/wiki/Artificial_neuron
</p>
<p style="font-size:small">(see Artificial Neural Network)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('backp'))">Back Propogation</a>
<div id="backp" style="display: none">
<p>
https://en.wikipedia.org/wiki/Backpropagation
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('bat'))">Batch</a>
<div id="bat" style="display: none">
<p>
https://www.coursera.org/learn/machine-learning/lecture/9zJUs/mini-batch-gradient-descent
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('batch_norm'))">Batch Normalization</a>
<div id="batch_norm" style="display: none">
<p>
https://arxiv.org/abs/1502.03167
https://kratzert.github.io/2016/02/12/understanding-the-gradient-flow-through-the-batch-normalization-layer.html
</p>
<p style="font-size:small">(see Batch, Bias)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('bias'))">Bias</a>
<div id="bias" style="display: none">
<p>
http://ufldl.stanford.edu/wiki/index.php/Neural_Networks#Neural_Network_model
(bias on a neuron)
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('caf'))">Caffe</a>
<div id="caf" style="display: none">
<p><a href="http://caffe.berkeleyvision.org/" target="_blank">Caffe</a> is a popular deep learning modeling framework.  Designed with deep neural networks in mind, Caffe is open source and BSD licensed, and is quite popular. Caffe is written in C/C++ and has APIs available in C++, Python, and Matlab.</p>
<p>Theano features an option to allow GPU acceleration of the basic neuron calculations, for a large set of common GPUs.</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('cla'))">Classification</a>
<div id="cla" style="display: none">
<p><a href="https://en.wikipedia.org/wiki/Statistical_classification" target="_blank">Classification</a> problems are those where a particular input needs to be mapped to one of a set of possible outputs. For instance, the problem of determine which numeral a hand-written digit represents. Classification is a problem general to machine learning, not just neural networks.
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('comv'))">Computer Vision</a>
<div id="comv" style="display: none">
<p><a href="https://en.wikipedia.org/wiki/Computer_vision" target="_blank">Computer Visions</a> is a broadly interdisciplinary field, that deals with the software necessary to allow computers to interpret the content of images and videos. <a href="https://en.wikipedia.org/wiki/Facial_recognition_system" target="_blank">Facial Recognition</a> is a common computer vision task. But other computer vision tasks include: identifying what objects are in an image, <a href="https://en.wikipedia.org/wiki/Optical_character_recognition" target="_blank">Optical Character Recognition (OCR)</a>, and 3D-object ,<a href="https://en.wikipedia.org/wiki/Video_tracking" target="_blank">tracking analysis</a>.
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('cnn'))">Convolutional Neural Network (CNN)</a>
<div id="cnn" style="display: none">
<p>
https://en.wikipedia.org/wiki/Convolutional_neural_network
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('cent'))">Cross Entropy</a>
<div id="cent" style="display: none">
<p>
https://en.wikipedia.org/wiki/Cross_entropy
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('decor'))">Decorrelation</a>
<div id="decor" style="display: none">
<p>
https://en.wikipedia.org/wiki/Decorrelation
</p>
<p style="font-size:small">(see Whitening)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('deep'))">Deep</a>
<div id="deep" style="display: none">
<p>
TODO
</p>
<p style="font-size:small">(see Deep Learning, Shallow)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('dl'))">Deep Learning (DL)</a>
<div id="dl" style="display: none">
<p>
https://en.wikipedia.org/wiki/Deep_learning
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('drop'))">Dropout</a>
<div id="drop" style="display: none">
<p>
maybe original paper: https://arxiv.org/abs/1207.0580
handy paper: http://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('epo'))">Epoch</a>
<div id="epo" style="display: none">
<p>
http://stackoverflow.com/questions/4752626/epoch-vs-iteration-when-training-neural-networks
</p>
<p style="font-size:small">(see Batch)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('feam'))">Feature Map</a>
<div id="feam" style="display: none">
<p>
https://en.wikipedia.org/wiki/Feature_%28machine_learning%29
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('feed'))">Feedforward Neural Network</a>
<div id="feed" style="display: none">
<p>
https://en.wikipedia.org/wiki/Feedforward_neural_network
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('filter'))">Filter</a>
<div id="filter" style="display: none">
<p>???
http://scholarpedia.org/article/Neural_Filtering
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('gpu'))">GPU</a>
<div id="gpu" style="display: none">
<p>A <a href="https://en.wikipedia.org/wiki/Graphics_processing_unit" target="_blank">GPU</a> is a specialized electronic circuit (microchip) designed to greatly increase the performance of the kinds of calculations computers need to do to display visual graphics. At its most base level, these circuits are designed to perform a narrow range of basic mathematical operations. But the trade off is they are designed to do many, perhaps hundreds, of such operations in parallel.</p>
<p>GPUs have gained popularity in neural networks, as neural network algorithms involve many neurons doing simple calculations in parallel. As such, most neural network libraries these days come with GPU acceleration as a configurable option.</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('grad'))">Gradient</a>
<div id="grad" style="display: none">
<p>
https://en.wikipedia.org/wiki/Gradient
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('gd'))">Gradient Descent</a>
<div id="gd" style="display: none">
<p>
https://en.wikipedia.org/wiki/Gradient_descent
</p>
<p style="font-size:small">(see Back Propogation)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('hyp'))">Hyper Parameter</a>
<div id="hyp" style="display: none">
<p>
http://cs231n.github.io/neural-networks-3/#hyper
(Hyper Parameter Optimization)
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('ir'))">Image Recognition</a>
<div id="ir" style="display: none">
<p>
https://en.wikipedia.org/wiki/Computer_vision#Recognition
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('ker'))">Kernel Perceptron</a>
<div id="ker" style="display: none">
<p>https://en.wikipedia.org/wiki/Kernel_perceptron

</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('l1'))">L1</a>
<div id="l1" style="display: none">
<p>
http://www.ai4trade.com/GeneticAlgorithmsInForex/l1-regularization-neural-networks
L1 vs L2
https://jamesmccaffrey.wordpress.com/2015/02/07/l1-and-l2-regularization-for-machine-learning/
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('l2'))">L2</a>
<div id="l2" style="display: none">
<p>
L1 vs L2
https://jamesmccaffrey.wordpress.com/2015/02/07/l1-and-l2-regularization-for-machine-learning/
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('lr'))">Learning Rate</a>
<div id="lr" style="display: none">
<p>
http://cs231n.github.io/neural-networks-3/
</p>
<p style="font-size:small">(see Loss Function)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('lrf'))">Local Receptive Fields</a>
<div id="lrf" style="display: none">
<p>
http://neuralnetworksanddeeplearning.com/chap6.html
</p>
<p style="font-size:small">(see CNN)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('logf'))">Logistic Function</a>
<div id="logf" style="display: none">
<p style="font-size:small">(see Sigmoid)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('logit'))">Logit</a>
<div id="logit" style="display: none">
<p>The Logit function is the inverse of the Logistic function.
https://en.wikipedia.org/wiki/Logit

https://en.wikipedia.org/wiki/Logit#/media/File:Logit.svg
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('loss'))">Loss Function</a>
<div id="loss" style="display: none">
<p>

http://cs231n.github.io/neural-networks-3/
(vs Learning Rate)
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('minib'))">Mini-Batch</a>
<div id="minib" style="display: none">
<p>
https://www.coursera.org/learn/machine-learning/lecture/9zJUs/mini-batch-gradient-descent
</p>
<p style="font-size:small">(see Batch)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('mnist'))">MNIST Database</a>
<div id="mnist" style="display: none">
<p>
https://en.wikipedia.org/wiki/MNIST_database
http://yann.lecun.com/exdb/mnist/
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('nlp'))">Natural Language Processing (NLP)</a>
<div id="nlp" style="display: none">
<p>
https://en.wikipedia.org/wiki/Natural_language_processing
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('nn'))">Neural Network</a>
<div id="nn" style="display: none">
<p style="font-size:small">(see Artificial Neural Network)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('neur'))">Neuron</a>
<div id="neur" style="display: none">
<p style="font-size:small">(see Artificial Neuron)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('norm'))">Normalization</a>
<div id="norm" style="display: none">
<p>
http://cs231n.github.io/neural-networks-2/
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('ocr'))">Optical Character Recognition (OCR)</a>
<div id="ocr" style="display: none">
<p>
https://en.wikipedia.org/wiki/Optical_character_recognition
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('overf'))">Overfitting</a>
<div id="overf" style="display: none">
<p>
https://en.wikipedia.org/wiki/Overfitting
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('per'))">Perceptron</a>
<div id="per" style="display: none">
<p>
https://en.wikipedia.org/wiki/Perceptron
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('pool'))">Pooling</a>
<div id="pool" style="display: none">
<p>
(also max-pooling and L2-pooling)
http://ufldl.stanford.edu/tutorial/supervised/Pooling/
https://en.wikipedia.org/wiki/Convolutional_neural_network#Pooling_layer
http://neuralnetworksanddeeplearning.com/chap6.html
</p>
<p style="font-size:small">(see CNN)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('pca'))">Principal Components Analysis (PCA)</a>
<div id="pca" style="display: none">
<p>
http://cs231n.github.io/neural-networks-2/
</p>
<p style="font-size:small">(see Whitening)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('rnn'))">Recurrent Neural Network (RNN)</a>
<div id="rnn" style="display: none">
<p>
https://en.wikipedia.org/wiki/Recurrent_neural_network
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('reg'))">Regularization</a>
<div id="reg" style="display: none">
<p>Regularization of a neural network refers to those techniques used to fight overfitting. The most common regularization techniques are: L1, L2, and Dropout.

http://cs231n.github.io/neural-networks-2/#reg
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('relu'))">ReLU</a>
<div id="relu" style="display: none">
<p>
<a href="https://en.wikipedia.org/wiki/Rectifier_%28neural_networks%29" target="_blank">(Wiki)</a>
</p>
<p style="font-size:small">(see Activation Function)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('shal'))">Shallow</a>
<div id="shal" style="display: none">
<p>In machine learning, "shallow" is a derogitory term used to describe a neural network that is not sufficiently "deep".  This is due to a particularly droll sort of egotism around the idea that "my network is deeper than yours". Yawn.</p>
<p style="font-size:small">(see Deep)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('shw'))">Shared Weights</a>
<div id="shw" style="display: none">
<p>
http://neuralnetworksanddeeplearning.com/chap6.html
</p>
<p style="font-size:small">(see CNN)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('sig'))">Sigmoid</a>
<div id="sig" style="display: none">
<p>
<a href="https://en.wikipedia.org/wiki/Logistic_function" target="_blank">Logistic function</a>

https://en.wikipedia.org/wiki/Logistic_function#/media/File:Logistic-curve.svg
</p>
<p style="font-size:small">(see Activation Function)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('sm'))">Softmax</a>
<div id="sm" style="display: none">
<p>
https://en.wikipedia.org/wiki/Softmax_function
</p>
<p style="font-size:small">(see Activation Function)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('sr'))">Speech Recognition</a>
<div id="sr" style="display: none">
<p>
https://en.wikipedia.org/wiki/Speech_recognition
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('step'))">Step Function</a>
<div id="step" style="display: none">
<p>
https://en.wikipedia.org/wiki/Heaviside_step_function
</p>
<p style="font-size:small">(see Activation Function)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('sgd'))">Stochiastic Gradient Descent</a>
<div id="sgd" style="display: none">
<p>
http://cs231n.github.io/neural-networks-3/#sgd
</p>
<p style="font-size:small">(see Gradient Descent)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('st'))">Stride</a>
<div id="st" style="display: none">
<p>
cs231n.github.io/convolutional-networks/
</p>
<p style="font-size:small">(see CNN)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('ten'))">Tensor</a>
<div id="ten" style="display: none">
<p>In mathematics and physics a <a href="https://en.wikipedia.org/wiki/Tensor" target="_blank">tensor</a> is an object that performs a transformation on a vector. That vector can be in any number of dimensions and that transformation can be almost anything: shrinking, stretching, rotating or flipping a vector in an arbitrary way.</p>
<p>Be wary, as the term "tensor" is <a href="http://stats.stackexchange.com/a/198395" target="_blank">frequently mis-applied</a> in machine learning to mean "any multi-dimensional array". This is incorrect, but so prevalent that even Google has titled their most popular machine learning library "TensorFlow".</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('tf'))">TensorFlow</a>
<div id="tf" style="display: none">
<p><a href="https://www.tensorflow.org/" target="_blank">TensorFlow</a> is a popular, open-source machine learning library. Originally developed by Google's Brain Team, it is now hosted on <a href="https://github.com/tensorflow" target="_blank">GitHub</a>. The software was originally designed for neural networks, but has since been use more generally in the machine learnig community.  The code base itself is writen in C++, and the two most popular APIs are currently in C++ and Python.</p>
<p>TensorFlow features an option to allow GPU acceleration of the basic neuron calculations, for a large set of common GPUs.</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('test'))">Test Data</a>
<div id="test" style="display: none">
<p><a href="http://users.cecs.anu.edu.au/~jinyu/JinYu_files/preproj/ANN.pdf" target="_blank">Testing data</a> is used after a neural network has been fully trained to determine how accurate the neural network is.  In order for the results of the test data runs to be trusted, the test data cannot be used in any way to train the network.</p>
<p style="font-size:small">(see Accuracy, Training Data, Validation Data)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('the'))">Theano</a>
<div id="the" style="display: none">
<p><a href="http://deeplearning.net/software/theano/introduction.html" target="_blank">Theano</a> is a popular, open-source machine learning library.</p>
<p>Theano features an option to allow GPU acceleration of the basic neuron calculations, for a large set of common GPUs.</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('train'))">Training Data</a>
<div id="train" style="display: none">
<p><a href="http://users.cecs.anu.edu.au/~jinyu/JinYu_files/preproj/ANN.pdf" target="_blank">Training data</a> is the set of data used to train a neural network. This data must be kept completely independent from the Validation and Testing data in order to reliably determine the accuracy of the final neural network.</p>
<p style="font-size:small">(see Accuracy, Testing Data, Validation Data)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('valid'))">Validation Data</a>
<div id="valid" style="display: none">
<p><a href="http://users.cecs.anu.edu.au/~jinyu/JinYu_files/preproj/ANN.pdf" target="_blank">Validation data</a> is an independent data set used to test a neural network for overfitting. Occassionally, during the training of a neural network, using the training data, the accuracy of the neural network is tested against the validation data set. A well-designed neural network will very slowly get more accurate over a long time, and at some point start to become less accurate. At that point, it is desirable to stop training your network.  This point can only be identified if there is a validation data set completely independent of the training data set.</p>
<p style="font-size:small">(see Accuracy, Overfitting, Training Data)</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('whi'))">Whitening</a>
<div id="whi" style="display: none">
<p>
https://theclevermachine.wordpress.com/2013/03/30/the-statistical-whitening-transform/

http://stats.stackexchange.com/questions/7757/data-normalization-and-standardization-in-neural-networks

http://cs231n.github.io/neural-networks-2/
</p>
</div>
</li>


<li>
<a href="javascript:hideshow(document.getElementById('xgb'))">XGBoost</a>
<div id="xgb" style="display: none">
<p>
http://xgboost.readthedocs.io/en/latest/model.html
</p>
</div>
</li>

</ul>
