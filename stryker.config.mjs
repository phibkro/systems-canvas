export default {
  testRunner: "vitest",
  mutate: ["site/system-canvas-state.mjs"],
  reporters: ["clear-text", "progress", "html"],
  coverageAnalysis: "off",
  concurrency: 2,
  thresholds: { high: 95, low: 85, break: 85 },
  vitest: { related: true },
  tempDirName: ".stryker-tmp",
};
