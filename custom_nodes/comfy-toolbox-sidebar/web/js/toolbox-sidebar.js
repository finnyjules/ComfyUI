/**
 * Nodes Panel Extension
 * A redesigned nodes panel with 3 tabs: Essentials, All Nodes, Custom
 */

import { app } from "/scripts/app.js";

// ============================================================================
// CONFIGURATION
// ============================================================================

// Category structure for All Nodes tab (matching user's design)
const ALL_NODES_CATEGORIES = [
    {
        name: 'Favorites',
        id: 'favorites',
        isSpecial: true
    },
    {
        name: 'Basics',
        id: 'basics',
        subcategories: [
            { name: 'Utilities', id: 'utils', patterns: ['utils', 'utilities'] }
        ]
    },
    {
        name: 'Model Loading',
        id: 'model_loading',
        subcategories: [
            { name: 'Loaders', id: 'loaders', patterns: ['loaders', 'loader'] },
            { name: 'Model Patches', id: 'model_patches', patterns: ['model_patches', 'model_patch', 'advanced/model'] }
        ]
    },
    {
        name: 'Generation Setup',
        id: 'generation_setup',
        subcategories: [
            { name: 'Conditioning', id: 'conditioning', patterns: ['conditioning'] },
            { name: 'Latent', id: 'latent', patterns: ['latent'] },
            { name: 'Sampling', id: 'sampling', patterns: ['sampling'] }
        ]
    },
    {
        name: 'Image Processing',
        id: 'image_processing',
        subcategories: [
            { name: 'Image', id: 'image', patterns: ['image'] },
            { name: 'Mask', id: 'mask', patterns: ['mask'] },
            { name: 'Transform', id: 'transform', patterns: ['transform'] },
            { name: 'Inpaint', id: 'inpaint', patterns: ['inpaint'] }
        ]
    },
    {
        name: 'Animation & Video',
        id: 'animation_video',
        subcategories: [
            { name: 'Video Helper Suite', id: 'video_helper', patterns: ['video_helper', 'videohelpersuite'] },
            { name: 'ComfyUI-Frame-Interpolation', id: 'frame_interpolation', patterns: ['frame-interpolation', 'interpolation'] },
            { name: 'Animate Diff', id: 'animate_diff', patterns: ['animatediff', 'animate_diff'] },
            { name: 'WanVideoWrapper', id: 'wan_video', patterns: ['wanvideowrapper', 'wan_video'] },
            { name: 'WanAnimatePreprocess', id: 'wan_animate', patterns: ['wananimatepreprocess'] },
            { name: 'FL Path Animator', id: 'fl_path', patterns: ['fl_path', 'flpathanimator'] }
        ]
    },
    {
        name: 'AI Models & Controls',
        id: 'ai_models',
        subcategories: [
            { name: 'ControlNet Preprocessors', id: 'controlnet_prep', patterns: ['controlnet', 'preprocessor'] },
            { name: 'ControlAltAI Nodes', id: 'controlaltai', patterns: ['controlaltai'] },
            { name: 'Adv-ControlNet', id: 'adv_controlnet', patterns: ['adv-controlnet', 'advcontrolnet'] },
            { name: 'SAM2', id: 'sam2', patterns: ['sam2', 'segment_anything'] },
            { name: 'DepthAnythingV2', id: 'depth_anything', patterns: ['depthanything', 'depth_anything'] },
            { name: 'Florence2', id: 'florence2', patterns: ['florence2', 'florence'] }
        ]
    },
    {
        name: 'Upscaling & Enhancement',
        id: 'upscaling',
        subcategories: [
            { name: 'SUPIR', id: 'supir', patterns: ['supir'] },
            { name: 'RES4LYF', id: 'res4lyf', patterns: ['res4lyf'] },
            { name: 'ImpactPack', id: 'impact', patterns: ['impactpack', 'impact'] }
        ]
    },
    {
        name: 'Utilities',
        id: 'utilities_main',
        subcategories: [
            { name: 'Utils', id: 'utils_main', patterns: ['utils'] },
            { name: 'Math', id: 'math', patterns: ['math'] },
            { name: 'Logic', id: 'logic', patterns: ['logic'] },
            { name: 'Camera', id: 'camera', patterns: ['camera'] },
            { name: 'Context', id: 'context', patterns: ['context'] },
            { name: 'IPAdapter', id: 'ipadapter', patterns: ['ipadapter', 'ip_adapter'] }
        ]
    },
    {
        name: 'Specialized Workflows',
        id: 'specialized',
        subcategories: [
            { name: 'LivePortrait', id: 'liveportrait', patterns: ['liveportrait'] },
            { name: 'Lum3on', id: 'lum3on', patterns: ['lum3on'] },
            { name: 'NormalCrafter', id: 'normalcrafter', patterns: ['normalcrafter'] }
        ]
    },
    {
        name: 'Development',
        id: 'development',
        subcategories: [
            { name: '_for_testing', id: 'for_testing', patterns: ['_for_testing', 'testing'] },
            { name: 'Training', id: 'training', patterns: ['training'] },
            { name: 'Dataset', id: 'dataset', patterns: ['dataset'] },
            { name: 'API Node', id: 'api_node', patterns: ['api_node', 'api node'] },
            { name: 'API', id: 'api', patterns: ['api'] }
        ]
    },
    {
        name: 'Misc',
        id: 'misc',
        subcategories: [
            { name: 'SD', id: 'sd', patterns: ['sd'] },
            { name: '3D', id: '3d', patterns: ['3d'] },
            { name: 'Audio', id: 'audio', patterns: ['audio'] },
            { name: 'Advanced', id: 'advanced', patterns: ['advanced'] }
        ]
    }
];

