
import { Publication, NewsItem, Experience, Award, SocialLink, Author, ProfessionalActivity } from './types';

// --- Helper to easily create authors ---
const me: Author = { name: "Lei Ke", isMe: true };
const coAuthor = (name: string, note?: string): Author => ({ name, isMe: false, note });

export const PROFILE = {
  name: "Lei Ke",
  title: "Senior Researcher",
  affiliation: "Tencent AI Seattle",
  university: "", 
  email: "keleiwhu [at] gmail.com", 
  bio: `I am a Senior Research Scientist in {{LINK|Tencent AI, Seattle Lab|https://www.tencent.com/en-us/index.html}}. My primary research interest lies in building multimodal foundation systems, especially the visual understanding, reasoning, and generation. 
  
  Previously, I worked as a Postdoctoral Research Associate at Computer Science of {{LINK|Carnegie Mellon University|https://www.ml.cmu.edu/}} with {{LINK|Katerina Fragkiadaki|https://www.cs.cmu.edu/~katef/}} and in the Computer Vision Lab of {{LINK|ETH Zurich|https://ethz.ch/en.html}}. I obtained my Ph.D. degree from {{LINK|CSE Department|https://www.cse.ust.hk/}} at {{LINK|HKUST|https://www.ust.hk/}} in mid 2023, supervised by {{LINK|Chi-Keung Tang|http://home.cse.ust.hk/~cktang/bio.html}} and {{LINK|Yu-Wing Tai|https://yuwingtai.github.io/}}. During the PhD journey, I also spent two years as a visiting scholar at ETH Zurich. I received my B.E. degree from the school of computer science at {{LINK|Wuhan University|https://en.wikipedia.org/wiki/Wuhan_University}}. My opensource projects obtains over 10K+ GitHub stars.`,
  avatarUrl: "image/kelei_portrait_small.jpg", 
  location: "Seattle, WA"
};

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Google Scholar", url: "https://scholar.google.com/citations?user=WseeNrUAAAAJ&hl=en", icon: "scholar" },
  { platform: "GitHub", url: "https://github.com/lkeab/", icon: "github" },
  { platform: "Twitter/X", url: "https://x.com/leike_lk/", icon: "twitter" },
  { platform: "Email", url: "mailto:keleiwhu@gmail.com", icon: "email" },
];

