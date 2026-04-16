---
title: "AI-Driven Automation Pipeline"
tech: ["n8n", "Python", "OpenAI", "Supabase", "Google Sheets", "NLP"]
type: "Automation"
github_url: "https://github.com/Rangga056/dutrans"
images:
  - url: "https://n8n.io/static/templates/previews/1647.png"
    caption: "n8n Workflow - AI Data Processing & Enrichment Pipeline"
    layout: "desktop"
---

### The Challenge
Data processing for survey labels was a manual, time-consuming process that bottlenecked operational speed. The goal was to automate the normalization and labeling of survey data at scale using advanced NLP techniques.

### The Solution
I engineered an end-to-end automation pipeline using **n8n** as the orchestrator and **Python** for specialized processing logic.

1.  **Ingestion:** Automated triggers to pull raw survey data from Google Sheets in real-time.
2.  **AI Analysis:** Python-based agents utilizing **OpenAI** models to analyze text sentiment and semantic context.
3.  **Autonomous Labeling:** Unsupervised clustering algorithms to auto-categorize survey responses with high accuracy.
4.  **Database Integration:** Synchronizing processed data into **Supabase** for persistent storage and downstream application access.
5.  **RAG System:** Integrated a Retrieval-Augmented Generation system to enable natural language queries over the processed dataset.

### Technical Implementation
The pipeline leverages n8n's visual workflow engine to coordinate complex branching logic and error handling, while the Python nodes handle heavy-duty data transformation and LLM interactions.

### Results
- **60% Increase** in operational efficiency by removing manual bottlenecks.
- Reduced manual labeling errors by **40%** through consistent AI-driven categorization.
- Enabled immediate data insights for stakeholders via an intelligent query interface.
