/* ==========================================================================
   EDIT THIS FILE to update your portfolio.
   Everything below is placeholder content. Replace the text, then drop your
   real PDFs into the documents/ folder and point `pdf` / `file` at them.

   - me:           your name exactly as it appears in the author lists (it is bolded)
   - type:         "Journal article", "Preprint", "Conference paper" or "Review"
                   (any new type you invent gets its own filter button automatically)
   - doi:          the DOI without the https://doi.org/ prefix
   - articles:     dates use YYYY-MM-DD
   - posters:      dates use YYYY-MM; kind is "Poster", "Oral talk" or "Lightning talk"
   ========================================================================== */

window.PORTFOLIO = {
  me: "K. Saravenen",

  publications: [

    {
      type: "Journal article",
      year: 2026,
      title: "Spatial mapping of macrophage polarisation in the tumour microenvironment of triple-negative breast cancer",
      authors: ["K. Saravenen", "L. Okafor", "R. Tanaka", "S. Whitfield"],
      venue: "Journal of Example Oncology",
      details: "14(3): 211–228",
      doi: "10.0000/example.2026.014",
      pdf: "documents/paper-01-macrophage-polarisation.pdf",
      summary: "A tissue-level map showing where pro- and anti-tumour macrophages sit relative to blood vessels and tumour nests.",
      abstract: "Macrophages can either restrain or support tumour growth depending on their polarisation state, but where these states occur inside a tumour is poorly defined. We combined multiplex immunofluorescence with automated cell classification across 48 tumour sections. Anti-inflammatory macrophages clustered within 60 µm of vessels, while pro-inflammatory cells were enriched at the invasive margin. These spatial patterns were more strongly associated with outcome than overall macrophage density.",
      tags: ["macrophage", "tumour microenvironment", "immunofluorescence", "breast cancer"]
    },
    {
      type: "Academic Coursework",
      year: 2025,
      title: "Investigation of the Antibacterial Effects of Trimethoprim and Sulfamethoxazole Against E. coli",
      authors: ["K. Saravenen"],
      venue: "York University, BSc in Biomedical Sciences",
      details: "tbd",
      doi: "tbd",
      pdf: "documents/TMP-SMX_Ecoli_Academic_Report_(Polished).pdf",
      summary: "A lab report on the antibacterial effects of trimethoprim and sulfamethoxazole against E. coli.",
      abstract: "tbd",
      tags: ["antibiotics", "E. coli", "microbiology", "lab report"]
    }
  ],

  articles: [
    {
      title: "Second Brain Frotier: Can rewiring the gut microbiome help prevent Alzheimer's disease?",
      outlet: "TBD",
      kind: "Feature",
      date: "tbd",
      minutes: 15,
      url: "tbd",
      summary: "How the gut microbiome may influence neurodegeneration, and what we can do about it."
    },
    {
      title: "How I learned to read a paper in 20 minutes",
      outlet: "Lab Notebook (personal blog)",
      kind: "Blog",
      date: "2026-03-02",
      minutes: 4,
      url: "https://example.com/articles/read-a-paper",
      summary: "A practical routine for first-years: figures first, methods second, discussion last."
    },
    {
      title: "Molecular Photocopying: How Polymerase Chain Reaction (PCR) Amplifies the Code of Life",
      outlet: "TBD",
      kind: "Explainer",
      date: "TBD",
      minutes: 8,
      url: "tbd",
      summary: "A clear explanation of how PCR works, its applications, and its impact on modern biology."
    }
  ],

  posters: [
    {
      kind: "Poster",
      title: "Comparative efficacy of ICSI versus conventional IVF.",
      event: "Tutoring",
      location: "Welwyn Garden City, UK",
      date: "2026-09",
      award: "",
      file: "documents/ICSI_vs_IVF_poster.pdf"
    },
    {
      kind: "Poster",
      title: "River Water Quality Assessment",
      event: "York University Research Showcase",
      location: "York University",
      date: "2025-11",
      award: "Academic 1st Class",
      file: "documents/River_Water_Quality_Poster.pdf"
    },
    {
      kind: "Lightning talk",
      title: "Three minutes on extracellular vesicles",
      event: "Three Minute Science Night",
      location: "University of Example",
      date: "2025-03",
      award: "Audience choice",
      file: "documents/slides-02-vesicles.pdf"
    }
  ]
};
