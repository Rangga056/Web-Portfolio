---
title: "AI-Driven Automation Pipeline"
tech: ["n8n", "Python", "OpenAI", "Supabase"]
type: "Automation"
github_url: "https://github.com/Rangga056/dutrans"
image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200"
---

### The Challenge
Data processing for survey labels was a manual, time-consuming process that bottlenecked operational speed. The goal was to automate the normalization and labeling of survey data at scale.

### The Solution
I engineered an end-to-end automation pipeline using **n8n** and **Python**.

1.  **Ingestion:** Automated triggers to pull raw survey data from Google Sheets.
2.  **Processing:** Python-based AI Agents analyzed text context using NLP models.
3.  **Labeling:** Unsupervised clustering to auto-label categories.
4.  **Intelligent Interaction:** Integrated a RAG (Retrieval-Augmented Generation) system to power a chatbot that could query this data in real-time.

### Results
- **60% Increase** in operational efficiency.
- Reduced manual labeling errors by **40%**.
- Provided a real-time intelligent query interface for stakeholders.
