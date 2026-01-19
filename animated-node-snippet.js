// Paste this entire code into the browser console (F12 -> Console tab)
// Then press Enter to run it

(function() {
  console.log('[AnimatedNode] Manual injection starting...');

  if (typeof LGraphCanvas === 'undefined') {
    console.error('[AnimatedNode] LGraphCanvas not found. Make sure ComfyUI is loaded.');
    return;
  }

  if (!window.app) {
    console.error('[AnimatedNode] window.app not found. Make sure ComfyUI is loaded.');
    return;
  }

  console.log('[AnimatedNode] Found LGraphCanvas and app, injecting animation...');

  // Store the original drawNodeShape method
  const originalDrawNodeShape = LGraphCanvas.prototype.drawNodeShape;

  // Animation state
  let animationOffset = 0;
  let lastTime = performance.now();

  // Animation loop
  function animate() {
    const currentTime = performance.now();
    const delta = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    // Update offset (40 pixels per second)
    animationOffset = (animationOffset + delta * 40) % 40;

    // Force canvas redraw if executing
    if (window.app?.progress && window.app.canvas?.graph) {
      window.app.canvas.setDirty(true, false);
    }

    requestAnimationFrame(animate);
  }

  // Override drawNodeShape
  LGraphCanvas.prototype.drawNodeShape = function(node, ctx, size, fgcolor, bgcolor, selected, mouse_over) {
    // Call original first
    const result = originalDrawNodeShape.apply(this, arguments);

    // Check if this node is executing
    const isExecuting = window.app?.progress?.id === String(node.id);

    if (isExecuting) {
      ctx.save();

      // Set up animated stroke
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00ff00';
      ctx.shadowBlur = 8;

      // Animated dashes
      ctx.setLineDash([15, 10]);
      ctx.lineDashOffset = -animationOffset;

      // Draw stroke
      const radius = node.shape === 'box' ? 0 : 10;
      ctx.beginPath();
      ctx.roundRect(0, 0, size[0], size[1], [radius]);
      ctx.stroke();

      // Extra glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0, 255, 0, 0.5)';
      ctx.stroke();

      // Reset
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    return result;
  };

  // Start animation
  animate();

  console.log('[AnimatedNode] ✅ Animation injected successfully! Run a workflow to see the animated stroke.');
})();