export const NEWS: NewsItem[] = [
  { id: 'n1', date: "2025.08", content: "We are organizing workshop Generating Digital Twins from Images and Videos at ICCV 2025.", link: "https://awesomedigitaltwin.github.io/2025_ICCV.html" },
  { id: 'n2', date: "2025.08", content: "I will serve as an Area Chair at ICLR 2026." },
  { id: 'n3', date: "2025.03", content: "I will serve as an Area Chair at NeurIPS 2025." },
  { id: 'n4', date: "2024.11", content: "Invited guest lecture at Texas A&M University on Vision Foundation Model." },
  { id: 'n5', date: "2024.04", content: "Joined CMU as a postdoc to work with Prof. Katerina Fragkiadaki, and if you're passionate about vision / robotics with extensive research experience, feel free to reach out for research collaboration!" },
  { id: 'n6', date: "2023.11", content: "We released the Gaussian Grouping project.", link: "https://github.com/lkeab/gaussian-grouping" },
  { id: 'n7', date: "2023.11", content: "Talks on Scene Understanding with Vision Foundation Models at Stanford SVL and MARVL." },
  { id: 'n8', date: "2023.06", content: "We released the HQ-SAM and SAM-PT projects.", link: "https://github.com/SysCV/sam-hq" },
  { id: 'n9', date: "2023.06", content: "Technical committee of VOTS 2023 Challenge. The workshop will take place on October 3rd @ICCV2023." },
  { id: 'n10', date: "2023.05", content: "Passed the PhD thesis defense and become a Dr.!" },
  { id: 'n11', date: "2023.03", content: "Mask-free VIS is accepted in CVPR 2023.", link: "https://arxiv.org/abs/2303.15904" },
  { id: 'n12', date: "2023.01", content: "BCNet is accepted in TPAMI 2023.", link: "https://ieeexplore.ieee.org/document/10048550" },
  { id: 'n13', date: "2022.07", content: "Video Mask Transfiner on high-quality VIS is accepted by ECCV 2022! We released the HQ-YTVIS dataset.", link: "https://arxiv.org/abs/2207.14012" },
  { id: 'n14', date: "2022.03", content: "PCAN serves as the baseline in BDD100K MOTS challenge at CVPR 2022 Workshop on Autonomous Driving." },
  { id: 'n15', date: "2022.03", content: "Mask Transfiner on high-quality instance segmentation is accepted by CVPR 2022!", link: "https://arxiv.org/abs/2111.13673" },
  { id: 'n16', date: "2022.03", content: "Invited talk on PCAN at AI Time Seminar, Tsinghua Univ (Virtual)." },
  { id: 'n17', date: "2022.02", content: "Invited talk on Mutltiple Object Tracking & Segmentation in Autonomous Driving at TechBeat." },
  { id: 'n18', date: "2021.12", content: "Invited spotlight talk for PCAN at SwissTech Convention Center, EPFL." },
  { id: 'n19', date: "2021.10", content: "PCAN for Multiple Object Tracking and Segmentation is accepted by NeurIPS 2021 as spotlight." },
  { id: 'n20', date: "2021.07", content: "Our paper on occlusion-aware video inpainting accepted by ICCV 2021." },
  { id: 'n21', date: "2021.01", content: "I joined CVL at ETHz as a visiting PhD student supervised by Prof.Fisher Yu and Dr.Martin Danelljan." },
  { id: 'n22', date: "2021.03", content: "Our paper BCNet on occlusion-aware instance segmentation accepted by CVPR 2021!" },
  { id: 'n23', date: "2021.10", content: "Passed the PhD Qualifying Exam." },
  { id: 'n24', date: "2020.07", content: "Two papers (GSNet and CPMask) accepted by ECCV 2020." },
  { id: 'n25', date: "2020.02", content: "Our paper on 3D human pose estimation has been accepted by CVPR 2020 for oral presentation." },
  { id: 'n26', date: "2019.07", content: "Our paper on image captioning accepted by ICCV 2019." },
  { id: 'n27', date: "2019.05", content: "I will start my Ph.D study at CSE, HKUST this autumn." },
  { id: 'n28', date: "2019.02", content: "Our paper on video captioning accepted by CVPR 2019." }
];

const CATEGORY_SEGMENTATION = "Segmentation and Tracking";
const CATEGORY_3D = "3D Reconstruction, Tracking and Generation";

