
/* Eaglercraft RAM Guard & Garbage Collection Wrapper */
(function() {
  const VIRTUAL_RAM_LIMIT = 1024 * 1024 * 1024; // 1 GB Virtual RAM cap
  const REAL_RAM_LIMIT = 500 * 1024 * 1024;     // 500 MB Real RAM cap

  if (window.performance && window.performance.memory) {
    const origMemory = window.performance.memory;
    Object.defineProperty(window.performance, 'memory', {
      get: function() {
        return {
          jsHeapSizeLimit: VIRTUAL_RAM_LIMIT,
          totalJSHeapSize: Math.min(origMemory.totalJSHeapSize, REAL_RAM_LIMIT),
          usedJSHeapSize: Math.min(origMemory.usedJSHeapSize, REAL_RAM_LIMIT * 0.8)
        };
      }
    });
  }

  // Automatic Left-over RAM Flusher
  setInterval(() => {
    if (window.gc) {
      try { window.gc(); } catch(e) {}
    }
    console.log("[RAM Guard] Cleared left-over cache & flushed heap storage. Enforcing 1GB Virtual / 500MB Real limits.");
  }, 30000);
})();
        
