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
      type: "Preprint",
      year: 2026,
      title: "Hydrogel stiffness tunes T-cell infiltration in a 3D tumour spheroid model",
      authors: ["K. Saravenen", "P. Lindqvist", "S. Whitfield"],
      venue: "bioRxiv (placeholder preprint)",
      details: "",
      doi: "10.0000/example.2026.preprint-02",
      pdf: "documents/paper-02-hydrogel-spheroid.pdf",
      summary: "Softer matrices let T cells reach the spheroid core; stiffer ones keep them at the edge.",
      abstract: "Tumour stiffness is a barrier to immune infiltration, yet few in vitro models let stiffness be varied independently of composition. We embedded tumour spheroids in tunable polyethylene glycol hydrogels spanning 0.5 to 8 kPa and tracked T-cell movement by live imaging. Infiltration depth fell sharply above 4 kPa, and the effect was partly reversed by a matrix-softening enzyme.",
      tags: ["biomaterials", "T cells", "spheroids", "hydrogel"]
    },
    {
      type: "Conference paper",
      year: 2025,
      title: "Automated nuclear segmentation in low-contrast histology images using a lightweight U-Net",
      authors: ["R. Tanaka", "K. Saravenen"],
      venue: "Proceedings of the Example Symposium on Biomedical Imaging",
      details: "pp. 88–93",
      doi: "10.0000/example.2025.symp-31",
      pdf: "documents/paper-03-nuclear-segmentation.pdf",
      summary: "A small segmentation model that runs on a laptop and holds up on faint, unevenly stained slides.",
      abstract: "Nuclear segmentation underpins most quantitative histology, but stain variation and low contrast reduce accuracy of standard tools. We trained a lightweight U-Net with stain-augmentation on 1,200 annotated fields. It matched a larger baseline on well-stained slides and improved the F1 score by 9 percentage points on low-contrast slides, with a tenfold faster inference time.",
      tags: ["deep learning", "histology", "image analysis"]
    },
    {
      type: "Review",
      year: 2025,
      title: "Extracellular vesicles as carriers of immune signals: a review of isolation methods",
      authors: ["K. Saravenen", "L. Okafor"],
      venue: "Example Reviews in Cell Biology",
      details: "9(2): 45–67",
      doi: "10.0000/example.2025.rev-07",
      pdf: "documents/paper-04-vesicle-review.pdf",
      summary: "How ultracentrifugation, size-exclusion chromatography and immunocapture compare, and what each one costs you.",
      abstract: "Extracellular vesicles transport proteins and nucleic acids between immune cells, and the method used to isolate them shapes what is measured. This review compares ultracentrifugation, size-exclusion chromatography, precipitation and immunocapture in terms of yield, purity and reproducibility, and proposes a minimal reporting checklist for immunology studies.",
      tags: ["extracellular vesicles", "review", "methods"]
    },
    {
      type: "Journal article",
      year: 2025,
      title: "Micro-CT quantification of bone remodelling around 3D-printed titanium scaffolds",
      authors: ["S. Whitfield", "K. Saravenen", "J. Adeyemi"],
      venue: "Placeholder Biomaterials Letters",
      details: "7(1): e012",
      doi: "10.0000/example.2025.bml-012",
      pdf: "documents/paper-05-microct-scaffolds.pdf",
      summary: "A repeatable micro-CT workflow for measuring new bone growth into porous implants.",
      abstract: "Porous titanium scaffolds promote bone ingrowth, but comparing designs requires consistent quantification. We describe a micro-CT workflow covering scan settings, thresholding and region selection, and apply it to four lattice geometries in a rat femoral defect model. Gyroid lattices showed the highest bone volume fraction at 12 weeks.",
      tags: ["micro-CT", "bone", "implants", "biomaterials"]
    },
    {
      type: "Journal article",
      year: 2024,
      title: "Sex differences in microglial response after mild traumatic brain injury in mice",
      authors: ["J. Adeyemi", "K. Saravenen", "K. Sørensen"],
      venue: "Example Neuroimmunology Reports",
      details: "3: 100–112",
      doi: "10.0000/example.2024.nir-003",
      pdf: "documents/paper-06-microglia-tbi.pdf",
      summary: "Male and female mice showed different microglial activation timelines after the same mild injury.",
      abstract: "Sex is rarely analysed as a biological variable in traumatic brain injury research. Using morphological analysis of microglia at 1, 7 and 28 days after mild injury, we found earlier activation and faster resolution in females, while males showed prolonged activation at 28 days. These differences were not explained by injury severity.",
      tags: ["microglia", "neuroimmunology", "brain injury"]
    }
  ],

  articles: [
    {
      title: "What a tumour's neighbours tell us about cancer",
      outlet: "The Example Science Review",
      kind: "Feature",
      date: "2026-06-12",
      minutes: 6,
      url: "https://example.com/articles/tumour-neighbours",
      summary: "Why researchers are looking beyond cancer cells to the immune cells and tissue that surround them."
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
      title: "Peer review, explained for first-years",
      outlet: "University of Example Biosciences Blog",
      kind: "Explainer",
      date: "2025-11-19",
      minutes: 5,
      url: "https://example.com/articles/peer-review",
      summary: "What reviewers actually look for, and why a rejection is rarely the end of a paper."
    },
    {
      title: "Why we still can't 3D-print a kidney",
      outlet: "The Example Science Review",
      kind: "Feature",
      date: "2025-04-08",
      minutes: 7,
      url: "https://example.com/articles/print-a-kidney",
      summary: "The engineering problem that matters most is not the printing but keeping the cells alive."
    }
  ],

  posters: [
    {
      kind: "Poster",
      title: "Macrophage polarisation across tumour regions",
      event: "Example Cancer Research Student Conference",
      location: "Example City",
      date: "2026-04",
      award: "Best undergraduate poster",
      file: "documents/poster-01-macrophage-polarisation.pdf"
    },
    {
      kind: "Oral talk",
      title: "Stiff or soft: tuning T-cell entry into spheroids",
      event: "University of Example Research Showcase",
      location: "University of Example",
      date: "2026-06",
      award: "",
      file: "documents/slides-01-stiff-or-soft.pdf"
    },
    {
      kind: "Poster",
      title: "Lightweight nuclear segmentation for histology",
      event: "Example Symposium on Biomedical Imaging",
      location: "Example City",
      date: "2025-09",
      award: "",
      file: "documents/poster-02-nuclear-segmentation.pdf"
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