// Essentials tab configuration - curated nodes with sections
const ESSENTIALS_CONFIG = {
    sections: [
        {
            id: 'my_subgraphs',
            name: 'My Subgraphs',
            collapsed: true,
            type: 'subgraphs'
        },
        {
            id: 'favorites',
            name: 'Favorites',
            collapsed: true,
            type: 'favorites'
        },
        {
            id: 'basic_operations',
            name: 'Basic Operations',
            collapsed: false,
            nodes: [
                { type: 'LoadImage', displayName: 'Load Image', icon: '🖼️' },
                { type: 'SaveImage', displayName: 'Save Image', icon: '💾' },
                { type: 'LoadVideo', displayName: 'Load Video', icon: '🎬' },
                { type: 'SaveVideo', displayName: 'Save Video', icon: '💾' },
                { type: 'Load3DModel', displayName: 'Load 3D Model', icon: '📦' },
                { type: 'Save3DModel', displayName: 'Save 3D Model', icon: '💾' },
                { type: 'LoadText', displayName: 'Load Text', icon: '📄' },
                { type: 'SaveText', displayName: 'Save Text', icon: '💾' }
            ]
        },
        {
            id: 'image_tools',
            name: 'Image Tools',
            collapsed: false,
            nodes: [
                { type: 'CropImage', displayName: 'Crop', icon: '✂️' },
                { type: 'ResizeImage', displayName: 'Resize', icon: '📐' },
                { type: 'RotateImage', displayName: 'Rotate', icon: '🔄' },
                { type: 'BlurImage', displayName: 'Blur', icon: '🌫️' },
                { type: 'InvertImage', displayName: 'Invert', icon: '🔃' },
                { type: 'ImageCompositor', displayName: 'Image Compositor', icon: '🎨' },
                { type: 'TextIterator', displayName: 'Text Iterator', icon: '📝' },
                { type: 'ImageIterator', displayName: 'Image Iterator', icon: '🔁' },
                { type: 'BatchImage', displayName: 'Batch Image', icon: '📚' },
                { type: 'ImageCompare', displayName: 'Image Compare', icon: '🔍' },
                { type: 'ImageShaders', displayName: 'Shaders', icon: '✨' },
                { type: 'ImagePainter', displayName: 'Painter', icon: '🖌️' },
                { type: 'SelectObject', displayName: 'Select Object', icon: '👆' },
                { type: 'RemoveBackground', displayName: 'Remove Background', icon: '🧹' },
                { type: 'CannyEdge', displayName: 'Canny', icon: '📊' },
                { type: 'DepthMap', displayName: 'Depth', icon: '🗺️' },
                { type: 'PoseDetection', displayName: 'Pose', icon: '🤸' },
                { type: 'NormalMap', displayName: 'Normal Map', icon: '🗺️' },
                { type: 'ColorAdjust', displayName: 'Color Adjust', icon: '🎨' }
            ]
        },
        {
            id: 'video_tools',
            name: 'Video Tools',
            collapsed: false,
            nodes: [
                { type: 'ExtractFrame', displayName: 'Extract Frame', icon: '🎞️' },
                { type: 'TrimVideo', displayName: 'Trim', icon: '✂️' },
                { type: 'CropVideo', displayName: 'Crop', icon: '✂️' },
                { type: 'ResizeVideo', displayName: 'Resize', icon: '📐' },
                { type: 'RotateVideo', displayName: 'Rotate', icon: '🔄' },
                { type: 'VideoCompositor', displayName: 'Video Compositor', icon: '🎬' },
                { type: 'VideoShaders', displayName: 'Video Shaders', icon: '✨' },
                { type: 'VideoCanny', displayName: 'Canny', icon: '📊' },
                { type: 'VideoDepth', displayName: 'Depth', icon: '🗺️' },
                { type: 'VideoPose', displayName: 'Pose', icon: '🤸' },
                { type: 'VideoNormalMap', displayName: 'Normal Map', icon: '🗺️' },
                { type: 'VideoCompare', displayName: 'Video Compare', icon: '🔍' },
                { type: 'StitchVideos', displayName: 'Stitch Videos', icon: '🧵' }
            ]
        },
        {
            id: 'image_generation',
            name: 'Image Generation and Editing',
            collapsed: false,
            nodes: [
                { type: 'TextToImage', displayName: 'Text to Image', icon: '🖼️' },
                { type: 'ImageToImage', displayName: 'Image to Image', icon: '🔄' },
                { type: 'PoseToImage', displayName: 'Pose to Image', icon: '🤸' },
                { type: 'CannyToImage', displayName: 'Canny to Image', icon: '📊' },
                { type: 'DepthToImage', displayName: 'Depth to Image', icon: '🗺️' },
                { type: 'EditImage', displayName: 'Edit Image', icon: '✏️' },
                { type: 'InpaintImage', displayName: 'Inpaint Image', icon: '🖌️' },
                { type: 'OutpaintImage', displayName: 'Outpaint Image', icon: '🖼️' },
                { type: 'LoadLora', displayName: 'Load Style (LoRA)', icon: '🎨' },
                { type: 'ImageToLayers', displayName: 'Image to Layers', icon: '📚' },
                { type: 'LayersToImage', displayName: 'Layers to Image', icon: '🖼️' },
                { type: 'Vectorize', displayName: 'Vectorize', icon: '📐' },
                { type: 'EnhanceImage', displayName: 'Enhance', icon: '✨' }
            ]
        },
        {
            id: 'video_generation',
            name: 'Video Generation and Editing',
            collapsed: false,
            nodes: [
                { type: 'TextToVideo', displayName: 'Text to Video', icon: '🎬' },
                { type: 'ImageToVideo', displayName: 'Image to Video', icon: '🎥' },
                { type: 'Lipsync', displayName: 'Lipsync', icon: '👄' },
                { type: 'PoseToVideo', displayName: 'Pose to Video', icon: '🤸' },
                { type: 'CannyToVideo', displayName: 'Canny to Video', icon: '📊' },
                { type: 'DepthToVideo', displayName: 'Depth to Video', icon: '🗺️' },
                { type: 'EditVideo', displayName: 'Edit Video', icon: '✏️' },
                { type: 'InpaintVideo', displayName: 'Inpaint Video', icon: '🖌️' },
                { type: 'EnhanceVideo', displayName: 'Enhance Video', icon: '✨' }
            ]
        },
        {
            id: 'text_generation',
            name: 'Text Generation',
            collapsed: false,
            nodes: [
                { type: 'LLMOperations', displayName: 'LLM Operations', icon: '🤖' },
                { type: 'PromptEnhance', displayName: 'Prompt Enhance', icon: '✨' },
                { type: 'ImageCaptioning', displayName: 'Image Captioning', icon: '📝' },
                { type: 'VideoCaptioning', displayName: 'Video Captioning', icon: '📝' }
            ]
        },
        {
            id: '3d',
            name: '3D',
            collapsed: false,
            nodes: [
                { type: 'TextTo3D', displayName: 'Text to 3D Model', icon: '📦' },
                { type: 'ImageTo3D', displayName: 'Image to 3D Model', icon: '📦' },
                { type: 'Enhance3D', displayName: 'Enhance 3D Model', icon: '✨' },
                { type: 'Hunyuan3DUV', displayName: 'Hunyuan 3D UV Unwrapping', icon: '🗺️' },
                { type: 'PartDeposition', displayName: 'Part Deposition', icon: '🔧' }
            ]
        },
        {
            id: 'audio',
            name: 'Audio',
            collapsed: false,
            nodes: [
                { type: 'MusicGeneration', displayName: 'Music Generation', icon: '🎵' },
                { type: 'TextToSpeech', displayName: 'Text to Speech', icon: '🗣️' },
                { type: 'VoiceClone', displayName: 'Voice Clone', icon: '🎤' }
            ]
        }
    ]
};

// Storage keys for persistence
const STORAGE_KEYS = {
    EXPANDED_SECTIONS: 'comfy_nodes_panel_expanded',
    FAVORITES: 'comfy_nodes_panel_favorites',
    LAST_TAB: 'comfy_nodes_panel_last_tab'
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

class PanelState {
    constructor() {
        this.activeTab = 'essentials';
        this.searchQuery = '';
        this.expandedSections = new Set();
        this.favorites = new Set();
        this.nodeDefinitions = {};
        this.customNodePacks = {};
        this.listeners = [];

        this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const expanded = localStorage.getItem(STORAGE_KEYS.EXPANDED_SECTIONS);
            if (expanded) {
                this.expandedSections = new Set(JSON.parse(expanded));
            }

            const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
            if (favorites) {
                this.favorites = new Set(JSON.parse(favorites));
            }

            const lastTab = localStorage.getItem(STORAGE_KEYS.LAST_TAB);
            if (lastTab) {
                this.activeTab = lastTab;
            }
        } catch (e) {
            console.warn('[NodesPanel] Failed to load state from storage:', e);
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(STORAGE_KEYS.EXPANDED_SECTIONS, JSON.stringify([...this.expandedSections]));
            localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([...this.favorites]));
            localStorage.setItem(STORAGE_KEYS.LAST_TAB, this.activeTab);
        } catch (e) {
            console.warn('[NodesPanel] Failed to save state to storage:', e);
        }
    }

    setActiveTab(tab) {
        this.activeTab = tab;
        this.saveToStorage();
        this.notify();
    }

    setSearchQuery(query) {
        this.searchQuery = query;
        this.notify();
    }

    toggleSection(sectionId) {
        if (this.expandedSections.has(sectionId)) {
            this.expandedSections.delete(sectionId);
        } else {
            this.expandedSections.add(sectionId);
        }
        this.saveToStorage();
        this.notify();
    }

    isSectionExpanded(sectionId) {
        return this.expandedSections.has(sectionId);
    }

    toggleFavorite(nodeType) {
        if (this.favorites.has(nodeType)) {
            this.favorites.delete(nodeType);
        } else {
            this.favorites.add(nodeType);
        }
        this.saveToStorage();
        this.notify();
    }

    isFavorite(nodeType) {
        return this.favorites.has(nodeType);
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener());
    }
}

// Global state instance
let panelState = null;

// ============================================================================
// DATA LOADING
// ============================================================================

async function loadNodeDefinitions() {
    try {
        const response = await fetch('/object_info');
        const data = await response.json();

        // Also load descriptions and paths from nodelist.json
        try {
            const descResponse = await fetch('/assets/nodelist.json');
            const descData = await descResponse.json();

            // Create lookup maps for descriptions, paths, and mainCategory
            const nodeDataMap = {};
            if (descData.nodes) {
                for (const node of descData.nodes) {
                    if (node.name) {
                        const nodeInfo = {
                            description: node.description || '',
                            path: node.path || node.category || '',
                            mainCategory: node.mainCategory || 'Other'
                        };
                        // Store under original name
                        nodeDataMap[node.name] = nodeInfo;
                        // Also store without + suffix for matching
                        if (node.name.endsWith('+')) {
                            nodeDataMap[node.name.slice(0, -1)] = nodeInfo;
                        }
                        // Store without emoji prefixes
                        const noEmoji = node.name.replace(/^[^\w]+/, '').trim();
                        if (noEmoji !== node.name) {
                            nodeDataMap[noEmoji] = nodeInfo;
                        }
                    }
                }
            }

            // Merge descriptions and mainCategory into node definitions
            let matchedCount = 0;
            for (const [nodeType, nodeDef] of Object.entries(data)) {
                // Try exact match first
                let nodeData = nodeDataMap[nodeType];

                // Try matching by display_name
                if (!nodeData && nodeDef.display_name) {
                    nodeData = nodeDataMap[nodeDef.display_name];
                }

                // Try with common suffixes/prefixes that packs add
                if (!nodeData) {
                    // Try removing common suffixes like +, (Comfy), etc.
                    const variations = [
                        nodeType + '+',
                        nodeType + ' (Comfy)',
                        '🔧 ' + nodeType,
                    ];
                    for (const v of variations) {
                        if (nodeDataMap[v]) {
                            nodeData = nodeDataMap[v];
                            break;
                        }
                    }
                }

                if (nodeData) {
                    matchedCount++;
                    if (nodeData.description && !nodeDef.description) {
                        nodeDef.description = nodeData.description;
                    }
                    // Store mainCategory from nodelist.json
                    if (nodeData.mainCategory) {
                        nodeDef.mainCategory = nodeData.mainCategory;
                    }
                    // Keep original API category for subfolder structure
                }
            }

            console.log(`[NodesPanel] Loaded ${Object.keys(nodeDataMap).length} node entries from nodelist.json`);
            console.log(`[NodesPanel] Matched ${matchedCount} nodes with mainCategory`);

            // Debug: count mainCategories assigned
            const mainCatCounts = {};
            for (const [nodeType, nodeDef] of Object.entries(data)) {
                const mc = nodeDef.mainCategory || 'Other';
                mainCatCounts[mc] = (mainCatCounts[mc] || 0) + 1;
            }
            console.log('[NodesPanel] MainCategory distribution:', mainCatCounts);
        } catch (descError) {
            console.warn('[NodesPanel] Could not load node descriptions:', descError);
        }

        return data;
    } catch (e) {
        console.error('[NodesPanel] Failed to load node definitions:', e);
        return {};
    }
}

