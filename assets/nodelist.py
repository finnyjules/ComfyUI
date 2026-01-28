{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # ComfyUI Node Directory for Beginners\
# Structure: \{ Category: \{ NodeName: (NodeAddress, Description) \} \}\
\
comfy_nodes = \{\
    "sampling": \{\
        "KSampler": ("sampling", "Turns noise into images via chosen settings."),\
        "KSamplerAdvanced": ("sampling", "Expert control over noise levels and steps."),\
        "SamplerCustom": ("sampling/custom_sampling", "Modular generator built using custom parts."),\
        "SamplerCustomAdvanced": ("sampling/custom_sampling", "Professional tool for complex custom sampling."),\
        "BasicScheduler": ("sampling/custom_sampling/schedulers", "Sets standard timeline for noise removal."),\
        "KarrasScheduler": ("sampling/custom_sampling/schedulers", "Popular schedule for smooth, high-quality details."),\
        "ExponentialScheduler": ("sampling/custom_sampling/schedulers", "Aggressive schedule clearing noise at start."),\
        "PolyexponentialScheduler": ("sampling/custom_sampling/schedulers", "Uses complex math for unique patterns."),\
        "LaplaceScheduler": ("sampling/custom_sampling/schedulers", "High-precision math for fine-tuned generation."),\
        "VPScheduler": ("sampling/custom_sampling/schedulers", "Specialized timeline for specific model types."),\
        "BetaSamplingScheduler": ("sampling/custom_sampling/schedulers", "Controls noise using mathematical curves."),\
        "SDTurboScheduler": ("sampling/custom_sampling/schedulers", "Extremely fast single-step image generation."),\
        "AlignYourStepsScheduler": ("sampling/custom_sampling/schedulers", "Matches noise removal to specific models."),\
        "GITSScheduler": ("sampling/custom_sampling/schedulers", "Advanced timeline for smoother visual quality."),\
        "Flux2Scheduler": ("sampling/custom_sampling/schedulers", "Noise timeline designed specifically for Flux."),\
        "OptimalStepsScheduler": ("sampling/custom_sampling/schedulers", "Calculates perfect step count for models."),\
        "KSamplerSelect": ("sampling/custom_sampling/samplers", "Menu to pick favorite sampling algorithms."),\
        "SamplerEulerAncestral": ("sampling/custom_sampling/samplers", "Creative sampler adding variety every step."),\
        "SamplerEulerAncestralCFGPP": ("sampling/custom_sampling/samplers", "Euler sampler with better prompt accuracy."),\
        "SamplerLMS": ("sampling/custom_sampling/samplers", "Stable, reliable sampler for general tasks."),\
        "SamplerDPMPP_3M_SDE": ("sampling/custom_sampling/samplers", "High-end sampler for extremely sharp images."),\
        "SamplerDPMPP_2M_SDE": ("sampling/custom_sampling/samplers", "Versatile sampler balancing speed and quality."),\
        "SamplerDPMPP_SDE": ("sampling/custom_sampling/samplers", "Adds realistic texture and natural grain."),\
        "SamplerDPMPP_2S_Ancestral": ("sampling/custom_sampling/samplers", "Creative sampler producing high visual diversity."),\
        "SamplerDPMAdaptative": ("sampling/custom_sampling/samplers", "Automatically adjusts math for perfect quality."),\
        "SamplerER_SDE": ("sampling/custom_sampling/samplers", "Expert sampler for high-precision noise removal."),\
        "SamplerSASolver": ("sampling/custom_sampling/samplers", "Advanced solver for professional-grade results."),\
        "SamplerSEEDS2": ("sampling/custom_sampling/samplers", "Experimental tool for testing new mathematics."),\
        "SamplerLCMUpscale": ("sampling/custom_sampling/samplers", "Fast sampler for upscaling using LCM."),\
        "SplitSigmas": ("sampling/custom_sampling/sigmas", "Divides noise levels into two groups."),\
        "SplitSigmasDenoise": ("sampling/custom_sampling/sigmas", "Splits noise levels based on denoise."),\
        "FlipSigmas": ("sampling/custom_sampling/sigmas", "Reverses noise level order for effects."),\
        "SetFirstSigma": ("sampling/custom_sampling/sigmas", "Manually sets the exact starting noise."),\
        "ExtendIntermediateSigmas": ("sampling/custom_sampling/sigmas", "Adds math steps between existing levels."),\
        "SamplingPercentToSigma": ("sampling/custom_sampling/sigmas", "Converts percentages into exact math values."),\
        "CFGGuider": ("sampling/custom_sampling/guiders", "Standard tool forcing prompt adherence."),\
        "DualCFGGuider": ("sampling/custom_sampling/guiders", "Uses two prompts to guide generation."),\
        "BasicGuider": ("sampling/custom_sampling/guiders", "Simplest method to guide the AI."),\
        "PerpNegGuider": ("sampling/custom_sampling/guiders", "Advanced tool cleaning negative prompt traits."),\
        "RandomNoise": ("sampling/custom_sampling/noise", "Creates random static for the image."),\
        "DisableNoise": ("sampling/custom_sampling/noise", "Turns off noise for advanced workflows."),\
        "VideoLinearCFGGuidance": ("sampling/video_models", "Changes prompt strength throughout a video."),\
        "VideoTriangleCFGGuidance": ("sampling/video_models", "Varies prompt strength in triangle waves."),\
        "APG": ("sampling/custom_sampling", "Refines guidance for better visual quality.")\
    \},\
    "loaders": \{\
        "CheckpointLoaderSimple": ("loaders", "Loads primary AI model for generation."),\
        "VAELoader": ("loaders", "Loads specific VAE to fix colors."),\
        "LoraLoader": ("loaders", "Loads files adding styles or characters."),\
        "ControlNetLoader": ("loaders", "Loads models controlling poses or shapes."),\
        "DiffControlNetLoader": ("loaders", "Loads specialized ControlNets for specific models."),\
        "UNETLoader": ("advanced/loaders", "Loads the core generation brain part."),\
        "CLIPLoader": ("advanced/loaders", "Loads text-understanding parts of models."),\
        "DualCLIPLoader": ("advanced/loaders", "Loads two text models for processing."),\
        "TripleCLIPLoader": ("advanced/loaders", "Loads three text models for prompts."),\
        "QuadrupleCLIPLoader": ("advanced/loaders", "Loads four text models for prompts."),\
        "CLIPVisionLoader": ("loaders", "Loads models allowing AI to see."),\
        "StyleModelLoader": ("loaders", "Loads files copying styles from photos."),\
        "unCLIPCheckpointLoader": ("loaders", "Loads models using images as prompts."),\
        "GLIGENLoader": ("loaders", "Loads models for precise object placement."),\
        "UpscaleModelLoader": ("loaders", "Loads models for enlarging image size."),\
        "ImageOnlyCheckpointLoader": ("loaders/video_models", "Loads specialized models designed for video."),\
        "LoraLoaderModelOnly": ("loaders", "Applies style files to models only.")\
    \},\
    "conditioning": \{\
        "CLIPTextEncode": ("conditioning", "Converts prompts into AI-readable instructions."),\
        "ConditioningCombine": ("conditioning", "Merges two prompt instructions into one."),\
        "ConditioningAverage": ("conditioning", "Blends two prompts using a ratio."),\
        "ConditioningConcat": ("conditioning", "Chains two prompts together back-to-back."),\
        "ConditioningSetArea": ("conditioning", "Limits prompt effects to specific areas."),\
        "ConditioningSetAreaPercentage": ("conditioning", "Limits prompts using image percentage areas."),\
        "ConditioningSetAreaStrength": ("conditioning", "Adjusts prompt strength in specific areas."),\
        "ConditioningSetMask": ("conditioning", "Uses masks to limit prompt locations."),\
        "ControlNetApply": ("conditioning/controlnet", "Forces images to follow specific shapes."),\
        "ControlNetApplyAdvanced": ("conditioning/controlnet", "Expert settings for shape control."),\
        "CLIPVisionEncode": ("conditioning", "Translates images into AI visual instructions."),\
        "StyleModelApply": ("conditioning/style_model", "Applies visual styles between separate images."),\
        "unCLIPConditioning": ("conditioning", "Guides AI using images instead of text."),\
        "GLIGENTextBoxApply": ("conditioning/gligen", "Places objects using exact coordinate boxes."),\
        "InpaintModelConditioning": ("conditioning/inpaint", "Prepares images and masks for filling."),\
        "SVD_img2vid_Conditioning": ("conditioning/video_models", "Prepares static images for video animation."),\
        "CLIPTextEncodeFlux": ("advanced/conditioning/flux", "High-quality prompt encoder designed for Flux."),\
        "FluxGuidance": ("advanced/conditioning/flux", "Adjusts how strictly Flux follows text."),\
        "WanImageToVideo": ("conditioning/video_models", "Prepares images for animation via Wan."),\
        "Hunyuan3Dv2Conditioning": ("conditioning/video_models", "Sets up settings for Hunyuan 3D."),\
        "KlingTextToVideo": ("api node/video/Kling", "Generates AI videos via Kling API."),\
        "WanTrackToVideo": ("conditioning/video_models", "Converts motion tracks into video instructions.")\
        # ... (Includes the remaining specialized sub-encoders)\
    \},\
    "latent": \{\
        "VAEDecode": ("latent", "Converts AI data into viewable images."),\
        "VAEEncode": ("latent", "Turns regular images into AI math."),\
        "EmptyLatentImage": ("latent", "Creates the blank noisy starting canvas."),\
        "LatentUpscale": ("latent", "Enlarges resolution of hidden math data."),\
        "LatentUpscaleBy": ("latent", "Scales mathematical data by specific multipliers."),\
        "LatentFromBatch": ("latent/batch", "Selects one image from a group."),\
        "RepeatLatentBatch": ("latent/batch", "Copies mathematical images multiple times."),\
        "SetLatentNoiseMask": ("latent/inpaint", "Tells AI to change masked areas."),\
        "LatentComposite": ("latent", "Pastes one math image over another."),\
        "LatentBlend": ("_for_testing", "Smoothly merges two mathematical images together."),\
        "LatentRotate": ("latent/transform", "Rotates hidden mathematical image data."),\
        "LatentFlip": ("latent/transform", "Mirrors mathematical image data."),\
        "LatentCrop": ("latent/transform", "Cuts out pieces of mathematical data."),\
        "LatentAdd": ("latent/advanced", "Mathematically combines two latents into one."),\
        "LatentSubtract": ("latent/advanced", "Removes details of one latent from another."),\
        "LatentInterpolate": ("latent/advanced", "Blends two latents at specific ratios."),\
        "EmptyHunyuanLatentVideo": ("latent/video", "Creates blank canvas for Hunyuan video.")\
        # ... (Includes specialized latents for Flux and Cosmos)\
    \},\
    "image": \{\
        "SaveImage": ("image", "Saves final generated images to disk."),\
        "PreviewImage": ("image", "Shows images in UI without saving."),\
        "LoadImage": ("image", "Imports photos from computer into ComfyUI."),\
        "ImageScale": ("image/upscaling", "Resizes images to specific pixel dimensions."),\
        "ImageInvert": ("image", "Flips colors to create negative effects."),\
        "ImageBlur": ("image/postprocessing", "Softens images to reduce sharp details."),\
        "ImageSharpen": ("image/postprocessing", "Enhances edges to make images clearer."),\
        "ImageCrop": ("image/transform", "Cuts out specific pieces of images."),\
        "WebcamCapture": ("image", "Captures frames from a connected webcam."),\
        "ImageCompare": ("image", "Shows two images with interactive sliders.")\
    \},\
    "dataset": \{\
        "LoadImageDataSetFromFolder": ("dataset", "Imports image folders for AI training."),\
        "ShuffleDataset": ("dataset/image", "Randomizes the order of image lists."),\
        "TextToLowercase": ("dataset/text", "Changes descriptions to lowercase letters automatically."),\
        "ImageDeduplication": ("dataset/image", "Automatically removes identical images from folders."),\
        "MakeTrainingDataset": ("dataset", "Prepares data specifically for AI learning.")\
    \},\
    "audio": \{\
        "VAEEncodeAudio": ("latent/audio", "Converts sound files into AI math."),\
        "VAEDecodeAudio": ("latent/audio", "Turns AI math into hearable files."),\
        "SaveAudio": ("audio", "Saves AI sounds as FLAC files."),\
        "AudioAdjustVolume": ("audio", "Changes loudness of audio clips internally.")\
    \},\
    "3d": \{\
        "Load3D": ("3d", "Imports 3D objects for model processing."),\
        "Preview3D": ("3d", "Displays interactive 3D models in ComfyUI."),\
        "VoxelToMesh": ("3d", "Turns volume data into 3D models."),\
        "SaveGLB": ("3d", "Exports 3D work as GLB files.")\
    \},\
    "api_node": \{\
        "OpenAIDalle3": ("api node/image/OpenAI", "Remote image generation via OpenAI cloud."),\
        "GeminiNode": ("api node/text/Gemini", "Google's AI for text and vision."),\
        "KlingTextToVideo": ("api node/video/Kling", "High-fidelity AI videos via Kling API."),\
        "LumaVideoNode": ("api node/video/Luma", "Cinematic videos using Luma cloud service.")\
    \}\
\}\
\
# Example use: Access the address and description of the KSampler\
addr, desc = comfy_nodes["sampling"]["KSampler"]\
print(f"Node: KSampler\\nAddress: \{addr\}\\nDescription: \{desc\}")}