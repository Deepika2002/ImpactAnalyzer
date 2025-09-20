// Mock data for Impact Analysis Dashboard

export const mockData = {
  yesterdayStats: {
    totalMRs: 12,
    unitTestCoverage: 78.5,
    mrDetails: [
      { id: 1, title: "Fix authentication bug", coverage: 85.2, author: "John Doe" },
      { id: 2, title: "Add new API endpoint", coverage: 72.1, author: "Jane Smith" },
      { id: 3, title: "Update documentation", coverage: 90.0, author: "Mike Johnson" },
      { id: 4, title: "Refactor user service", coverage: 68.9, author: "Sarah Wilson" },
      { id: 5, title: "Fix memory leak", coverage: 81.3, author: "Alex Chen" }
    ]
  },
  
  currentStats: {
    overallCoverage: 82.3,
    couplingData: {
      nodes: [
        { id: "auth", label: "Authentication", size: 25, connections: 8 },
        { id: "user", label: "User Service", size: 30, connections: 12 },
        { id: "api", label: "API Layer", size: 35, connections: 15 },
        { id: "db", label: "Database", size: 20, connections: 6 },
        { id: "ui", label: "UI Components", size: 28, connections: 10 },
        { id: "utils", label: "Utilities", size: 15, connections: 4 }
      ],
      edges: [
        { source: "auth", target: "user", strength: 0.8 },
        { source: "user", target: "api", strength: 0.9 },
        { source: "api", target: "db", strength: 0.7 },
        { source: "ui", target: "api", strength: 0.6 },
        { source: "utils", target: "auth", strength: 0.5 },
        { source: "utils", target: "user", strength: 0.4 }
      ]
    },
    coverageBreakdown: {
      frontend: 79.2,
      backend: 85.4,
      tests: 92.1,
      integration: 73.8
    }
  }
};