export const PUBLICATIONS: Publication[] = [
  {
    id: 'p1',
    title: "Segment Anything in High Quality",
    authors: [me, coAuthor("Mingqiao Ye*"), coAuthor("Martin Danelljan"), coAuthor("Yifan Liu"), coAuthor("Yu-Wing Tai"), coAuthor("Chi-Keung Tang"), coAuthor("Fisher Yu")],
    venue: "NeurIPS 2023",
    year: 2023,
    // Using {{LINK|text|url}} marker to allow highlighting in the component
    abstract: "We propose HQ-SAM to upgrade SAM for high-quality zero-shot segmentation. {{LINK|HQ-SAM is available in Huggingface Transformers.|https://huggingface.co/docs/transformers/main/model_doc/sam_hq}}",
    tags: ["Segmentation", "Foundation Models"],
    category: CATEGORY_SEGMENTATION,
    links: { 
      pdf: "https://arxiv.org/abs/2306.01567", 
      projectPage: "https://github.com/SysCV/sam-hq", 
      huggingface: "https://huggingface.co/docs/transformers/main/model_doc/sam_hq"
    },
    githubRepo: "SysCV/sam-hq",
    thumbnail: "images/hq-sam.gif"
  },
  {
    id: 'p2',
    title: "Gaussian Grouping: Segment and Edit Anything in 3D Scenes",
    authors: [coAuthor("Mingqiao Ye"), coAuthor("Martin Danelljan"), coAuthor("Fisher Yu"), { name: "Lei Ke", isMe: true, note: "(Project Lead)" }],
    venue: "ECCV 2024",
    year: 2024,
    abstract: "Gaussian Grouping for open-world 3D Anything reconstruction, segmentation and editing.",
    tags: ["3D", "Gaussian Splatting"],
    category: CATEGORY_SEGMENTATION,
    links: { 
      pdf: "https://arxiv.org/abs/2312.00732", 
      projectPage: "https://github.com/lkeab/gaussian-grouping", 
      website: "https://ymq2017.github.io/gaussian-grouping/" 
    },
    githubRepo: "lkeab/gaussian-grouping",
    thumbnail: "images/gaussian_grouping.gif"
  },
  {
    id: 'p3',
    title: "Matching Anything By Segmenting Anything",
    authors: [coAuthor("Siyuan Li"), me, coAuthor("Martin Danelljan"), coAuthor("Luigi Piccinelli"), coAuthor("Mattia Segu"), coAuthor("Luc Van Gool"), coAuthor("Fisher Yu")],
    venue: "CVPR 2024",
    year: 2024,
    abstract: "MASA provides a universal instance appearance model for matching any objects in any domain. Highlight (~3% acceptance rate)",
    tags: ["Tracking", "Segmentation"],
    category: CATEGORY_SEGMENTATION,
    links: { 
      pdf: "https://arxiv.org/abs/2406.04221", 
      projectPage: "https://matchinganything.github.io/" 
    },
    githubRepo: "siyuanliii/masa",
    thumbnail: "images/masa.gif"
  },
  {
    id: 'p4',
    title: "Segment Anything Meets Point Tracking",
    authors: [coAuthor("Frano Rajič"), me, coAuthor("Yu-Wing Tai"), coAuthor("Chi-Keung Tang"), coAuthor("Martin Danelljan"), coAuthor("Fisher Yu")],
    venue: "arXiv",
    year: "Preprint",
    abstract: "We propose SAM-PT to extend SAM to zero-shot video segmentation with point-based tracking. SAM-PT receives 500+ Github stars in one week.",
    tags: ["Video Segmentation", "Tracking"],
    category: CATEGORY_SEGMENTATION,
    links: { 
      pdf: "https://arxiv.org/abs/2307.01197", 
      projectPage: "https://www.vis.xyz/pub/sam-pt/" 
    },
    githubRepo: "SysCV/sam-pt",
    thumbnail: "images/sam-pt-new.gif"
  },
  {
    id: 'p5',
    title: "Mask Transfiner for High-Quality Instance Segmentation",
    authors: [me, coAuthor("Martin Danelljan"), coAuthor("Xia Li"), coAuthor("Yu-Wing Tai"), coAuthor("Chi-Keung Tang"), coAuthor("Fisher Yu")],
    venue: "CVPR 2022",
    year: 2022,
    abstract: "An efficient transformer-based method for highly accurate instance segmentation. Transfiner receives 300+ Github stars in 3 months.",
    tags: ["Segmentation", "Transformers"],
    category: CATEGORY_SEGMENTATION,
    links: { 
      pdf: "https://openaccess.thecvf.com/content/CVPR2022/papers/Ke_Mask_Transfiner_for_High-Quality_Instance_Segmentation_CVPR_2022_paper.pdf", 
      arxiv: "https://arxiv.org/abs/2111.13673", 
      projectPage: "https://github.com/SysCV/transfiner", 
      video: "https://www.youtube.com/watch?v=YCaUclQQFoM", 
      website: "https://www.vis.xyz/pub/transfiner/",
      zhihu: "https://zhuanlan.zhihu.com/p/491030678"
    },
    githubRepo: "SysCV/transfiner",
    thumbnail: "images/cvpr22_transfiner-min.png"
  },
  {
    id: 'p6',
    title: "Prototypical Cross-Attention Networks for Multiple Object Tracking and Segmentation",
    authors: [me, coAuthor("Xia Li"), coAuthor("Martin Danelljan"), coAuthor("Yu-Wing Tai"), coAuthor("Chi-Keung Tang"), coAuthor("Fisher Yu")],
    venue: "NeurIPS 2021",
    year: 2021,
    abstract: "Spotlight (3% acceptance rate). PCAN receives 200+ Github stars in one month.",
    tags: ["Tracking", "Segmentation"],
    category: CATEGORY_SEGMENTATION,
    links: { 
      pdf: "https://papers.nips.cc/paper/2021/file/093f65e080a295f8076b1c5722a46aa2-Paper.pdf", 
      arxiv: "https://arxiv.org/abs/2106.11958", 
      projectPage: "https://www.vis.xyz/pub/pcan/", 
      video: "https://www.youtube.com/watch?v=hhAC2H0fmP8", 
      zhihu: "https://zhuanlan.zhihu.com/p/445457150" 
    },
    githubRepo: "SysCV/pcan",
    thumbnail: "images/pcan_page_demo.gif"
  },
  {
    id: 'p7',
    title: "Deep Occlusion-Aware Instance Segmentation with Overlapping BiLayers",
    authors: [me, coAuthor("Yu-Wing Tai"), coAuthor("Chi-Keung Tang")],
    venue: "CVPR 2021 & TPAMI 2023",
    year: 2023,
    abstract: "Instance segmentation with bilayer decoupling structure for occluder & occludee. BCNet receives 300+ Github stars in 6 months.",
    tags: ["Instance Segmentation", "Occlusion"],
    category: CATEGORY_SEGMENTATION,
    links: { 
      pdf: "https://openaccess.thecvf.com/content/CVPR2021/papers/Ke_Deep_Occlusion-Aware_Instance_Segmentation_With_Overlapping_BiLayers_CVPR_2021_paper.pdf", 
      arxiv: "https://arxiv.org/abs/2103.12340", 
      projectPage: "https://github.com/lkeab/BCNet", 
      zhihu: "https://zhuanlan.zhihu.com/p/378269087", 
      video: "https://www.youtube.com/watch?v=iHlGJppJGiQ" 
    },
    githubRepo: "lkeab/BCNet",
    thumbnail: "images/cvpr2021_bcn.png"
  },
  {
    id: 'p8',
    title: "TAPIP3D: Tracking Any Point in Persistent 3D Geometry",
    authors: [coAuthor("Bowei Zhang*"), { name: "Lei Ke*", isMe: true }, coAuthor("Adam W. Harley"), coAuthor("Katerina Fragkiadaki")],
    venue: "NeurIPS 2025",
    year: 2025,
    abstract: "TAPIP3D: Long-term feed-forward 3D point tracking in persistent 3D point maps.",
    tags: ["3D Tracking", "Geometry"],
    category: CATEGORY_3D,
    links: { 
      pdf: "https://arxiv.org/abs/2504.14717", 
      projectPage: "https://tapip3d.github.io/" 
    },
    githubRepo: "zbw001/TAPIP3D",
    thumbnail: "images/tapip3d_demo.gif"
  },
  {
    id: 'p9',
    title: "Video Depth without Video Models",
    authors: [coAuthor("Bingxin Ke"), coAuthor("Dominik Narnhofer"), coAuthor("Shengyu Huang"), me, coAuthor("Torben Peters"), coAuthor("Katerina Fragkiadaki"), coAuthor("Anton Obukhov"), coAuthor("Konrad Schindler")],
    venue: "CVPR 2025",
    year: 2025,
    abstract: "RollingDepth: A universal monocular depth estimator for arbitrarily long videos.",
    tags: ["Depth Estimation", "Video"],
    category: CATEGORY_3D,
    links: { 
      pdf: "http://arxiv.org/abs/2411.19189", 
      projectPage: "https://rollingdepth.github.io/", 
      huggingface: "https://huggingface.co/spaces/prs-eth/rollingdepth" 
    },
    githubRepo: "prs-eth/rollingdepth",
    thumbnail: "images/rollingdepth.gif"
  },
  {
    id: 'p10',
    title: "DreamScene4D: Dynamic Multi-Object Scene Generation from Monocular Videos",
    authors: [coAuthor("Wen-Hsuan Chu*"), { name: "Lei Ke*", isMe: true }, coAuthor("Katerina Fragkiadaki")],
    venue: "NeurIPS 2024",
    year: 2024,
    abstract: "DreamScene4D for generating 3D dynamic scenes of multiple objects from monocular videos.",
    tags: ["3D Generation", "Video"],
    category: CATEGORY_3D,
    links: { 
      pdf: "https://arxiv.org/abs/2405.02280", 
      projectPage: "https://github.com/dreamscene4d/dreamscene4d", 
      website: "https://dreamscene4d.github.io/" 
    },
    githubRepo: "dreamscene4d/dreamscene4d",
    thumbnail: "images/dreamscene4d.gif"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'e0',
    role: "Senior Research Scientist",
    institution: "Tencent AI Seattle",
    period: "2025.03 — Current",
    description: "",
    logo: "https://avatars.githubusercontent.com/u/54961825?v=4"
  },
  {
    id: 'e1',
    role: "Postdoc",
    institution: "MLD, CMU",
    period: "2024.04 — 2025.03",
    description: "Advisor: {{LINK|Prof. Katerina Fragkiadaki|https://www.cs.cmu.edu/~katef/}}",
    logo: "images/logo-cmu.jpeg"
  },
  {
    id: 'e2',
    role: "Postdoc",
    institution: "CVL, ETHz",
    period: "2023.07 — 2024.03",
    description: "",
    logo: "images/eth.png"
  },
  {
    id: 'e3',
    role: "Visiting PhD student",
    institution: "CVL, ETHz",
    period: "2021.01 — 2023.03",
    description: "",
    logo: "images/eth.png"
  },
  {
    id: 'e4',
    role: "HKUST Computer Vision Research Assistant",
    institution: "HKUST",
    period: "2019.05 — 2023.05",
    description: "",
    logo: "images/ust.png"
  },
  {
    id: 'e5',
    role: "Computer Vision Research Intern",
    institution: "Tencent Youtu X-lab",
    period: "2017.11 — 2019.11",
    description: "Worked closely with Wenjie Pei",
    logo: "images/logo-youtu.png"
  },
  {
    id: 'e6',
    role: "Engineering Intern",
    institution: "Alibaba",
    period: "2017.05 — 2017.10",
    logo: "images/logo-alibaba.png"
  },
  {
    id: 'e7',
    role: "Undergraduate Research Assistant",
    institution: "Wuhan University",
    period: "2016.05 — 2017.02",
    logo: "images/logo-whu.png"
  }
];

