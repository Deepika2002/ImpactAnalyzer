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
  },

  // Dev page data
  devStats: {
    impactMap: {
      components: [
        { id: "auth-service", name: "Auth Service", severity: "high", impact: 95, files: 12, lines: 847 },
        { id: "user-api", name: "User API", severity: "medium", impact: 72, files: 8, lines: 634 },
        { id: "payment-module", name: "Payment Module", severity: "high", impact: 88, files: 15, lines: 1205 },
        { id: "ui-components", name: "UI Components", severity: "low", impact: 34, files: 25, lines: 892 },
        { id: "database-layer", name: "Database Layer", severity: "critical", impact: 98, files: 6, lines: 445 },
        { id: "notification-service", name: "Notification Service", severity: "medium", impact: 56, files: 4, lines: 287 }
      ],
      heatmapData: [
        { x: 0, y: 0, value: 95, component: "auth-service" },
        { x: 1, y: 0, value: 72, component: "user-api" },
        { x: 2, y: 0, value: 88, component: "payment-module" },
        { x: 0, y: 1, value: 34, component: "ui-components" },
        { x: 1, y: 1, value: 98, component: "database-layer" },
        { x: 2, y: 1, value: 56, component: "notification-service" }
      ]
    },
    
    codeChanges: {
      summary: {
        totalFiles: 23,
        linesAdded: 847,
        linesDeleted: 231,
        complexity: 78
      },
      fileChanges: [
        { file: "src/auth/AuthService.js", added: 156, deleted: 43, complexity: 85, type: "modified" },
        { file: "src/api/UserController.js", added: 89, deleted: 12, complexity: 62, type: "modified" },
        { file: "src/components/LoginForm.jsx", added: 234, deleted: 78, complexity: 91, type: "modified" },
        { file: "src/utils/ValidationHelper.js", added: 67, deleted: 23, complexity: 45, type: "new" },
        { file: "src/config/DatabaseConfig.js", added: 145, deleted: 67, complexity: 78, type: "modified" },
        { file: "tests/auth.test.js", added: 156, deleted: 8, complexity: 32, type: "new" }
      ]
    },

    testFlows: [
      {
        id: "auth-flow",
        name: "Authentication Flow",
        status: "pending",
        duration: "2.3s",
        coverage: 89.5,
        steps: 12,
        priority: "high",
        description: "Complete user authentication and session management"
      },
      {
        id: "payment-flow",
        name: "Payment Processing",
        status: "running",
        duration: "4.1s",
        coverage: 76.2,
        steps: 18,
        priority: "critical",
        description: "End-to-end payment flow with validation"
      },
      {
        id: "user-registration",
        name: "User Registration",
        status: "completed",
        duration: "1.8s",
        coverage: 94.3,
        steps: 8,
        priority: "medium",
        description: "New user registration and verification process"
      },
      {
        id: "api-integration",
        name: "API Integration Tests",
        status: "failed",
        duration: "3.7s",
        coverage: 65.1,
        steps: 15,
        priority: "high",
        description: "Third-party API integration validation"
      }
    ],

    coverageImpact: {
      overall: 82.7,
      byComponent: [
        { component: "Authentication", before: 78.5, after: 89.5, impact: "+11.0" },
        { component: "User Management", before: 85.2, after: 87.8, impact: "+2.6" },
        { component: "Payment System", before: 72.1, after: 76.2, impact: "+4.1" },
        { component: "UI Components", before: 94.3, after: 95.1, impact: "+0.8" },
        { component: "Database Layer", before: 88.7, after: 88.7, impact: "0.0" },
        { component: "API Layer", before: 79.4, after: 65.1, impact: "-14.3" }
      ],
      trends: [
        { date: "2024-09-15", coverage: 78.2 },
        { date: "2024-09-16", coverage: 79.8 },
        { date: "2024-09-17", coverage: 81.3 },
        { date: "2024-09-18", coverage: 80.9 },
        { date: "2024-09-19", coverage: 82.1 },
        { date: "2024-09-20", coverage: 82.7 }
      ]
    }
  }
};