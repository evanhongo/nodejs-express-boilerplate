module.exports = {
  apps: [
    {
      name: "server",
      instances: "max",
      cwd: __dirname,
      script: "build/main.js"
    }
  ],
};
