export interface KnowledgeBaseEntry {
  title: string;
  category: 'Principle' | 'Pattern' | 'Best Practice';
  content: string;
}

export const knowledgeBase: KnowledgeBaseEntry[] = [
  {
    title: "SOLID Principles",
    category: "Principle",
    content: `
      1. Single Responsibility Principle (SRP): A class should have one, and only one, reason to change.
      2. Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.
      3. Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types.
      4. Interface Segregation Principle (ISP): Clients should not be forced to depend on methods they do not use.
      5. Dependency Inversion Principle (DIP): Depend on abstractions, not on concretions.
    `
  },
  {
    title: "DRY (Don't Repeat Yourself)",
    category: "Principle",
    content: "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."
  },
  {
    title: "KISS (Keep It Simple, Stupid)",
    category: "Principle",
    content: "Most systems work best if they are kept simple rather than made complicated; therefore simplicity should be a key goal in design and unnecessary complexity should be avoided."
  },
  {
    title: "Singleton Pattern",
    category: "Pattern",
    content: "Ensures a class has only one instance and provides a global point of access to it."
  },
  {
    title: "Factory Pattern",
    category: "Pattern",
    content: "Defines an interface for creating an object, but lets subclasses decide which class to instantiate."
  },
  {
    title: "Observer Pattern",
    category: "Pattern",
    content: "Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically."
  },
  {
    title: "Clean Code: Meaningful Names",
    category: "Best Practice",
    content: "Use intention-revealing names. Avoid disinformation. Make meaningful distinctions. Use pronounceable names. Use searchable names."
  },
  {
    title: "Unit Testing",
    category: "Best Practice",
    content: "Write small, isolated tests for individual units of code. Follow the AAA (Arrange, Act, Assert) pattern. Aim for high coverage but focus on critical paths."
  },
  {
    title: "Error Handling",
    category: "Best Practice",
    content: "Use exceptions rather than return codes. Provide context with exceptions. Don't return null. Don't pass null."
  },
  {
    title: "Microservices Architecture",
    category: "Pattern",
    content: "An architectural style that structures an application as a collection of services that are highly maintainable and testable, loosely coupled, independently deployable, organized around business capabilities."
  },
  {
    title: "Event-Driven Architecture",
    category: "Pattern",
    content: "A software architecture paradigm promoting the production, detection, consumption of, and reaction to events."
  },
  {
    title: "Daedalus Protocol: Core Proficiencies",
    category: "Best Practice",
    content: `
      1. Architectural Synthesis:
         - Input: High-level vision, business requirements, or rough sketches.
         - Output: Comprehensive system designs, SVG architecture diagrams, and component hierarchies.
      2. Autonomous Implementation:
         - Input: Feature specifications, UI mockups (images), or functional descriptions.
         - Output: Production-ready code artifacts across multiple languages (TypeScript, Python, etc.) with integrated tests.
      3. Ethical & Security Auditing:
         - Input: Proposed designs or existing code snippets.
         - Output: Detailed risk assessments, bias detection reports, and mitigation strategies.
    `
  },
  {
    title: "Daedalus Protocol: Onboarding Process",
    category: "Best Practice",
    content: `
      Step 1: Neural Link Initialization - Select your access level (Administrator, Developer, or Guest) to tailor the interface.
      Step 2: Project Inception - Use the 'New Project' command to create a isolated neural workspace.
      Step 3: Requirement Ingestion - Describe your project idea or upload a visual mockup. Daedalus will analyze and confirm the scope.
      Step 4: Artifact Manifestation - Daedalus generates initial artifacts (Architecture, Code, Docs) in the side-by-side canvas.
      Step 5: Iterative Refinement - Provide feedback or ask for modifications. Use the Version Timeline to track evolution.
    `
  },
  {
    title: "Daedalus Protocol: Ethical Guidelines",
    category: "Best Practice",
    content: `
      - Bias Identification: Daedalus uses linguistic analysis and algorithmic cross-referencing to detect social, gender, or racial biases in generated content.
      - Security First: All code generation adheres to OWASP standards and undergoes automated vulnerability scanning.
      - Privacy by Design: Daedalus prioritizes data minimization and secure state management in all architectural designs.
      - Responsible AI: Every neural pulse is monitored by the Ethical Auditor to ensure fairness and transparency.
    `
  },
  {
    title: "AI Ethics & Bias Detection Module",
    category: "Best Practice",
    content: `
      Daedalus identifies ethical issues and biases through a multi-layered proactive analysis:
      
      1. Requirement Scanning:
         - Method: Natural Language Processing (NLP) to detect keywords and semantic patterns associated with high-stakes automated decisions, surveillance, or discriminatory practices.
         - Identification: Flags requirements that lack human oversight or propose data collection without clear consent.
         - Recommendation: "Integrate human-in-the-loop review" or "Implement transparent data usage disclosures."
         
      2. Code Bias Audit:
         - Method: Algorithmic fairness testing and static analysis of decision-making logic.
         - Identification: Detects disparate impact in recommendation engines or classification models by simulating diverse user inputs.
         - Recommendation: "Re-balance training datasets" or "Apply fairness constraints to the loss function."
         
      3. Process Auditing:
         - Method: Continuous monitoring of the development lifecycle, ensuring compliance with the Or4cl3 Ethical Charter.
         - Identification: Flags deviations from established security and privacy protocols.
         - Recommendation: "Enforce PII masking in logs" or "Implement mandatory security headers."
    `
  }
];

export const getKnowledgeBaseContext = () => {
  return knowledgeBase.map(entry => `[${entry.category}] ${entry.title}: ${entry.content}`).join('\n\n');
};
