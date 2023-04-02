module MixtureDensityNetworks

import Flux
using Distributions
using Statistics
using ProgressLogging
using DocStringExtensions
using Pipe: @pipe

include("model.jl")
include("losses.jl")
include("interface.jl")

export likelihood_loss, MDN, fit!, predict, predict_mean, predict_mode

end