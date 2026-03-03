import { defineConfig } from "cypress";

module.exports = {
    projectId: "pdjarimbi1",
}

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter', // <--- 1. Tambahkan ini
  reporterOptions: {
    charts: true,             // Tampilkan grafik pie chart
    reportPageTitle: 'Laporan Test Automation Arimbi',
    embeddedScreenshots: true, // Screenshot error nempel di laporan
    inlineAssets: true,       // Agar file HTML bisa dibuka tanpa internet
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // 2. Tambahkan ini
      require('cypress-mochawesome-reporter/plugin')(on); 
      return config;
    },
    baseUrl: 'https://arimbi.co.id', // (Optional) Base URL kamu
  },
});