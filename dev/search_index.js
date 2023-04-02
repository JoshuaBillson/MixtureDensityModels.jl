var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = MixtureDensityNetworks","category":"page"},{"location":"#MixtureDensityNetworks","page":"Home","title":"MixtureDensityNetworks","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Mixture Density Networks (MDNs) were first proposed by Bishop (1994). We can think of them as a specialized type of neural network, which are typically employed when our data has a lot of uncertainty or when the relationship between features and labels is one-to-many. Unlike a traditional neural network, which predicts a point-estimate equal to the mode of the learned conditional distribution P(Y|X), an MDN maintains the full condtional distribution by predicting the parameters of a Gaussian Mixture Model (GMM). The multi-modal nature of GMMs are precisely what makes MDNs so well-suited to modeling one-to-many relationships. This package aims to provide a simple interface for defining, training, and deploying MDNs.","category":"page"},{"location":"#Example","page":"Home","title":"Example","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"First, let's create our dataset. To properly demonstrate the power of MDNs, we'll generate a many-to-one dataset where each x-value can map to more than one y-value.","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Distributions, CairoMakie, MixtureDensityNetworks\n\nconst n_samples = 1000\n\nY = rand(Uniform(-10.5, 10.5), 1, n_samples)\nμ = 7sin.(0.75 .* Y) + 0.5 .* Y\nX = rand.(Normal.(μ, 1.0))\n\nfig, ax, plt = scatter(X[1,:], Y[1,:], markersize=5)","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: )","category":"page"},{"location":"","page":"Home","title":"Home","text":"Now we'll define our model and training parameters. For this example, we construct a network with 2 hidden layers of size 128, 5 Gaussian  mixtures, and we train for 1000 epochs. All other hyperparameters are set to their default values.","category":"page"},{"location":"","page":"Home","title":"Home","text":"model = MDN(epochs=1000, mixtures=5, layers=[128, 128])","category":"page"},{"location":"","page":"Home","title":"Home","text":"We can fit our model to our training data by calling fit!(model, X, Y). This method returns the learning curve, which we plot below.","category":"page"},{"location":"","page":"Home","title":"Home","text":"lc = fit!(model, X, Y)\nfig, _, _ = lines(1:1000, lc, axis=(;xlabel=\"Epochs\", ylabel=\"Loss\"))","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: )","category":"page"},{"location":"","page":"Home","title":"Home","text":"Let's evaluate how well our model learned to replicate our data by plotting both the learned and true distributions. We observe that our model has indeed learned to replicate the true distribution.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Ŷ = predict(model, X)\nfig, ax, plt = scatter(X[1,:], rand.(Ŷ), markersize=3, label=\"Predicted Distribution\")\nscatter!(ax, X[1,:], Y[1,:], markersize=3, label=\"True Distribution\")\naxislegend(ax, position=:lt)","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: )","category":"page"},{"location":"","page":"Home","title":"Home","text":"We can also visualize the conditional distribution predicted by our model at x = -2.0.","category":"page"},{"location":"","page":"Home","title":"Home","text":"cond = predict(model, reshape([-2.0], (1,1)))[1]\nfig = Figure(resolution=(1000, 500))\ndensity(fig[1,1], rand(cond, 10000), npoints=10000)","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: )","category":"page"},{"location":"","page":"Home","title":"Home","text":"Below is a script for running the complete example.","category":"page"},{"location":"","page":"Home","title":"Home","text":"using MixtureDensityNetworks, Distributions, CairoMakie\n\nconst n_samples = 1000\nconst epochs = 1000\nconst mixtures = 5\nconst layers = [128, 128]\n\nfunction main()\n    # Generate Data\n    Y = rand(Uniform(-10.5, 10.5), 1, n_samples)\n    μ = 7sin.(0.75 .* Y) + 0.5 .* Y\n    X = rand.(Normal.(μ, 1.0))\n\n    # Create Model\n    model = MDN(epochs=epochs, mixtures=mixtures, layers=layers)\n\n    # Fit Model\n    lc = fit!(model, X, Y)\n\n    # Plot Learning Curve\n    fig, _, _ = lines(1:epochs, lc, axis=(;xlabel=\"Epochs\", ylabel=\"Loss\"))\n    save(\"LearningCurve.png\", fig)\n\n    # Plot Learned Distribution\n    Ŷ = predict(model, X)\n    fig, ax, plt = scatter(X[1,:], rand.(Ŷ), markersize=4, label=\"Predicted Distribution\")\n    scatter!(ax, X[1,:], Y[1,:], markersize=3, label=\"True Distribution\")\n    axislegend(ax, position=:lt)\n    save(\"PredictedDistribution.png\", fig)\n\n    # Plot Conditional Distribution\n    cond = predict(model, reshape([-2.0], (1,1)))[1]\n    fig = Figure(resolution=(1000, 500))\n    density(fig[1,1], rand(cond, 10000), npoints=10000)\n    save(\"ConditionalDistribution.png\", fig)\nend\n\nmain()","category":"page"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#API","page":"Home","title":"API","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Modules = [MixtureDensityNetworks]\nPrivate = false","category":"page"},{"location":"#MixtureDensityNetworks.MDN","page":"Home","title":"MixtureDensityNetworks.MDN","text":"mutable struct MDN\n\nThe hyperparameters defining the classical MDN model.\n\nParameters\n\nmixtures::Int64\nlayers::Vector{Int64}\nη::Float64\nepochs::Int64\nbatchsize::Int64\nfitresult::Any\n\n\n\n\n\n","category":"type"},{"location":"#MixtureDensityNetworks.MDN-Tuple{}","page":"Home","title":"MixtureDensityNetworks.MDN","text":"MDN(; mixtures=5, layers=[128], η=1e-3, epochs=1, batchsize=32)\n\nDefines an MDN model with the given hyperparameters.\n\nParameters\n\nmixtures: The number of gaussian mixtures to use in estimating the conditional distribution (default=5).\nlayers: A vector indicating the number of nodes in each of the hidden layers (default=[128,]).\nη: The learning rate to use when training the model (default=1e-3).\nepochs: The number of epochs to train the model (default=1).\nbatchsize: The batchsize to use during training (default=32).\n\n\n\n\n\n","category":"method"},{"location":"#MixtureDensityNetworks.fit!-Tuple{MDN, Matrix{<:Real}, Matrix{<:Real}}","page":"Home","title":"MixtureDensityNetworks.fit!","text":"fit!(\n    model::MDN,\n    X::Matrix{<:Real},\n    Y::Matrix{<:Real}\n) -> Vector{Float64}\n\n\nFit the model to the data given by X and Y.\n\nParameters\n\nmodel: The MDN to be trained.\nX: A dxn matrix where d is the number of features and n is the number of samples.\nY: A 1xn matrix where n is the number of samples.\n\n\n\n\n\n","category":"method"},{"location":"#MixtureDensityNetworks.likelihood_loss-Tuple{Matrix{<:Real}, Matrix{<:Real}, Matrix{<:Real}, Matrix{<:Real}}","page":"Home","title":"MixtureDensityNetworks.likelihood_loss","text":"likelihood_loss(\n    μ::Matrix{<:Real},\n    σ::Matrix{<:Real},\n    pi::Matrix{<:Real},\n    y::Matrix{<:Real}\n) -> Float64\n\n\nConpute the negative log-likelihood loss for a set of labels y under a Gaussian Mixture Model defined by the parameters μ, σ, and pi.\n\nParameters\n\nμ: A mxn matrix of means where m is the number of Gaussian mixtures and n is the number of samples.\nσ: A mxn matrix of standard deviations where m is the number of Gaussian mixtures and n is the number of samples.\npi: A mxn matrix of priors where m is the number of Gaussian mixtures and n is the number of samples.\ny: A 1xn matrix of labels where n is the number of samples.\n\n\n\n\n\n","category":"method"},{"location":"#MixtureDensityNetworks.predict-Tuple{MDN, Matrix{<:Real}}","page":"Home","title":"MixtureDensityNetworks.predict","text":"predict(\n    model::MDN,\n    X::Matrix{<:Real}\n) -> Vector{Distributions.MixtureModel}\n\n\nPredict the full conditional distribution P(Y|X).\n\nParameters\n\nmodel: The MDN with which we want to generate a prediction.\nX: A dxn matrix where d is the number of features and n is the number of samples.\n\nReturns\n\nReturns a vector of Distributions.MixtureModel objects representing the conditional distribution for each sample.\n\n\n\n\n\n","category":"method"},{"location":"#MixtureDensityNetworks.predict_mean-Tuple{MDN, Matrix{<:Real}}","page":"Home","title":"MixtureDensityNetworks.predict_mean","text":"predict_mean(\n    model::MDN,\n    X::Matrix{<:Real}\n) -> AbstractVector\n\n\nPredict the mean of the conditional distribution P(Y|X). \n\nParameters\n\nmodel: The MDN with which we want to generate a prediction.\nX: A dxn matrix where d is the number of features and n is the number of samples.\n\nReturns\n\nReturns a vector of real numbers representing the mean of the conditional distribution P(Y|X) for each sample.\n\n\n\n\n\n","category":"method"},{"location":"#MixtureDensityNetworks.predict_mode-Tuple{MDN, Matrix{<:Real}}","page":"Home","title":"MixtureDensityNetworks.predict_mode","text":"predict_mode(model::MDN, X::Matrix{<:Real}) -> Any\n\n\nPredict the mean of the Gaussian with the largest prior in the conditional distribution P(Y|X). \n\nParameters\n\nmodel: The MDN with which we want to generate a prediction.\nX: A dxn matrix where d is the number of features and n is the number of samples.\n\nReturns\n\nReturns a vector of real numbers representing the mean of the gaussian with the largest prior for each sample.\n\n\n\n\n\n","category":"method"}]
}
