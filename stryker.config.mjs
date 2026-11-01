export default {
  testRunner: "vitest",
  mutate: ["site/system-canvas-state.mjs"],
  reporters: ["clear-text", "progress", "html"],
  coverageAnalysis: "off",
  concurrency: 2,
  thresholds: { high: 85, low: 65, break: 0 },
  vitest: { related: true },
  tempDirName: ".stryker-tmp",
};
