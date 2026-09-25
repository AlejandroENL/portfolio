export type ProjectDetail = {
  id: number;
  problem: string;
  solution: string;
  architecture: string[];
  engineeringFocus: string[];
  demoIdeas?: string[];
  hasMapComponent: boolean;
  mapComponentButton?: {
    buttonLabel: string,
    toolType: "identify" | "draw" ,
    toolInstructions: string,
  }
};

export type Project = {
  title: string;
  stack: string;
  description: string;
  highlights: string[];
  details: ProjectDetail;
};

export const projects: Project[] = [
  {
    title: "Enterprise Document Retrieval Workflow",
    stack: "React • TypeScript • Backend Processing Services • Enterprise File Systems",
    description:
      "Interactive document retrieval tool that connects map-based user input with backend file lookup, validation, and preview delivery.",

    highlights: [
      "Built a modular React/TypeScript workflow for user-driven document lookup.",
      "Integrated asynchronous backend processing for file validation and delivery.",
      "Reduced manual searching by connecting records, documents, and user actions in one interface."
    ],

    details: {
      id: 1,

      problem:
        "Users needed to retrieve engineering documents stored outside the web application, which required manually identifying records, searching file systems, and opening documents through disconnected workflows.",

      solution:
        "Built an interactive frontend workflow that reads selected record attributes, submits lookup requests to a backend processing service, validates document availability, and returns a usable preview or file link to the user.",

      architecture: [
        "User selects a record from the interface",
        "Frontend resolves configured attributes",
        "Application builds document lookup values",
        "Backend service validates and retrieves matching document",
        "Frontend receives returned URL and opens document preview"
      ],

      engineeringFocus: [
        "Frontend/backend separation",
        "Asynchronous backend job handling",
        "Enterprise file retrieval workflows",
        "Stateful React UI updates",
        "User-centered workflow automation"
      ],

      hasMapComponent: true,
      mapComponentButton: {
        buttonLabel: "Retrieve Document",
        toolType: "identify",
        toolInstructions: "Please Select A Feature To View Corresponding Document"
      }
    }
  },

  {
    title: "Spatial Search & Records Aggregation Tool",
    stack: "React • TypeScript • Spatial Queries • Enterprise Data Services",
    description:
      "Selection-based search workflow that aggregates related records, removes duplicates, and presents structured results for review.",

    highlights: [
      "Implemented area-based selection and record aggregation.",
      "Created logic to extract, normalize, and deduplicate related values.",
      "Rendered results in a structured interface suitable for review and printing."
    ],

    details: {
      id: 2,
      
      problem:
        "Users needed to collect related records across multiple selected assets without manually opening each record or searching through separate systems.",

      solution:
        "Built an interactive selection workflow that queries records within a user-defined area, extracts related document references, removes duplicates, and displays grouped results in a readable interface.",

      architecture: [
        "User defines an area of interest",
        "Application queries matching records",
        "Related fields are extracted and normalized",
        "Duplicate values are removed",
        "Frontend renders grouped lookup results"
      ],

      engineeringFocus: [
        "Search and aggregation logic",
        "Reusable frontend rendering patterns",
        "Data normalization",
        "Interactive selection workflows",
        "Structured result presentation"
      ],

      demoIdeas: [
        "Polygon selection demo with sample records",
        "Mock infrastructure lookup table",
        "Query and aggregation flow diagram",
        "Print/export interface prototype"
      ],
      hasMapComponent: false, // temp while i work on demo component 
      mapComponentButton: {
        buttonLabel: "Search Area",
        toolType: "draw",
        toolInstructions: "Please Draw An Area To View Associated Records"
      }
    }
  },

  {
    title: "Operational Request Management Tool",
    stack: "React • TypeScript • Python • Backend Write Services",
    description:
      "Unified request submission workflow for issue reporting, enhancement requests, and operational support tracking.",

    highlights: [
      "Merged multiple request types into one user-facing workflow.",
      "Used backend services to securely persist request records.",
      "Added notifications and tracking support for team visibility."
    ],

    details: {
      id: 3,
      
      problem:
        "Support requests, enhancement ideas, and data issues were being submitted through disconnected communication channels, making tracking and team visibility inconsistent.",

      solution:
        "Built a unified submission workflow with frontend validation, backend-controlled writes, notification support, and persistent request tracking.",

      architecture: [
        "User submits request through application UI",
        "Frontend validates request type and input fields",
        "Backend service writes record to enterprise table",
        "Notification workflow alerts support team",
        "Submitted requests become trackable operational records"
      ],

      engineeringFocus: [
        "Workflow consolidation",
        "Secure backend write architecture",
        "Form validation",
        "Operational transparency",
        "Notification workflows"
      ],

      demoIdeas: [
        "Open-source request submission demo",
        "Issue reporting form with mock backend",
        "Frontend/backend request flow diagram",
        "Mock operations dashboard"
      ],
      hasMapComponent: true,
      mapComponentButton: {
        buttonLabel: "Service/Change Request",
        toolType: "identify",
        toolInstructions: "Please Enter Request Details"
      }
    }
  },

  {
    title: "Enterprise Inventory Dashboard",
    stack: "React • TypeScript • SQL Server • DataTables",
    description:
      "Internal dashboard for reviewing applications, services, data sources, and dependency relationships across enterprise systems.",

    highlights: [
      "Modernized a legacy jQuery-based application structure.",
      "Built reusable table and detail-view components.",
      "Supported dependency review across applications, services, and data sources."
    ],

    details: {
      id: 4,
      
      problem:
        "Existing inventory tools used older frontend patterns and made it difficult to understand relationships between applications, services, and backend dependencies.",

      solution:
        "Rebuilt the dashboard with React and TypeScript using reusable components, dynamic table rendering, and expandable relationship views.",

      architecture: [
        "Frontend retrieves inventory datasets",
        "Dynamic tables render application and service records",
        "Expandable detail views load related dependencies",
        "Reusable components support multiple inventory types"
      ],

      engineeringFocus: [
        "Legacy application modernization",
        "Reusable component architecture",
        "Dynamic UI rendering",
        "Dependency relationship analysis",
        "Enterprise data visualization"
      ],

      demoIdeas: [
        "Sample expandable inventory table",
        "Service dependency visualization",
        "Component hierarchy diagram",
        "Mock application inventory dataset"
      ],
      hasMapComponent: false
    }
  },

  {
    title: "Embedded CRM Map Integration",
    stack: "React • ArcGIS Maps SDK • Express.js • OAuth",
    description:
      "Embedded a secure mapping interface into an external CRM platform using a lightweight backend service layer for authentication.",

    highlights: [
      "Integrated a mapping application into an external enterprise platform.",
      "Implemented backend token handling for seamless authenticated access.",
      "Designed a service layer to support secure embedded application workflows."
    ],

    details: {
      id: 5,
      
      problem:
        "The CRM platform needed embedded mapping capabilities, but authentication requirements created friction and prevented a seamless user experience.",

      solution:
        "Built an embedded mapping application supported by an Express.js service layer responsible for securely handling authentication and token workflows.",

      architecture: [
        "User accesses CRM platform",
        "Embedded application loads inside CRM interface",
        "Express.js backend brokers authentication",
        "Token service returns authenticated access",
        "Frontend loads protected resources without separate login"
      ],

      engineeringFocus: [
        "Enterprise system integration",
        "OAuth and token management",
        "Frontend/backend communication",
        "Embedded application workflows",
        "Secure authentication architecture"
      ],

      demoIdeas: [
        "Authentication flow diagram",
        "Embedded app UI mockup",
        "Simplified Express.js token workflow",
        "Frontend/backend sequence diagram"
      ],
      hasMapComponent: false
    }
  },

  {
    title: "Python Automation Pipelines",
    stack: "Python • SQL Server • Scheduled Jobs • Data Processing",
    description:
      "Backend automation workflows for scheduled processing, reporting, data validation, and operational support.",

    highlights: [
      "Automated repetitive processing and reporting tasks.",
      "Built scheduled backend workflows for enterprise operations.",
      "Improved consistency, logging, and maintainability of recurring processes."
    ],

    details: {
      id: 6,
      
      problem:
        "Recurring operational workflows relied on repetitive manual processing, increasing turnaround time and introducing inconsistency.",

      solution:
        "Developed Python automation pipelines for scheduled processing, reporting, database updates, validation, and operational support tasks.",

      architecture: [
        "Scheduled job triggers Python workflow",
        "Script retrieves records from enterprise systems",
        "Processing and validation logic executes",
        "Outputs are logged and persisted",
        "Reports or notifications are generated as needed"
      ],

      engineeringFocus: [
        "Backend automation",
        "Scheduled processing pipelines",
        "Database integration",
        "Logging and reliability",
        "Operational process improvement"
      ],

      demoIdeas: [
        "Automation pipeline diagram",
        "Mock reporting workflow",
        "Scheduled job architecture visualization",
        "Python logging and monitoring example"
      ],
      hasMapComponent: false
    }
  }
];