function toTitleCase(str) {
    return str
        .split(/[\s_-]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function categorizeNodes(nodeDefinitions) {
    const categorized = {
        core: [],
        extras: [],
        api: [],
        custom: {}
    };

    for (const [nodeType, nodeDef] of Object.entries(nodeDefinitions)) {
        const pythonModule = nodeDef.python_module || 'nodes';
        const category = nodeDef.category || 'misc';

        const nodeInfo = {
            type: nodeType,
            displayName: nodeDef.display_name || nodeType,
            category: category,
            description: nodeDef.description || '',
            pythonModule: pythonModule,
            mainCategory: nodeDef.mainCategory || 'Other'
        };

        if (pythonModule === 'nodes') {
            categorized.core.push(nodeInfo);
        } else if (pythonModule.startsWith('comfy_extras.')) {
            categorized.extras.push(nodeInfo);
        } else if (pythonModule.startsWith('comfy_api_nodes.')) {
            categorized.api.push(nodeInfo);
        } else if (pythonModule.startsWith('custom_nodes.')) {
            // Extract pack name from python_module
            const match = pythonModule.match(/^custom_nodes\.([^.]+)/);
            const packName = match ? match[1] : 'Unknown';

            if (!categorized.custom[packName]) {
                categorized.custom[packName] = [];
            }
            categorized.custom[packName].push(nodeInfo);
        } else {
            categorized.core.push(nodeInfo);
        }
    }

    return categorized;
}

function matchNodeToCategory(node, patterns) {
    const category = (node.category || '').toLowerCase();
    const pythonModule = (node.pythonModule || '').toLowerCase();
    const nodeType = (node.type || '').toLowerCase();

    for (const pattern of patterns) {
        const p = pattern.toLowerCase();
        if (category.includes(p) || pythonModule.includes(p) || nodeType.includes(p)) {
            return true;
        }
    }
    return false;
}

// ============================================================================
// UI COMPONENTS
// ============================================================================

function createPanel() {
    const panel = document.createElement('div');
    panel.id = 'nodes-panel';
    panel.className = 'nodes-panel';

    // Inject styles
    injectStyles();

    // Create structure
    panel.innerHTML = `
        <div class="nodes-panel-header">
            <h2 class="nodes-panel-title">Nodes</h2>
        </div>
        <div class="nodes-panel-search">
            <input type="text" class="nodes-panel-search-input" placeholder="Search...">
        </div>
        <div class="nodes-panel-tabs">
            <button class="nodes-panel-tab" data-tab="essentials">Essentials</button>
            <button class="nodes-panel-tab" data-tab="all_nodes">All nodes</button>
            <button class="nodes-panel-tab custom-tab" data-tab="custom">Custom</button>
        </div>
        <div class="nodes-panel-content">
            <div class="nodes-panel-tab-content" data-tab="essentials"></div>
            <div class="nodes-panel-tab-content" data-tab="all_nodes"></div>
            <div class="nodes-panel-tab-content" data-tab="custom"></div>
        </div>
    `;

    return panel;
}

function injectStyles() {
    if (document.getElementById('nodes-panel-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'nodes-panel-styles';
    styles.textContent = `
        /* ============================================
           PANEL CONTAINER
           ============================================ */
        .nodes-panel {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--comfy-menu-bg);
            display: none;
            flex-direction: column;
            font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-sizing: border-box;
            z-index: 10;
        }

        .nodes-panel.open {
            display: flex;
        }

        /* Hide Vue's content when our panel is open */
        .side-bar-panel:has(.nodes-panel.open) > *:not(.nodes-panel) {
            display: none !important;
        }

        /* Hide Vue's Node Library content IMMEDIATELY when we're about to show our panel */
        body.nodes-panel-opening .side-bar-panel > *:not(.nodes-panel) {
            display: none !important;
        }

        .nodes-panel * {
            box-sizing: border-box;
        }

        /* ============================================
           HEADER
           ============================================ */
        .nodes-panel-header {
            padding: 16px 20px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-shrink: 0;
        }

        .nodes-panel-title {
            margin: 0;
            color: #fafafa;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: -0.01em;
        }

        /* ============================================
           SEARCH BAR
           ============================================ */
        .nodes-panel-search {
            padding: 0 16px 12px;
            flex-shrink: 0;
        }

        .nodes-panel-search-input {
            width: 100%;
            padding: 9px 12px 9px 36px;
            background: #27272a;
            border: 1px solid #3f3f46;
            border-radius: 8px;
            color: #fafafa;
            font-size: 13px;
            outline: none;
            transition: border-color 0.15s, box-shadow 0.15s;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: 12px center;
        }

        .nodes-panel-search-input:focus {
            border-color: #52525b;
            box-shadow: 0 0 0 2px rgba(82, 82, 91, 0.3);
        }

        .nodes-panel-search-input::placeholder {
            color: #71717a;
        }

        /* ============================================
           TAB BAR
           ============================================ */
        .nodes-panel-tabs {
            display: flex;
            padding: 8px 12px;
            gap: 0;
            flex-shrink: 0;
            background: transparent;
        }

        .nodes-panel-tab {
            flex: 1;
            padding: 8px 16px;
            background: transparent;
            border: none;
            color: #71717a;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.15s;
            border-radius: 8px;
            position: relative;
        }

        .nodes-panel-tab:hover {
            color: #a1a1aa;
        }

        .nodes-panel-tab.active {
            color: #fafafa;
            background: #27272a;
        }

        /* ============================================
           CONTENT AREA
           ============================================ */
        .nodes-panel-content {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .nodes-panel-content::-webkit-scrollbar {
            width: 8px;
        }

        .nodes-panel-content::-webkit-scrollbar-track {
            background: transparent;
        }

        .nodes-panel-content::-webkit-scrollbar-thumb {
            background: #3f3f46;
            border-radius: 4px;
        }

        .nodes-panel-content::-webkit-scrollbar-thumb:hover {
            background: #52525b;
        }

        .nodes-panel-tab-content {
            display: none;
            padding: 12px 0;
        }

        .nodes-panel-tab-content.active {
            display: block;
        }

        /* ============================================
           ESSENTIALS TAB - SECTIONS
           ============================================ */
        .nodes-section {
            margin-bottom: 8px;
        }

        .nodes-section-header {
            display: flex;
            align-items: center;
            padding: 10px 20px;
            cursor: pointer;
            user-select: none;
            color: #fafafa;
            font-size: 13px;
            font-weight: 500;
            transition: background 0.1s;
        }

        .nodes-section-header:hover {
            background: rgba(255, 255, 255, 0.04);
        }

        .nodes-section-chevron {
            width: 16px;
            height: 16px;
            margin-left: auto;
            transition: transform 0.2s;
            color: #71717a;
            flex-shrink: 0;
            transform: rotate(180deg);
        }

        .nodes-section-header.collapsed .nodes-section-chevron {
            transform: rotate(0deg);
        }

        .nodes-section-content {
            display: block;
        }

        .nodes-section-header.collapsed + .nodes-section-content {
            display: none;
        }

        /* ============================================
           ESSENTIALS TAB - CARD GRID
           ============================================ */
        .nodes-card-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            padding: 8px 16px 16px;
        }

        .nodes-card {
            background: #27272a;
            border: 1px solid #3f3f46;
            border-radius: 10px;
            padding: 16px 8px 12px;
            text-align: center;
            cursor: grab;
            transition: all 0.15s ease;
            user-select: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 80px;
        }

        .nodes-card:hover {
            background: #3f3f46;
            border-color: #52525b;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .nodes-card:active {
            cursor: grabbing;
            transform: translateY(0);
        }

        .nodes-card-icon {
            font-size: 28px;
            margin-bottom: 8px;
            line-height: 1;
        }

        .nodes-card-label {
            color: #e4e4e7;
            font-size: 11px;
            font-weight: 500;
            line-height: 1.3;
            word-break: break-word;
            max-width: 100%;
        }

        /* ============================================
           ALL NODES TAB - CATEGORY HEADERS
           ============================================ */
        .nodes-category-header {
            font-size: 11px;
            font-weight: 600;
            color: #52525b;
            text-transform: uppercase;
            padding: 20px 20px 8px;
            letter-spacing: 0.05em;
        }

        .nodes-category-header:first-child {
            padding-top: 8px;
        }

        /* ============================================
           ALL NODES TAB - EXPANDABLE CATEGORIES
           ============================================ */
        .nodes-category-item {
            display: flex;
            align-items: center;
            padding: 8px 20px;
            cursor: pointer;
            color: #e4e4e7;
            font-size: 13px;
            font-weight: 400;
            transition: background 0.1s;
        }

        .nodes-category-item:hover {
            background: rgba(255, 255, 255, 0.04);
        }

        .nodes-category-icon {
            width: 18px;
            height: 18px;
            margin-right: 10px;
            color: #71717a;
            flex-shrink: 0;
        }

        .nodes-category-chevron {
            width: 16px;
            height: 16px;
            margin-left: 8px;
            color: #52525b;
            transition: transform 0.2s;
            flex-shrink: 0;
        }

        .nodes-category-count {
            margin-left: auto;
            color: #52525b;
            font-size: 11px;
            font-weight: 500;
        }

        .nodes-category-item.collapsed .nodes-category-chevron {
            transform: rotate(-90deg);
        }

        .nodes-subfolder {
            font-size: 12px;
            padding-top: 6px;
            padding-bottom: 6px;
        }

        .nodes-subfolder .nodes-category-icon {
            width: 14px;
            height: 14px;
            margin-right: 8px;
        }

        /* ============================================
           ALL NODES / CUSTOM TAB - NODE LIST ITEMS
           ============================================ */
        .nodes-list-item {
            display: flex;
            align-items: center;
            padding: 7px 20px 7px 48px;
            cursor: pointer;
            color: #a1a1aa;
            font-size: 13px;
            transition: all 0.1s;
        }

        .nodes-list-item:hover {
            background: rgba(255, 255, 255, 0.04);
            color: #fafafa;
        }

        .nodes-list-item-icon {
            width: 6px;
            height: 6px;
            margin-right: 12px;
            background: #52525b;
            border-radius: 50%;
            flex-shrink: 0;
        }

        .nodes-list-item:hover .nodes-list-item-icon {
            background: #71717a;
        }

        .nodes-list-item-name {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .nodes-list-item-badge {
            font-size: 10px;
            padding: 2px 8px;
            border-radius: 4px;
            margin-left: 10px;
            background: #854d0e;
            color: #fef3c7;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            flex-shrink: 0;
        }

        .nodes-list-item-badge.beta {
            background: #1e3a5f;
            color: #93c5fd;
        }

        /* ============================================
           CUSTOM TAB - MANAGER BUTTON
           ============================================ */
        .nodes-manager-button {
            margin: 16px;
            padding: 12px 16px;
            background: #27272a;
            border: 1px solid #3f3f46;
            border-radius: 8px;
            color: #fafafa;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.15s;
        }

        .nodes-manager-button:hover {
            background: #3f3f46;
            border-color: #52525b;
        }

        .nodes-manager-button svg {
            width: 18px;
            height: 18px;
            color: #a1a1aa;
        }

        /* ============================================
           EMPTY STATES
           ============================================ */
        .nodes-empty-state {
            padding: 40px 20px;
            text-align: center;
            color: #71717a;
            font-size: 13px;
            line-height: 1.5;
        }

        .nodes-empty-state-icon {
            font-size: 32px;
            margin-bottom: 12px;
            opacity: 0.5;
        }

        /* ============================================
           CONTEXT MENU
           ============================================ */
        .nodes-context-menu {
            position: fixed;
            background: #27272a;
            border: 1px solid #3f3f46;
            border-radius: 8px;
            padding: 4px;
            z-index: 10000;
            min-width: 160px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        .nodes-context-menu-item {
            padding: 10px 14px;
            color: #e4e4e7;
            font-size: 13px;
            cursor: pointer;
            border-radius: 4px;
            transition: background 0.1s;
        }

        .nodes-context-menu-item:hover {
            background: rgba(255, 255, 255, 0.08);
        }

        /* ============================================
           DRAG FEEDBACK
           ============================================ */
        .nodes-card.dragging,
        .nodes-list-item.dragging {
            opacity: 0.5;
        }

        /* ============================================
           NODE PREVIEW PANEL
           ============================================ */
        .nodes-preview-panel {
            position: fixed;
            width: 300px;
            background: #1e1e1e;
            border: 1px solid #2a2a2a;
            border-radius: 8px;
            padding: 16px;
            overflow-y: auto;
            max-height: 500px;
            display: none;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            z-index: 10001;
            scrollbar-width: thin;
            scrollbar-color: #444 transparent;
            pointer-events: none;
        }

        .nodes-preview-panel::-webkit-scrollbar {
            width: 6px;
        }

        .nodes-preview-panel::-webkit-scrollbar-track {
            background: transparent;
        }

        .nodes-preview-panel::-webkit-scrollbar-thumb {
            background: #444;
            border-radius: 3px;
        }

        .nodes-preview-svg-container {
            margin-bottom: 16px;
            background: #1a1a1a;
            border-radius: 8px;
            padding: 12px;
        }

        .nodes-preview-title {
            font-size: 16px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 4px;
        }

        .nodes-preview-category {
            font-size: 11px;
            color: #888;
            margin-bottom: 16px;
            font-family: monospace;
        }

        .nodes-preview-description {
            font-size: 13px;
            color: #aaa;
            line-height: 1.5;
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid #2a2a2a;
        }

        .nodes-preview-section-title {
            font-size: 11px;
            font-weight: 600;
            color: #999;
            margin-bottom: 8px;
        }

        .nodes-preview-param-row {
            display: flex;
            justify-content: space-between;
            padding: 4px 0;
        }

        .nodes-preview-param-name {
            color: #e0e0e0;
            font-size: 12px;
        }

        .nodes-preview-param-type {
            font-family: monospace;
            font-size: 11px;
            text-align: right;
            margin-left: 12px;
        }

        .nodes-preview-param-row.optional {
            opacity: 0.6;
        }
    `;
    document.head.appendChild(styles);
}

// SVG Icons
const ICONS = {
    chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
    folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
    node: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle></svg>`,
    settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`
};

// ============================================================================
// NODE PREVIEW PANEL
// ============================================================================

// Global preview panel element
let previewPanel = null;
let previewShowTimeout = null;
let previewHideTimeout = null;

// Get color for a type (for SVG rendering)
function getTypeColor(type) {
    const colors = {
        'MODEL': '#7a7', 'VAE': '#c55', 'CLIP': '#4c9',
        'IMAGE': '#36a', 'LATENT': '#b5a', 'CONDITIONING': '#fa0',
        'MASK': '#9c6', 'INT': '#69f', 'FLOAT': '#6af',
        'STRING': '#aaa', 'BOOLEAN': '#f96', 'CONTROL_NET': '#6c6'
    };
    if (type?.includes(',')) type = type.split(',')[0].trim();
    return colors[type] || '#666';
}

// Render input slots for SVG node
function renderInputSlots(nodeDef) {
    if (!nodeDef?.input) return '';

    let svg = '';
    let yPos = 45;

    // Required inputs
    Object.entries(nodeDef.input.required || {}).forEach(([name, def]) => {
        const type = Array.isArray(def) ? def[0] : def;
        const displayType = Array.isArray(type) ? 'COMBO' : type;
        svg += `
            <circle cx="8" cy="${yPos}" r="5" fill="${getTypeColor(displayType)}" stroke="#666"/>
            <text x="18" y="${yPos + 4}" fill="#aaa" font-size="11">${name.substring(0, 15)}</text>
        `;
        yPos += 20;
    });

    // Optional inputs (limit to first few)
    const optionalEntries = Object.entries(nodeDef.input.optional || {}).slice(0, 3);
    optionalEntries.forEach(([name, def]) => {
        const type = Array.isArray(def) ? def[0] : def;
        const displayType = Array.isArray(type) ? 'COMBO' : type;
        svg += `
            <circle cx="8" cy="${yPos}" r="5" fill="${getTypeColor(displayType)}" opacity="0.5" stroke="#666"/>
            <text x="18" y="${yPos + 4}" fill="#888" font-size="11">${name.substring(0, 12)}</text>
        `;
        yPos += 20;
    });

    return svg;
}

// Render output slots for SVG node
function renderOutputSlots(nodeDef) {
    if (!nodeDef?.output) return '';

    let svg = '';
    let yPos = 45;

    nodeDef.output.forEach((type, idx) => {
        const label = nodeDef.output_name?.[idx] || `Out ${idx + 1}`;
        svg += `
            <circle cx="260" cy="${yPos}" r="5" fill="${getTypeColor(type)}" stroke="#666"/>
            <text x="248" y="${yPos + 4}" fill="#aaa" font-size="11" text-anchor="end">${label.substring(0, 12)}</text>
        `;
        yPos += 20;
    });

    return svg;
}

// Render SVG representation of a node
function renderNodeSVG(nodeType, nodeDef) {
    if (!nodeDef) return '<svg width="268" height="80"><text x="134" y="40" text-anchor="middle" fill="#666">Preview not available</text></svg>';

    // Calculate height based on inputs/outputs
    const requiredInputs = Object.keys(nodeDef.input?.required || {}).length;
    const optionalInputs = Math.min(Object.keys(nodeDef.input?.optional || {}).length, 3);
    const inputs = requiredInputs + optionalInputs;
    const outputs = (nodeDef.output || []).length;
    const maxSlots = Math.max(inputs, outputs);
    const height = Math.max(80, 55 + maxSlots * 20);

    return `
        <svg width="268" height="${height}">
            <rect width="268" height="${height}" fill="#2a2a2a" stroke="#3a3a3a" stroke-width="2" rx="8"/>
            <rect width="268" height="28" fill="#383838" rx="8"/>
            <text x="134" y="18" text-anchor="middle" fill="#e0e0e0" font-size="12" font-weight="500">
                ${(nodeDef.display_name || nodeType).substring(0, 30)}
            </text>
            ${renderInputSlots(nodeDef)}
            ${renderOutputSlots(nodeDef)}
        </svg>
    `;
}

// Create parameters section for preview panel
function createParametersSection(nodeDef) {
    if (!nodeDef?.input) return '';

    const required = Object.entries(nodeDef.input.required || {});
    const optional = Object.entries(nodeDef.input.optional || {}).slice(0, 5);

    if (required.length === 0 && optional.length === 0) return '';

    let html = '<div style="margin-bottom: 16px;">';
    html += '<div class="nodes-preview-section-title">INPUTS</div>';

    required.forEach(([name, def]) => {
        const type = Array.isArray(def) ? def[0] : def;
        const displayType = Array.isArray(type) ? 'COMBO' : type;
        html += `
            <div class="nodes-preview-param-row">
                <span class="nodes-preview-param-name">${name}</span>
                <span class="nodes-preview-param-type" style="color: ${getTypeColor(displayType)}">${displayType}</span>
            </div>
        `;
    });

    optional.forEach(([name, def]) => {
        const type = Array.isArray(def) ? def[0] : def;
        const displayType = Array.isArray(type) ? 'COMBO' : type;
        html += `
            <div class="nodes-preview-param-row optional">
                <span class="nodes-preview-param-name">${name} <em style="font-size: 10px;">(opt)</em></span>
                <span class="nodes-preview-param-type" style="color: #888">${displayType}</span>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// Create outputs section for preview panel
function createOutputsSection(nodeDef) {
    if (!nodeDef?.output || nodeDef.output.length === 0) return '';

    let html = '<div>';
    html += '<div class="nodes-preview-section-title">OUTPUTS</div>';

    nodeDef.output.forEach((type, idx) => {
        const label = nodeDef.output_name?.[idx] || `Output ${idx + 1}`;
        html += `
            <div class="nodes-preview-param-row">
                <span class="nodes-preview-param-name">${label}</span>
                <span class="nodes-preview-param-type" style="color: ${getTypeColor(type)}">${type}</span>
            </div>
        `;
    });

    html += '</div>';
    return html;
}

// Create preview panel content
function createPreviewContent(nodeType, nodeDef, nodeDescription = '') {
    if (!nodeDef) {
        return `<div style="color: #888; text-align: center; padding: 20px;">Node definition not available</div>`;
    }

    return `
        <div class="nodes-preview-svg-container">
            ${renderNodeSVG(nodeType, nodeDef)}
        </div>
        <div class="nodes-preview-title">${nodeDef.display_name || nodeType}</div>
        <div class="nodes-preview-category">${nodeDef.category || 'misc'}</div>
        ${nodeDescription ? `<div class="nodes-preview-description">${nodeDescription}</div>` : ''}
        ${createParametersSection(nodeDef)}
        ${createOutputsSection(nodeDef)}
    `;
}

// Create or get the preview panel element
function getPreviewPanel() {
    if (!previewPanel) {
        previewPanel = document.createElement('div');
        previewPanel.className = 'nodes-preview-panel';
        document.body.appendChild(previewPanel);
    }
    return previewPanel;
}

// Show node preview
function showNodePreview(nodeType, nodeDefinitions, itemElement) {
    const panel = getPreviewPanel();
    const nodeDef = nodeDefinitions[nodeType];

    if (!nodeDef) {
        panel.style.display = 'none';
        return;
    }

    // Get node description if available
    const nodeDescription = nodeDef.description || '';

    // Update content
    panel.innerHTML = createPreviewContent(nodeType, nodeDef, nodeDescription);

    // Show panel off-screen first to get accurate dimensions
    panel.style.visibility = 'hidden';
    panel.style.display = 'block';

    // Get actual panel dimensions after content is rendered
    const panelRect = panel.getBoundingClientRect();
    const panelWidth = panelRect.width || 300;
    const panelHeight = panelRect.height || 400;

    // Position the panel
    const itemRect = itemElement.getBoundingClientRect();
    const sideBarPanel = document.querySelector('.side-bar-panel');

    let left = 0;
    let top = 0;

    if (sideBarPanel) {
        const sideBarRect = sideBarPanel.getBoundingClientRect();

        // Try to position to the right of the sidebar
        left = sideBarRect.right + 8;

        // If it would go off-screen to the right, position to the left of the sidebar
        if (left + panelWidth > window.innerWidth - 20) {
            left = sideBarRect.left - panelWidth - 8;
        }

        // If still off-screen to the left, just position at left edge with padding
        if (left < 20) {
            left = 20;
        }

        // Vertical positioning: try to align with the hovered item
        top = itemRect.top;

        // If it would go off-screen at the bottom, move it up
        if (top + panelHeight > window.innerHeight - 20) {
            top = window.innerHeight - panelHeight - 20;
        }

        // If it would go off-screen at the top, move it down
        if (top < 20) {
            top = 20;
        }

        // If panel is taller than viewport, just position at top
        if (panelHeight > window.innerHeight - 40) {
            top = 20;
            panel.style.maxHeight = `${window.innerHeight - 40}px`;
        }
    }

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    panel.style.visibility = 'visible';
}

// Hide node preview
function hideNodePreview() {
    if (previewPanel) {
        previewPanel.style.display = 'none';
    }
}

// ============================================================================
// TAB RENDERERS
// ============================================================================

function renderEssentialsTab(container, state) {
    container.innerHTML = '';

    for (const section of ESSENTIALS_CONFIG.sections) {
        const sectionEl = document.createElement('div');
        sectionEl.className = 'nodes-section';

        const isCollapsed = section.collapsed && !state.isSectionExpanded(section.id);

        // Section header
        const header = document.createElement('div');
        header.className = `nodes-section-header ${isCollapsed ? 'collapsed' : ''}`;
        header.innerHTML = `
            <span>${section.name}</span>
            <span class="nodes-section-chevron">${ICONS.chevron}</span>
        `;
        header.onclick = () => {
            state.toggleSection(section.id);
            renderEssentialsTab(container, state);
        };
        sectionEl.appendChild(header);

        // Section content
        const content = document.createElement('div');
        content.className = 'nodes-section-content';

        if (section.type === 'favorites') {
            // Render favorites
            const favorites = [...state.favorites];
            if (favorites.length === 0) {
                content.innerHTML = `<div class="nodes-empty-state">Right-click nodes to add favorites</div>`;
            } else {
                const grid = document.createElement('div');
                grid.className = 'nodes-card-grid';
                for (const nodeType of favorites) {
                    const nodeDef = state.nodeDefinitions[nodeType];
                    if (nodeDef) {
                        grid.appendChild(createNodeCard({
                            type: nodeType,
                            displayName: nodeDef.display_name || nodeType,
                            icon: '⭐'
                        }, state));
                    }
                }
                content.appendChild(grid);
            }
        } else if (section.type === 'subgraphs') {
            // Placeholder for subgraphs
            content.innerHTML = `<div class="nodes-empty-state">No subgraphs saved yet</div>`;
        } else if (section.nodes) {
            // Render node cards
            const grid = document.createElement('div');
            grid.className = 'nodes-card-grid';

            for (const node of section.nodes) {
                grid.appendChild(createNodeCard(node, state));
            }

            content.appendChild(grid);
        }

        sectionEl.appendChild(content);
        container.appendChild(sectionEl);
    }
}

function buildSubfolderTree(nodes) {
    // Build a tree structure from the remaining category path after matching
    // e.g., if node.category is "loaders/video/specialized" and we matched "loaders",
    // the remaining path is "video/specialized"
    const tree = { __nodes: [], __children: {} };

    for (const node of nodes) {
        const remainingPath = node._remainingPath || '';
        if (!remainingPath) {
            // No subfolder, add directly
            tree.__nodes.push(node);
        } else {
            const parts = remainingPath.split('/').filter(p => p.trim());
            let current = tree.__children;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                if (!current[part]) {
                    current[part] = { __nodes: [], __children: {} };
                }
                if (i === parts.length - 1) {
                    current[part].__nodes.push(node);
                } else {
                    current = current[part].__children;
                }
            }
        }
    }

    return tree;
}

function renderSubfolderTree(container, tree, state, sectionPrefix, depth = 0) {
    // Render nodes at this level first
    if (tree.__nodes.length > 0) {
        const nodesList = document.createElement('div');
        for (const node of tree.__nodes.sort((a, b) => a.displayName.localeCompare(b.displayName))) {
            const item = createNodeListItem(node, state);
            item.style.paddingLeft = `${48 + depth * 16}px`;
            nodesList.appendChild(item);
        }
        container.appendChild(nodesList);
    }

    // Then render subfolders
    const subfolderNames = Object.keys(tree.__children).sort((a, b) => a.localeCompare(b));

    for (const folderName of subfolderNames) {
        const folder = tree.__children[folderName];
        const sectionId = `${sectionPrefix}/${folderName}`;
        const isExpanded = state.isSectionExpanded(sectionId);
        const nodeCount = countTreeNodes(folder);

        const folderItem = document.createElement('div');
        folderItem.className = `nodes-category-item nodes-subfolder ${isExpanded ? '' : 'collapsed'}`;
        folderItem.style.paddingLeft = `${28 + depth * 16}px`;
        folderItem.innerHTML = `
            <span class="nodes-category-icon">${ICONS.folder}</span>
            <span>${folderName}</span>
            <span class="nodes-category-count">${nodeCount}</span>
            <span class="nodes-category-chevron">${ICONS.chevron}</span>
        `;
        folderItem.onclick = (e) => {
            e.stopPropagation();
            state.toggleSection(sectionId);
            folderItem.dispatchEvent(new CustomEvent('category-toggle', { bubbles: true }));
        };
        container.appendChild(folderItem);

        if (isExpanded) {
            renderSubfolderTree(container, folder, state, sectionId, depth + 1);
        }
    }
}

function matchNodeToCategoryWithPath(node, patterns) {
    const category = (node.category || '').toLowerCase();

    for (const pattern of patterns) {
        const p = pattern.toLowerCase();
        const idx = category.indexOf(p);
        if (idx !== -1) {
            // Found a match - calculate the remaining path after the pattern
            const matchEnd = idx + p.length;
            let remaining = category.substring(matchEnd);
            // Remove leading slash if present
            if (remaining.startsWith('/')) {
                remaining = remaining.substring(1);
            }
            return { matched: true, remainingPath: remaining };
        }
    }
    return { matched: false, remainingPath: '' };
}

function buildCategoryTree(nodes) {
    // Build a tree structure from category paths like "dataset/image" or "loaders/video"
    const tree = {};

    for (const node of nodes) {
        const categoryPath = node.category || 'misc';
        const parts = categoryPath.split('/').filter(p => p.trim());

        if (parts.length === 0) {
            parts.push('misc');
        }

        let current = tree;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!current[part]) {
                current[part] = { __nodes: [], __children: {} };
            }
            if (i === parts.length - 1) {
                // Leaf category - add node here
                current[part].__nodes.push(node);
            } else {
                // Intermediate category - traverse deeper
                current = current[part].__children;
            }
        }
    }

    return tree;
}

function countTreeNodes(tree) {
    let count = tree.__nodes ? tree.__nodes.length : 0;
    if (tree.__children) {
        for (const key of Object.keys(tree.__children)) {
            count += countTreeNodes(tree.__children[key]);
        }
    }
    return count;
}

function renderCategoryTreeLevel(container, tree, state, prefix = 'all_', depth = 0) {
    // Sort category names alphabetically
    const categoryNames = Object.keys(tree).sort((a, b) => a.localeCompare(b));

    for (const categoryName of categoryNames) {
        const category = tree[categoryName];
        const sectionId = `${prefix}${categoryName}`;
        const hasChildren = Object.keys(category.__children || {}).length > 0;
        const hasNodes = (category.__nodes || []).length > 0;
        const totalCount = countTreeNodes(category);

        if (!hasChildren && !hasNodes) continue;

        const isExpanded = state.isSectionExpanded(sectionId);

        // Create the category folder item
        const catItem = document.createElement('div');
        catItem.className = `nodes-category-item ${isExpanded ? '' : 'collapsed'}`;
        catItem.style.paddingLeft = `${12 + depth * 16}px`;
        catItem.innerHTML = `
            <span class="nodes-category-icon">${ICONS.folder}</span>
            <span>${toTitleCase(categoryName)}</span>
            <span class="nodes-category-count">${totalCount}</span>
            <span class="nodes-category-chevron">${ICONS.chevron}</span>
        `;
        catItem.onclick = (e) => {
            e.stopPropagation();
            state.toggleSection(sectionId);
            catItem.dispatchEvent(new CustomEvent('category-toggle', { bubbles: true }));
        };
        container.appendChild(catItem);

        if (isExpanded) {
            // First render child categories (subfolders)
            if (hasChildren) {
                renderCategoryTreeLevel(container, category.__children, state, `${sectionId}/`, depth + 1);
            }

            // Then render nodes directly in this category
            if (hasNodes) {
                for (const node of category.__nodes.sort((a, b) => a.displayName.localeCompare(b.displayName))) {
                    const item = createNodeListItem(node, state);
                    item.style.paddingLeft = `${48 + depth * 16}px`;
                    container.appendChild(item);
                }
            }
        }
    }
}

// Define the order of main categories
const MAIN_CATEGORY_ORDER = [
    'Partner Nodes',
    'Basics',
    'Model Loading',
    'Generation Setup',
    'AI Models & Controls',
    'Image Processing',
    'Upscaling & Enhancement',
    'Animation & Video',
    'Specialized Workflows',
    'Utilities',
    'Development',
    'Misc',
    'Other'
];

function renderAllNodesTab(container, state) {
    container.innerHTML = '';

    // Exclude custom node packs from All Nodes tab (they appear in Custom tab only)
    const excludedCustomPacks = ['ComfyUI-VideoHelperSuite', 'ComfyUI-KJNodes'];
    const customNodes = Object.entries(state.categorizedNodes.custom)
        .filter(([packName]) => !excludedCustomPacks.includes(packName))
        .flatMap(([, nodes]) => nodes);

    const allNodes = [
        ...state.categorizedNodes.core,
        ...state.categorizedNodes.extras,
        ...state.categorizedNodes.api,
        ...customNodes
    ];

    // Filter by search query
    const query = state.searchQuery.toLowerCase();
    const filteredNodes = query
        ? allNodes.filter(n =>
            n.displayName.toLowerCase().includes(query) ||
            n.type.toLowerCase().includes(query) ||
            n.category.toLowerCase().includes(query) ||
            (n.mainCategory || '').toLowerCase().includes(query)
          )
        : allNodes;

    // Render favorites section first
    if (state.favorites.size > 0 && !query) {
        const favHeader = document.createElement('div');
        favHeader.className = 'nodes-category-header';
        favHeader.textContent = 'FAVORITES';
        container.appendChild(favHeader);

        for (const nodeType of state.favorites) {
            const nodeDef = state.nodeDefinitions[nodeType];
            if (nodeDef) {
                container.appendChild(createNodeListItem({
                    type: nodeType,
                    displayName: nodeDef.display_name || nodeType
                }, state));
            }
        }
    }

    // Listen for toggle events to re-render
    const toggleHandler = () => {
        renderAllNodesTab(container, state);
    };
    container.addEventListener('category-toggle', toggleHandler, { once: true });

    // Group nodes by mainCategory
    // API nodes (category starts with "api node/") go to "Partner Nodes"
    const nodesByMainCategory = {};
    for (const node of filteredNodes) {
        let mainCat = node.mainCategory || 'Other';
        // Override: API nodes go to Partner Nodes
        if (node.category && node.category.toLowerCase().startsWith('api node')) {
            mainCat = 'Partner Nodes';
        }
        if (!nodesByMainCategory[mainCat]) {
            nodesByMainCategory[mainCat] = [];
        }
        nodesByMainCategory[mainCat].push(node);
    }

    // Render each main category in order
    for (const mainCat of MAIN_CATEGORY_ORDER) {
        const nodes = nodesByMainCategory[mainCat];
        if (!nodes || nodes.length === 0) continue;

        // Main category header
        const header = document.createElement('div');
        header.className = 'nodes-category-header';
        header.textContent = mainCat.toUpperCase();
        container.appendChild(header);

        // Build subfolder tree from the original category paths within this main category
        const categoryTree = buildCategoryTree(nodes);

        // Render the tree
        renderCategoryTreeLevel(container, categoryTree, state, `all_${mainCat}_`);
    }

    // Render any categories not in the predefined order
    for (const mainCat of Object.keys(nodesByMainCategory)) {
        if (!MAIN_CATEGORY_ORDER.includes(mainCat)) {
            const nodes = nodesByMainCategory[mainCat];
            if (!nodes || nodes.length === 0) continue;

            const header = document.createElement('div');
            header.className = 'nodes-category-header';
            header.textContent = mainCat.toUpperCase();
            container.appendChild(header);

            const categoryTree = buildCategoryTree(nodes);
            renderCategoryTreeLevel(container, categoryTree, state, `all_${mainCat}_`);
        }
    }

    // Show empty state if no results
    if (container.children.length === 0) {
        container.innerHTML = `<div class="nodes-empty-state">No nodes found</div>`;
    }
}

function renderCustomTab(container, state) {
    container.innerHTML = '';

    const customPacks = state.categorizedNodes.custom;
    const packNames = Object.keys(customPacks).sort();

    // Filter by search query
    const query = state.searchQuery.toLowerCase();

    if (packNames.length === 0) {
        container.innerHTML = `
            <div class="nodes-empty-state">
                <strong>No custom nodes installed</strong><br><br>
                To add custom nodes like KJNodes or Video Helper Suite,<br>
                install them using ComfyUI Manager or place them in:<br>
                <code style="font-size: 11px; background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px;">custom_nodes/</code>
            </div>
        `;
    } else {
        for (const packName of packNames) {
            const nodes = customPacks[packName];
            const filteredNodes = query
                ? nodes.filter(n =>
                    n.displayName.toLowerCase().includes(query) ||
                    n.type.toLowerCase().includes(query)
                  )
                : nodes;

            if (filteredNodes.length === 0) continue;

            const isPackExpanded = state.isSectionExpanded(`custom_${packName}`);

            // Build subfolder tree from category paths
            const tree = { nodes: [], children: {} };
            for (const node of filteredNodes) {
                const categoryPath = node.category || 'uncategorized';
                const parts = categoryPath.split('/');
                let current = tree;
                for (const part of parts) {
                    if (!current.children[part]) {
                        current.children[part] = { nodes: [], children: {} };
                    }
                    current = current.children[part];
                }
                current.nodes.push(node);
            }

            // Pack header
            const packItem = document.createElement('div');
            packItem.className = `nodes-category-item ${isPackExpanded ? '' : 'collapsed'}`;
            packItem.innerHTML = `
                <span class="nodes-category-icon">${ICONS.folder}</span>
                <span>${packName}</span>
                <span class="nodes-category-count">${filteredNodes.length}</span>
                <span class="nodes-category-chevron">${ICONS.chevron}</span>
            `;
            packItem.onclick = () => {
                state.toggleSection(`custom_${packName}`);
                renderCustomTab(container, state);
            };
            container.appendChild(packItem);

            if (isPackExpanded) {
                // Render the subfolder tree
                const packContent = document.createElement('div');
                packContent.style.marginLeft = '12px';
                renderCustomSubtree(packContent, tree, `custom_${packName}`, state, 0);
                container.appendChild(packContent);
            }
        }

        if (container.children.length === 0 && query) {
            container.innerHTML = `<div class="nodes-empty-state">No custom nodes found</div>`;
        }
    }

    // Manager button
    const managerBtn = document.createElement('button');
    managerBtn.className = 'nodes-manager-button';
    managerBtn.innerHTML = `${ICONS.settings} Open Manager`;
    managerBtn.onclick = () => openManager();
    container.appendChild(managerBtn);
}

function renderCustomSubtree(container, tree, basePath, state, depth) {
    // Sort folder names
    const folderNames = Object.keys(tree.children).sort();

    for (const folderName of folderNames) {
        const subtree = tree.children[folderName];
        const folderPath = `${basePath}/${folderName}`;
        const isExpanded = state.isSectionExpanded(folderPath);

        // Count total nodes in this subtree
        const nodeCount = countCustomTreeNodes(subtree);

        const folderItem = document.createElement('div');
        folderItem.className = `nodes-category-item nodes-subfolder ${isExpanded ? '' : 'collapsed'}`;
        folderItem.style.paddingLeft = `${8 + depth * 12}px`;
        folderItem.innerHTML = `
            <span class="nodes-category-icon">${ICONS.folder}</span>
            <span>${folderName}</span>
            <span class="nodes-category-count">${nodeCount}</span>
            <span class="nodes-category-chevron">${ICONS.chevron}</span>
        `;
        folderItem.onclick = (e) => {
            e.stopPropagation();
            state.toggleSection(folderPath);
            // Re-render just this pack's content
            const packContainer = container;
            packContainer.innerHTML = '';
            // Find the pack's tree again and re-render
            renderCustomSubtree(packContainer, tree, basePath, state, 0);
        };
        container.appendChild(folderItem);

        if (isExpanded) {
            // Render nodes at this level
            for (const node of subtree.nodes) {
                const item = createNodeListItem(node, state, true);
                item.style.paddingLeft = `${20 + (depth + 1) * 12}px`;
                container.appendChild(item);
            }
            // Render child folders
            renderCustomSubtree(container, subtree, folderPath, state, depth + 1);
        }
    }

    // Render nodes at root level (no subfolder)
    if (depth === 0) {
        for (const node of tree.nodes) {
            const item = createNodeListItem(node, state, true);
            item.style.paddingLeft = '20px';
            container.appendChild(item);
        }
    }
}

function countCustomTreeNodes(tree) {
    let count = tree.nodes.length;
    for (const child of Object.values(tree.children)) {
        count += countCustomTreeNodes(child);
    }
    return count;
}

// ============================================================================
// UI ELEMENT CREATORS
// ============================================================================

function createNodeCard(node, state) {
    const card = document.createElement('div');
    card.className = 'nodes-card';
    card.draggable = true;

    card.innerHTML = `
        <div class="nodes-card-icon">${node.icon || '📦'}</div>
        <div class="nodes-card-label">${node.displayName}</div>
    `;

    // Drag handling
    card.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', node.type);
        e.dataTransfer.effectAllowed = 'copy';
        card.style.opacity = '0.5';
    };

    card.ondragend = () => {
        card.style.opacity = '1';
    };

    // Double click to add at center
    card.ondblclick = () => {
        addNodeToCanvas(node.type);
    };

    // Right-click context menu
    card.oncontextmenu = (e) => {
        e.preventDefault();
        showContextMenu(e, node.type, state);
    };

    return card;
}

function createNodeListItem(node, state, showBadges = false) {
    const item = document.createElement('div');
    item.className = 'nodes-list-item';
    item.draggable = true;

    let badges = '';
    if (showBadges && node.experimental) {
        badges += `<span class="nodes-list-item-badge beta">Beta</span>`;
    }

    item.innerHTML = `
        <span class="nodes-list-item-icon"></span>
        <span class="nodes-list-item-name">${node.displayName}</span>
        ${badges}
    `;

    // Drag handling
    item.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', node.type);
        e.dataTransfer.effectAllowed = 'copy';
        item.style.opacity = '0.5';
        // Cancel any pending timeouts and hide immediately
        if (previewShowTimeout) clearTimeout(previewShowTimeout);
        if (previewHideTimeout) clearTimeout(previewHideTimeout);
        hideNodePreview();
    };

    item.ondragend = () => {
        item.style.opacity = '1';
    };

    // Hover to show preview
    item.onmouseenter = () => {
        // Cancel any pending hide
        if (previewHideTimeout) {
            clearTimeout(previewHideTimeout);
            previewHideTimeout = null;
        }
        // Small delay before showing to avoid flickering on quick mouse movements
        if (previewShowTimeout) clearTimeout(previewShowTimeout);
        previewShowTimeout = setTimeout(() => {
            showNodePreview(node.type, state.nodeDefinitions, item);
        }, 80);
    };

    item.onmouseleave = () => {
        // Cancel pending show
        if (previewShowTimeout) {
            clearTimeout(previewShowTimeout);
            previewShowTimeout = null;
        }
        // Delay hide slightly to allow moving to adjacent items without flicker
        if (previewHideTimeout) clearTimeout(previewHideTimeout);
        previewHideTimeout = setTimeout(() => {
            hideNodePreview();
        }, 100);
    };

    // Click to add
    item.onclick = () => {
        hideNodePreview();
        addNodeToCanvas(node.type);
    };

    // Right-click context menu
    item.oncontextmenu = (e) => {
        e.preventDefault();
        showContextMenu(e, node.type, state);
    };

    return item;
}

function showContextMenu(e, nodeType, state) {
    // Remove existing menu
    const existingMenu = document.querySelector('.nodes-context-menu');
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement('div');
    menu.className = 'nodes-context-menu';
    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;

    const isFav = state.isFavorite(nodeType);

    const favItem = document.createElement('div');
    favItem.className = 'nodes-context-menu-item';
    favItem.textContent = isFav ? 'Remove from Favorites' : 'Add to Favorites';
    favItem.onclick = () => {
        state.toggleFavorite(nodeType);
        menu.remove();
    };

    menu.appendChild(favItem);
    document.body.appendChild(menu);

    // Close on any click/mousedown outside or right-click anywhere
    const closeHandler = (e) => {
        if (!menu.contains(e.target)) {
            menu.remove();
            document.removeEventListener('mousedown', closeHandler, true);
            document.removeEventListener('contextmenu', closeOnContextMenu, true);
        }
    };
    const closeOnContextMenu = (e) => {
        menu.remove();
        document.removeEventListener('mousedown', closeHandler, true);
        document.removeEventListener('contextmenu', closeOnContextMenu, true);
    };
    setTimeout(() => {
        document.addEventListener('mousedown', closeHandler, true);
        document.addEventListener('contextmenu', closeOnContextMenu, true);
    }, 0);
}

// ============================================================================
// ACTIONS
// ============================================================================

function addNodeToCanvas(nodeType) {
    const node = LiteGraph.createNode(nodeType);
    if (node) {
        const canvasCenter = [
            -app.canvas.ds.offset[0] + app.canvas.canvas.width / 2 / app.canvas.ds.scale,
            -app.canvas.ds.offset[1] + app.canvas.canvas.height / 2 / app.canvas.ds.scale
        ];
        node.pos = canvasCenter;
        app.graph.add(node);
        console.log(`[NodesPanel] Added node: ${nodeType}`);
    }
}

function openManager() {
    // Try to find and click the Manager button if it exists
    const managerButton = document.querySelector('button[aria-label*="Manager"]');
    if (managerButton) {
        managerButton.click();
        return;
    }

    // Try alternative methods
    if (window.ComfyUI_Manager) {
        window.ComfyUI_Manager.open();
        return;
    }

    // Show installation message
    alert('ComfyUI Manager is not installed.\n\nTo install it, visit:\nhttps://github.com/ltdrdata/ComfyUI-Manager');
}

// Setup canvas drop handling
let canvasDropSetup = false;
function setupCanvasDropHandling() {
    if (canvasDropSetup) return;
    canvasDropSetup = true;

    const canvas = app.canvas.canvas;

    canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const nodeType = e.dataTransfer.getData('text/plain');

        if (nodeType) {
            const node = LiteGraph.createNode(nodeType);
            if (node) {
                const rect = canvas.getBoundingClientRect();
                const ds = app.canvas.ds;
                const graphPos = [
                    (e.clientX - rect.left) / ds.scale - ds.offset[0],
                    (e.clientY - rect.top) / ds.scale - ds.offset[1]
                ];

                node.pos = graphPos;
                app.graph.add(node);
                console.log(`[NodesPanel] Dropped node at:`, graphPos);
            }
        }
    });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function initializePanel(panel, state) {
    const tabButtons = panel.querySelectorAll('.nodes-panel-tab');
    const tabContents = panel.querySelectorAll('.nodes-panel-tab-content');
    const searchInput = panel.querySelector('.nodes-panel-search-input');

    // Tab switching
    tabButtons.forEach(btn => {
        btn.onclick = () => {
            const tab = btn.dataset.tab;
            state.setActiveTab(tab);
        };
    });

    // Search
    let searchTimeout;
    searchInput.oninput = (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            state.setSearchQuery(e.target.value);
        }, 150);
    };

    // Render function
    const render = () => {
        // Update tab buttons
        tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === state.activeTab);
        });

        // Update tab contents
        tabContents.forEach(content => {
            const isActive = content.dataset.tab === state.activeTab;
            content.classList.toggle('active', isActive);

            if (isActive) {
                switch (content.dataset.tab) {
                    case 'essentials':
                        renderEssentialsTab(content, state);
                        break;
                    case 'all_nodes':
                        renderAllNodesTab(content, state);
                        break;
                    case 'custom':
                        renderCustomTab(content, state);
                        break;
                }
            }
        });
    };

    // Subscribe to state changes
    state.subscribe(render);

    // Initial render
    render();
}

// ============================================================================
// EXTENSION REGISTRATION
// ============================================================================

app.registerExtension({
    name: "Comfy.NodesPanel",

    async setup() {
        console.log("[NodesPanel] Initializing nodes panel extension");

        // Initialize state
        panelState = new PanelState();

        // Load node definitions
        panelState.nodeDefinitions = await loadNodeDefinitions();
        panelState.categorizedNodes = categorizeNodes(panelState.nodeDefinitions);

        console.log(`[NodesPanel] Loaded ${Object.keys(panelState.nodeDefinitions).length} nodes`);
        console.log(`[NodesPanel] Custom packs: ${Object.keys(panelState.categorizedNodes.custom).join(', ')}`);

        // Create panel
        const panel = createPanel();

        // Find the existing side-bar-panel (Vue's splitter pane) and inject into it
        // This integrates with the existing splitter system so our panel behaves like built-in panels
        const injectPanel = () => {
            const sideBarPanel = document.querySelector('.side-bar-panel');
            if (sideBarPanel) {
                // Make the side-bar-panel position relative so our absolute panel works
                sideBarPanel.style.position = 'relative';
                sideBarPanel.appendChild(panel);
                console.log('[NodesPanel] Injected into .side-bar-panel');
                return true;
            }
            return false;
        };

        // Try to inject, retry if not found yet
        if (!injectPanel()) {
            let injectAttempts = 0;
            const injectInterval = setInterval(() => {
                if (injectPanel() || ++injectAttempts > 50) {
                    clearInterval(injectInterval);
                    if (injectAttempts > 50) {
                        console.warn('[NodesPanel] Could not find .side-bar-panel, falling back to body');
                        document.body.appendChild(panel);
                    }
                }
            }, 100);
        }

        // Initialize panel
        initializePanel(panel, panelState);

        // Setup canvas drop handling
        setupCanvasDropHandling();

        // Hook into existing node-library button
        const hookNodeLibraryButton = () => {
            // Find existing node-library button by various selectors
            let nodeLibButton = document.querySelector('button[aria-label*="Node Library"]')
                || document.querySelector('button[aria-label*="node-library"]')
                || document.querySelector('[data-tooltip="Node Library"]');

            // Try finding by the button label text "Nodes"
            if (!nodeLibButton) {
                const allButtons = document.querySelectorAll('.side-bar-button');
                for (const btn of allButtons) {
                    const label = btn.querySelector('.side-bar-button-label');
                    if (label && label.textContent.trim() === 'Nodes') {
                        nodeLibButton = btn;
                        break;
                    }
                }
            }

            if (!nodeLibButton) {
                console.log('[NodesPanel] Could not find Nodes button');
                return false;
            }

            // Check if already hooked
            if (nodeLibButton.dataset.customHooked) {
                return true;
            }
            nodeLibButton.dataset.customHooked = 'true';

            // Track if our panel should be shown
            let shouldShowPanel = false;

            // Function to inject and show our panel
            const showOurPanel = () => {
                // Immediately show our panel
                panel.classList.add('open');

                const doInject = () => {
                    const sideBarPanel = document.querySelector('.side-bar-panel');
                    if (sideBarPanel) {
                        // Hide all Vue children immediately via inline style
                        Array.from(sideBarPanel.children).forEach(child => {
                            if (child !== panel && !child.classList.contains('nodes-panel')) {
                                child.style.display = 'none';
                            }
                        });

                        if (!sideBarPanel.contains(panel)) {
                            sideBarPanel.style.position = 'relative';
                            sideBarPanel.appendChild(panel);
                        }
                    }
                };

                // Try multiple times to ensure Vue has created the panel
                doInject();
                setTimeout(doInject, 50);
                setTimeout(doInject, 150);
                setTimeout(doInject, 300);
            };

            // Function to restore Vue's content when hiding our panel
            const hideOurPanel = () => {
                panel.classList.remove('open');
                document.body.classList.remove('nodes-panel-opening');
                const sideBarPanel = document.querySelector('.side-bar-panel');
                if (sideBarPanel) {
                    // Restore Vue's content visibility
                    Array.from(sideBarPanel.children).forEach(child => {
                        if (child !== panel) {
                            child.style.display = '';
                        }
                    });
                }
            };

            // Hide our panel when ANY other sidebar button is clicked
            const allSidebarButtons = document.querySelectorAll('.side-bar-button');
            allSidebarButtons.forEach(btn => {
                if (btn !== nodeLibButton) {
                    btn.addEventListener('click', () => {
                        // Close our panel when other tabs are clicked
                        shouldShowPanel = false;
                        document.body.classList.remove('nodes-panel-opening');
                        hideOurPanel();
                    }, true);
                }
            });

            // Listen for clicks on node-library button using capture to run before Vue
            nodeLibButton.addEventListener('click', (e) => {
                console.log('[NodesPanel] Node library button clicked!');
                // Check if panel is currently shown (button is selected)
                const isCurrentlySelected = nodeLibButton.classList.contains('side-bar-button-selected');
                console.log('[NodesPanel] isCurrentlySelected:', isCurrentlySelected);

                if (isCurrentlySelected) {
                    // Clicking again to close - let Vue close it, hide our panel
                    shouldShowPanel = false;
                    document.body.classList.remove('nodes-panel-opening');
                    hideOurPanel();
                } else {
                    // IMMEDIATELY add class to body to hide Vue's content via CSS
                    document.body.classList.add('nodes-panel-opening');
                    // Opening the nodes tab - let Vue open the panel, then show our content
                    shouldShowPanel = true;
                    showOurPanel();
                }
                // Don't prevent default - let Vue also handle it to open the sidebar
            }, true); // Use capture phase to ensure we run

            console.log("[NodesPanel] Successfully hooked node-library button");
            return true;
        };

        // Stop propagation for clicks inside the panel
        panel.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Retry hook
        let attempts = 0;
        const maxAttempts = 100;

        const tryHook = () => {
            if (hookNodeLibraryButton()) {
                return;
            }

            attempts++;
            if (attempts < maxAttempts) {
                setTimeout(tryHook, 100);
            } else {
                console.log("[NodesPanel] Failed to hook node-library button after", maxAttempts, "attempts");
            }
        };

        tryHook();
    }
});