export const AWARDS: Award[] = [
  { id: 'a1', year: "2023", title: "CVPR Doctoral Consortium Awards (13% success rate)", description: "Supervised by Michael Maire" },
  { id: 'a2', year: "2022", title: "Most Popular Speakers in TechBeat" },
  { id: 'a3', year: "2022", title: "Research Travel Grant, ETH Zurich" },
  { id: 'a4', year: "2019", title: "Research Travel Grant, HKUST" },
  { id: 'a5', year: "2019-Now", title: "Postgraduate Studentship, HKUST" },
  { id: 'a6', year: "2017", title: "COMAP's Mathematical Contest in Modeling, Honorable prize" },
  { id: 'a7', year: "2015-2017", title: "Excellent Student Scholarship, Wuhan University" },
  { id: 'a8', year: "2016", title: "National Software Design Competition, Second Prize" },
  { id: 'a9', year: "2016", title: "National Inspirational Scholarship, Wuhan University" },
  { id: 'a10', year: "2015", title: "National College Students' Mathematics Competition, Third Prize" }
];

export const ACTIVITIES: ProfessionalActivity[] = [
  {
    category: "Area Chair",
    items: ["NeurIPS 2025", "ICLR 2026"]
  },
  {
    category: "Conference Review",
    items: ["CVPR 2020/2021/2022/2023", "ICCV 2021", "ECCV 2022", "NeurIPS 2020/2021/2022/2023", "ICML 2021/2022/2023", "ICLR 2022/2023", "ICRA 2022"]
  },
  {
    category: "Journal Review",
    items: ["TPAMI", "IJCV", "RA-L"]
  },
  {
    category: "Teaching Assistant",
    items: ["Computer Graphics (COMP4411), Spring, 2019-2020", "Introduction to Object-oriented Programming (COMP2011), Fall, 2020-2021"]
  }
];
