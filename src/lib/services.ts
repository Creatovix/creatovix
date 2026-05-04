// src/lib/services.ts
export interface Service {
  id: number;
  slug: string;
  number: string;
  icon: string;
  title: string;
  h1: string;
  tagline: string;
  accent: string;
  accentRgb: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    location?: string;
  };
  content: {
    whatIs: string;
    benefits: { title: string; description: string; icon?: string }[];
    process: { step: number; title: string; description: string }[];
    faqs: { question: string; answer: string }[];
  };
  images: {
    hero: { src: string; alt: string; width: number; height: number };
    gallery?: { src: string; alt: string }[];
  };
}

export const SERVICES: Service[] = [
  {
    id: 1,
    slug: "web-design",
    number: "01",
    icon: "◈",
    title: "Web Design",
    h1: "Web Design Services for Small Businesses | Creatovix",
    tagline: "Websites that convert",
    accent: "#ff4d00",
    accentRgb: "255,77,0",
    problem: "Most websites look generic, load slowly, and fail to communicate value — costing you leads every day.",
    solution: "We design high-converting, pixel-perfect websites tailored to your brand — built to guide visitors toward action.",
    result: "Clients typically see 2–3× improvement in conversion rates and measurable drop in bounce within 30 days.",
    features: ["Responsive & mobile-first", "Conversion-optimized layouts", "Brand-aligned UI system", "Lightning fast load times"],
    seo: {
      title: "Web Design Services | Creatovix",
      description: "Looking for professional web design services? Creatovix builds high-converting, SEO-optimized websites for businesses globally. Get a free quote.",
      keywords: ["web design services", "freelance web designer", "small business website", "conversion optimization", "responsive web design", "UK web designer"],
      location: "UK & Remote"
    },
    content: {
      whatIs: `
        <p><strong>Web design services</strong> at Creatovix go far beyond making your site "look pretty." We engineer digital experiences that <strong>convert visitors into customers</strong>, reduce bounce rates, and strengthen your brand authority.</p>
        
        <p>In today's competitive landscape, your website is often the first—and sometimes only—opportunity to make an impression. Studies show that <strong>75% of users judge a company's credibility based on its website design</strong>. If your site loads slowly, looks outdated, or confuses visitors, you're losing revenue before a single conversation begins.</p>
        
        <p>Our web design process combines <strong>strategic UX research</strong>, <strong>conversion-focused UI design</strong>, and <strong>technical performance optimization</strong> to deliver websites that don't just look great—they drive measurable business growth.</p>
        
        <h3>Who is our web design service for?</h3>
        <ul>
          <li><strong>Small business owners</strong> who need a professional online presence without enterprise complexity</li>
          <li><strong>Startups</strong> launching their first product or service and needing to establish trust quickly</li>
          <li><strong>Service-based professionals</strong> (consultants, coaches, agencies) who rely on their website to generate leads</li>
          <li><strong>E-commerce brands</strong> looking to improve product presentation and checkout conversion</li>
        </ul>
        
        <p>Whether you need a complete website redesign or a high-converting landing page, we tailor our approach to your specific business goals, audience, and budget. Our process is collaborative, transparent, and focused on delivering results you can measure—not just aesthetics you can admire.</p>
        
        <h3>What makes our web design different?</h3>
        <p>Unlike agencies that use generic templates or designers who prioritize art over function, we start every project with your business objectives. We ask: What action do you want visitors to take? What objections might they have? What makes you different from competitors? Then we design every pixel to answer those questions and guide users toward conversion.</p>
      `,
      benefits: [
        {
          title: "Conversion-Optimized Layouts",
          description: "Every element is strategically placed to guide visitors toward your desired action—whether that's booking a call, making a purchase, or downloading a resource. We use heatmaps, A/B testing principles, and behavioral psychology to maximize conversions.",
          icon: "🎯"
        },
        {
          title: "Mobile-First Responsive Design",
          description: "With over 60% of web traffic coming from mobile devices, we design for small screens first, then scale up. Your site will look and perform flawlessly on phones, tablets, and desktops—no compromises.",
          icon: "📱"
        },
        {
          title: "SEO-Ready Architecture",
          description: "Clean code, semantic HTML, fast load times, and proper heading structure give your site a strong foundation for search engine visibility. We build with Google's Core Web Vitals in mind from day one.",
          icon: "🔍"
        },
        {
          title: "Brand-Aligned Visual System",
          description: "Your website should feel like a natural extension of your brand. We develop custom UI components, color systems, and typography that reinforce your identity and build trust with your audience.",
          icon: "🎨"
        },
        {
          title: "Lightning-Fast Performance",
          description: "Slow sites kill conversions. We optimize images, minify code, leverage caching, and use modern hosting to ensure your site loads in under 2 seconds—critical for both users and SEO rankings.",
          icon: "⚡"
        }
      ],
      process: [
        {
          step: 1,
          title: "Discovery & Strategy",
          description: "We start with a deep-dive session to understand your business goals, target audience, competitors, and key differentiators. You'll receive a customized project roadmap with clear milestones, deliverables, and timelines."
        },
        {
          step: 2,
          title: "Wireframes & UX Design",
          description: "Before any visual design begins, we map out user journeys and create low-fidelity wireframes. This ensures the structure supports your conversion goals before we invest in aesthetics. You'll review and approve the flow before we move forward."
        },
        {
          step: 3,
          title: "Visual Design & Prototyping",
          description: "Our designers craft pixel-perfect mockups in Figma, incorporating your brand guidelines. You'll review interactive prototypes and provide feedback before development begins. We iterate until you're 100% satisfied."
        },
        {
          step: 4,
          title: "Development & QA",
          description: "Our developers build your site using modern frameworks (Next.js, React) with clean, maintainable code. Every page undergoes rigorous testing across devices, browsers, and performance benchmarks. We fix bugs before you see them."
        },
        {
          step: 5,
          title: "Launch & Optimization",
          description: "We handle deployment, DNS configuration, and post-launch monitoring. Plus, you'll receive analytics setup and a 30-day optimization window to fine-tune based on real user data. Your success is our success."
        }
      ],
      faqs: [
        {
          question: "How long does a typical web design project take?",
          answer: "Most small business websites take 4-8 weeks from kickoff to launch, depending on complexity. We provide a detailed timeline during the discovery phase and keep you updated at every milestone. Rush options are available for urgent projects."
        },
        {
          question: "Do you work with existing brands or just startups?",
          answer: "We work with both! Whether you're refreshing an established brand or launching something new, we adapt our process to your needs. For rebrands, we ensure a smooth transition that preserves SEO equity and minimizes downtime."
        },
        {
          question: "Will my website be easy to update myself?",
          answer: "Yes. We build with user-friendly CMS options (like Sanity or Contentful) and provide training sessions. You'll be able to update text, images, and blog posts without touching code. We also offer ongoing support if you prefer to delegate updates."
        },
        {
          question: "What if I need ongoing support after launch?",
          answer: "We offer monthly retainers for maintenance, content updates, and performance monitoring. Many clients choose this option to ensure their site stays secure, fast, and aligned with evolving business goals. Plans start at £99/month."
        },
        {
          question: "Do you offer payment plans?",
          answer: "Yes. We understand cash flow matters for small businesses. We offer 50/50 split payments or 3-installment plans for projects over £2,000. Let's discuss what works for your budget during our initial consultation."
        },
        {
          question: "What happens if I'm not happy with the design?",
          answer: "Your satisfaction is guaranteed. We include two rounds of revisions in every project, and we won't consider a phase complete until you approve it. If we can't meet your expectations, we'll work with you to find a solution or provide a partial refund."
        }
      ]
    },
    images: {
      hero: {
        src: "/web-design.webp",
        alt: "Professional web design services for small businesses by Creatovix - conversion-optimized, mobile-first websites that drive results",
        width: 1200,
        height: 630
      },
      gallery: [
        { src: "/projects/proj-1.webp", alt: "Web design portfolio example: e-commerce site with clean product layout and intuitive navigation" },
        { src: "/projects/proj-3.webp", alt: "Web design portfolio example: service business homepage with clear CTAs and trust signals" },
        { src: "/projects/proj-5.webp", alt: "Web design portfolio example: responsive mobile view of client website showing perfect adaptation" }
      ]
    }
  },
  {
    id: 2,
    slug: "graphic-design",
    number: "02",
    icon: "✦",
    title: "Graphic Design",
    h1: "Graphic Design Services for Brand Identity | Creatovix",
    tagline: "Visuals that build trust",
    accent: "#00c8ff",
    accentRgb: "0,200,255",
    problem: "Inconsistent branding makes businesses look unreliable and forgettable, losing trust before a word is read.",
    solution: "We craft cohesive brand identities — logos, color systems, typography, and assets that work across every touchpoint.",
    result: "A strong visual identity increases perceived value, improves brand recall, and accelerates client trust-building.",
    features: ["Logo & brand identity", "Social media assets", "Marketing collateral", "Style guides & systems"],
    seo: {
      title: "Graphic Design Services | Creatovix",
      description: "Professional graphic design services for businesses. Logo design, brand identity & marketing collateral that build trust and recognition.",
      keywords: ["graphic design services", "brand identity designer", "logo design", "visual branding", "marketing collateral design", "UK graphic designer"],
      location: "UK & Remote"
    },
    content: {
      whatIs: `
        <p><strong>Graphic design services</strong> at Creatovix help small businesses build memorable, trustworthy brands through strategic visual communication. We don't just make things look good—we create visual systems that <strong>communicate your value</strong>, <strong>differentiate you from competitors</strong>, and <strong>build lasting connections</strong> with your audience.</p>
        
        <p>Your brand identity is more than a logo. It's the sum of every visual touchpoint: your color palette, typography, imagery style, iconography, and how these elements work together across your website, social media, packaging, and marketing materials. When these elements are inconsistent or poorly executed, your brand feels amateurish—even if your product or service is exceptional.</p>
        
        <p>Our graphic design process starts with deep discovery: Who is your ideal customer? What emotions do you want your brand to evoke? What makes you different? Then we translate those insights into a cohesive visual language that works everywhere your brand appears.</p>
        
        <h3>Who needs professional graphic design?</h3>
        <ul>
          <li><strong>New businesses</strong> launching their first brand identity and needing to establish credibility quickly</li>
          <li><strong>Established businesses</strong> refreshing outdated visuals to stay competitive and relevant</li>
          <li><strong>Service professionals</strong> (consultants, coaches, freelancers) who need polished materials to win clients</li>
          <li><strong>E-commerce brands</strong> requiring packaging, product photography direction, and social assets that convert</li>
        </ul>
        
        <p>Whether you need a complete brand identity system or specific assets like social media templates or sales decks, we deliver designs that are beautiful, functional, and strategically aligned with your business goals.</p>
      `,
      benefits: [
        {
          title: "Cohesive Brand Identity",
          description: "We create a complete visual system—logo, colors, typography, imagery guidelines—that works seamlessly across all platforms. Consistency builds recognition and trust, making your brand instantly identifiable.",
          icon: "🎨"
        },
        {
          title: "Strategic Visual Storytelling",
          description: "Every design choice communicates something about your brand. We ensure your visuals tell the right story: premium but approachable, innovative but reliable, playful but professional—whatever aligns with your positioning.",
          icon: "📖"
        },
        {
          title: "Versatile Asset Library",
          description: "Receive a comprehensive brand kit with logos in multiple formats, color codes, font files, icon sets, and templates for social media, presentations, and marketing materials. Everything you need to stay on-brand.",
          icon: "📦"
        },
        {
          title: "Print & Digital Ready",
          description: "All deliverables are optimized for their intended use: CMYK for print, RGB for digital, vector files for scalability, and web-optimized assets for fast loading. No more blurry logos or pixelated banners.",
          icon: "🖨️"
        },
        {
          title: "Future-Proof Design",
          description: "We design with growth in mind. Your brand identity will scale with your business, accommodating new products, markets, or services without requiring a complete redesign. Flexibility built in from day one.",
          icon: "🚀"
        }
      ],
      process: [
        {
          step: 1,
          title: "Brand Discovery Workshop",
          description: "We start with a collaborative session to understand your business, audience, competitors, and aspirations. You'll complete a brand questionnaire and we'll analyze your market position to inform the creative direction."
        },
        {
          step: 2,
          title: "Concept Development",
          description: "Our designers create 2-3 distinct visual directions based on your brief. Each concept includes logo variations, color palettes, and typography suggestions. You'll review and provide feedback to refine the chosen direction."
        },
        {
          step: 3,
          title: "System Expansion",
          description: "Once the core identity is approved, we expand it into a complete system: secondary logos, icon sets, pattern libraries, imagery guidelines, and application examples across business cards, social media, and marketing materials."
        },
        {
          step: 4,
          title: "Brand Guidelines Delivery",
          description: "You'll receive a comprehensive brand guidelines document (PDF + interactive web version) that explains how to use your brand assets correctly. This ensures consistency whether you're designing in-house or working with other freelancers."
        },
        {
          step: 5,
          title: "Asset Handoff & Support",
          description: "All final files are delivered in organized folders with clear naming conventions. We include a 30-day support window for any questions about implementation and offer ongoing design retainers for future asset creation."
        }
      ],
      faqs: [
        {
          question: "What's included in a brand identity package?",
          answer: "Our standard package includes: primary and secondary logos, color palette with hex/RGB/CMYK values, typography system with font files, icon set, pattern library, brand voice guidelines, and a comprehensive brand guidelines document. Social media templates and business card designs are available as add-ons."
        },
        {
          question: "How many revision rounds are included?",
          answer: "Every project includes two rounds of revisions at each major milestone (concept, system expansion, final delivery). We believe in getting it right, so if we haven't met your expectations after the included revisions, we'll work with you to find a solution."
        },
        {
          question: "Can you work with our existing brand elements?",
          answer: "Absolutely. If you have a logo or colors you love but need them expanded into a full system, we can build around your existing assets. We'll audit what works, identify gaps, and create a cohesive system that honors your brand heritage while elevating it for the future."
        },
        {
          question: "Do you provide source files?",
          answer: "Yes. You'll receive all source files (AI, EPS, Figma) plus export-ready formats (PNG, JPG, SVG, PDF). We believe you should own your brand assets completely, with no ongoing dependency on us for basic edits or exports."
        },
        {
          question: "How long does a brand identity project take?",
          answer: "Most brand identity projects take 3-6 weeks from kickoff to final delivery, depending on complexity and revision cycles. We provide a detailed timeline during discovery and keep you updated at every milestone. Rush options are available for urgent launches."
        },
        {
          question: "What if I need ongoing design work after the project?",
          answer: "Many clients choose our monthly design retainer for ongoing asset creation: social media graphics, email templates, presentation decks, or ad creatives. Retainers start at £199/month and include priority scheduling and discounted rates."
        }
      ]
    },
    images: {
      hero: {
        src: "/graphic-design.webp",
        alt: "Professional graphic design services for brand identity by Creatovix - logo design, visual systems, and marketing collateral that build trust",
        width: 1200,
        height: 630
      },
      gallery: [
        { src: "/projects/proj-2.webp", alt: "Graphic design portfolio: complete brand identity system with logo, colors, and typography" },
        { src: "/projects/proj-4.webp", alt: "Graphic design portfolio: social media asset templates for consistent brand presence" },
        { src: "/projects/proj-6.webp", alt: "Graphic design portfolio: marketing collateral including business cards and brochures" }
      ]
    }
  },
  {
    id: 3,
    slug: "web-development",
    number: "03",
    icon: "⬡",
    title: "Web Development",
    h1: "Web Development Services | Creatovix",
    tagline: "Code built to perform",
    accent: "#a855f7",
    accentRgb: "168,85,247",
    problem: "Slow, buggy, or poorly architected websites frustrate users and hurt SEO — both costing you revenue.",
    solution: "We build clean, scalable front-end and back-end solutions using modern frameworks with performance as a priority.",
    result: "Fast, stable applications with 99.9% uptime that scale seamlessly as your business grows.",
    features: ["Next.js & React", "TypeScript & clean code", "API integrations", "SEO & performance optimized"],
    seo: {
      title: "Web Development Services | Creatovix",
      description: "Professional web development services using Next.js, React & TypeScript. Fast, SEO-optimized, scalable applications for small businesses. Free consultation.",
      keywords: ["web development services", "Next.js developer", "React developer", "TypeScript development", "SEO web development", "UK web developer"],
      location: "UK & Remote"
    },
    content: {
      whatIs: `
        <p><strong>Web development services</strong> at Creatovix focus on building <strong>fast, reliable, and scalable</strong> digital products that drive business results. We don't just write code—we engineer solutions that perform under pressure, rank well in search engines, and provide exceptional user experiences.</p>
        
        <p>In today's digital landscape, your website or web application is often your most important business asset. Slow load times, broken functionality, or poor mobile experiences don't just frustrate users—they directly impact your revenue, SEO rankings, and brand reputation. According to Google, <strong>53% of mobile users abandon sites that take longer than 3 seconds to load</strong>.</p>
        
        <p>Our development approach combines modern frameworks (Next.js, React, TypeScript), performance best practices, and rigorous testing to deliver applications that are fast out of the box and built to scale. We write clean, maintainable code that your team can understand and extend long after project completion.</p>
        
        <h3>Who is our web development service for?</h3>
        <ul>
          <li><strong>Small businesses</strong> needing a custom web application that off-the-shelf solutions can't provide</li>
          <li><strong>Startups</strong> building their MVP or scaling their product with clean, investor-ready code</li>
          <li><strong>Agencies</strong> requiring a reliable development partner for client projects</li>
          <li><strong>Enterprise teams</strong> needing specialized expertise in Next.js, React, or performance optimization</li>
        </ul>
        
        <p>Whether you need a marketing website, e-commerce platform, SaaS application, or internal tool, we tailor our technical approach to your specific requirements, timeline, and budget. We believe great development is invisible: users shouldn't notice the code, they should just enjoy the experience.</p>
      `,
      benefits: [
        {
          title: "Blazing-Fast Performance",
          description: "We optimize every aspect of your application: code splitting, image optimization, caching strategies, and server-side rendering. Your site will score 90+ on Google PageSpeed Insights, improving both user experience and SEO rankings.",
          icon: "⚡"
        },
        {
          title: "SEO-Ready Architecture",
          description: "Built with semantic HTML, proper heading structure, meta tags, and structured data from the ground up. Our Next.js implementations ensure your content is fully crawlable and indexable by search engines.",
          icon: "🔍"
        },
        {
          title: "TypeScript for Reliability",
          description: "We use TypeScript to catch errors before they reach production, improve code maintainability, and provide better developer experience. Fewer bugs, faster iterations, and more confident deployments.",
          icon: "🛡️"
        },
        {
          title: "Scalable & Maintainable Code",
          description: "Clean architecture, modular components, and comprehensive documentation mean your application can grow with your business. New features can be added without rewriting everything, saving time and money long-term.",
          icon: "📐"
        },
        {
          title: "Seamless API Integrations",
          description: "We connect your application to payment processors, CRMs, email services, analytics platforms, and custom backends. Our integration approach is secure, well-documented, and easy to extend.",
          icon: "🔗"
        }
      ],
      process: [
        {
          step: 1,
          title: "Technical Discovery",
          description: "We start by understanding your functional requirements, user stories, and technical constraints. We'll audit any existing code, define the tech stack, and create a detailed technical specification with architecture diagrams and API contracts."
        },
        {
          step: 2,
          title: "Sprint Planning & Setup",
          description: "We break the project into 2-week sprints with clear deliverables. Development environment is set up with CI/CD pipelines, testing frameworks, and code quality tools. You'll have access to a staging environment from day one."
        },
        {
          step: 3,
          title: "Agile Development",
          description: "Our developers work in focused sprints, delivering tested, reviewed code every two weeks. You'll receive regular demos, progress reports, and opportunities to provide feedback. We prioritize features based on business value."
        },
        {
          step: 4,
          title: "Testing & QA",
          description: "Every feature undergoes unit testing, integration testing, and end-to-end testing. We test across browsers, devices, and network conditions. Performance budgets ensure your application stays fast as it grows."
        },
        {
          step: 5,
          title: "Deployment & Handoff",
          description: "We handle deployment to your preferred hosting (Vercel, AWS, etc.), configure monitoring, and set up error tracking. You'll receive complete documentation, source code access, and training for your team. Post-launch support included."
        }
      ],
      faqs: [
        {
          question: "What technologies do you specialize in?",
          answer: "Our core stack is Next.js, React, and TypeScript for front-end development. For back-end, we use Node.js, PostgreSQL, and serverless functions. We also integrate with headless CMS platforms (Sanity, Contentful), payment processors (Stripe), and analytics tools. We're framework-agnostic and will recommend the best tool for your specific needs."
        },
        {
          question: "How do you ensure code quality?",
          answer: "We use ESLint, Prettier, and TypeScript for static analysis; Jest and React Testing Library for unit tests; Playwright for end-to-end tests; and GitHub Actions for CI/CD. Every pull request requires peer review. We maintain 80%+ test coverage and enforce performance budgets."
        },
        {
          question: "Can you work with our existing codebase?",
          answer: "Yes. We regularly take over existing projects for refactoring, feature development, or performance optimization. We'll start with a code audit to identify technical debt, security issues, and improvement opportunities, then provide a clear roadmap for moving forward."
        },
        {
          question: "What's your approach to security?",
          answer: "Security is built into our process: input validation, authentication best practices, HTTPS enforcement, dependency auditing, and regular security updates. We follow OWASP guidelines and can implement additional measures like rate limiting, CSP headers, and audit logging based on your risk profile."
        },
        {
          question: "How do you handle project communication?",
          answer: "We use Slack or Discord for daily communication, GitHub Projects for task tracking, and weekly video calls for sprint reviews. You'll have direct access to your development team and a dedicated project manager. All decisions and progress are documented in a shared workspace."
        },
        {
          question: "What happens after launch?",
          answer: "We include 30 days of post-launch support for bug fixes and minor adjustments. For ongoing maintenance, we offer monthly retainers that include security updates, performance monitoring, and priority support. We can also train your team to maintain the codebase independently."
        }
      ]
    },
    images: {
      hero: {
        src: "/web-dev.webp",
        alt: "Professional web development services by Creatovix - Next.js, React & TypeScript applications that are fast, SEO-optimized and scalable",
        width: 1200,
        height: 630
      },
      gallery: [
        { src: "/projects/proj-7.webp", alt: "Web development portfolio: Next.js application with server-side rendering and dynamic content" },
        { src: "/projects/proj-8.webp", alt: "Web development portfolio: React dashboard with real-time data visualization and responsive design" },
        { src: "/projects/proj-9.webp", alt: "Web development portfolio: TypeScript codebase showing clean architecture and comprehensive testing" }
      ]
    }
  },
  {
    id: 4,
    slug: "full-stack",
    number: "04",
    icon: "⬢",
    title: "Full Stack",
    h1: "Full Stack Development Services | End-to-End Web Solutions | Creatovix",
    tagline: "End-to-end excellence",
    accent: "#10d4a0",
    accentRgb: "16,212,160",
    problem: "Coordinating separate design and dev teams wastes time, creates miscommunication, and delays your launch.",
    solution: "We handle everything — database architecture, APIs, UI, and deployment — under one roof with total alignment.",
    result: "Faster delivery (5× average), lower cost, and a product that's cohesive from the first pixel to the final query.",
    features: ["Database & API design", "Auth & security", "Cloud deployment", "Full project ownership"],
    seo: {
      title: "Full Stack Development Services | Creatovix",
      description: "Full stack development services from concept to deployment. Database, APIs, UI, and cloud infrastructure—all under one roof. Faster delivery, lower cost.",
      keywords: ["full stack development", "end-to-end web development", "database design", "API development", "cloud deployment", "UK full stack developer"],
      location: "UK & Remote"
    },
    content: {
      whatIs: `
        <p><strong>Full stack development services</strong> at Creatovix provide a single, accountable partner for your entire web project—from initial concept through design, development, deployment, and beyond. No more coordinating between separate designers, front-end developers, back-end engineers, and DevOps specialists.</p>
        
        <p>When different teams handle different parts of your project, miscommunication is inevitable. Requirements get lost in translation, timelines slip, and the final product feels disjointed. Our full stack approach eliminates these friction points by keeping strategy, design, and development under one roof with shared goals and seamless collaboration.</p>
        
        <p>We combine strategic thinking, user-centered design, and technical excellence to deliver complete digital products that work beautifully and drive business results. Whether you're building a minimum viable product, scaling an existing application, or modernizing legacy systems, we provide the expertise and accountability to get it done right.</p>
        
        <h3>Who is our full stack service for?</h3>
        <ul>
          <li><strong>Startups</strong> needing an MVP built quickly with clean, investor-ready code that can scale</li>
          <li><strong>Small businesses</strong> requiring a custom web application without managing multiple freelancers</li>
          <li><strong>Agencies</strong> looking for a reliable technical partner to execute client projects end-to-end</li>
          <li><strong>Product teams</strong> needing to accelerate development with specialized full stack expertise</li>
        </ul>
        
        <p>Our process is designed for clarity and speed: we start with your business objectives, validate assumptions through prototyping, build iteratively with your feedback, and deliver a production-ready product with documentation and support. You get one point of contact, one timeline, and one team accountable for your success.</p>
      `,
      benefits: [
        {
          title: "Single Point of Accountability",
          description: "No more blaming the designer when the developer says the mockup isn't feasible. Our integrated team owns the entire project, ensuring seamless handoffs and a cohesive final product that matches your vision.",
          icon: "🎯"
        },
        {
          title: "Faster Time to Market",
          description: "By eliminating coordination overhead between separate teams, we typically deliver projects 3-5× faster than traditional agency models. Your MVP can be in users' hands in weeks, not months.",
          icon: "🚀"
        },
        {
          title: "Cost Efficiency",
          description: "One team, one contract, one invoice. No markup for subcontractors, no surprise change orders from miscommunication. Our transparent pricing and efficient process mean more budget goes into building your product.",
          icon: "💰"
        },
        {
          title: "Technical Cohesion",
          description: "From database schema to UI components, every layer of your application is designed to work together. Our full stack expertise ensures optimal performance, security, and maintainability across the entire stack.",
          icon: "🔗"
        },
        {
          title: "Future-Proof Architecture",
          description: "We build with growth in mind: scalable infrastructure, modular code, and comprehensive documentation. Your application can evolve with your business without requiring a complete rewrite.",
          icon: "📈"
        }
      ],
      process: [
        {
          step: 1,
          title: "Strategy & Discovery",
          description: "We start by understanding your business goals, target users, and success metrics. We'll validate your concept through user research, competitive analysis, and technical feasibility assessment. You'll receive a detailed project brief with scope, timeline, and investment."
        },
        {
          step: 2,
          title: "Design & Prototyping",
          description: "Our designers create wireframes and interactive prototypes to validate user flows before development begins. You'll test the experience with real users and provide feedback. We iterate until the design perfectly supports your goals."
        },
        {
          step: 3,
          title: "Full Stack Development",
          description: "Our developers build your application using modern frameworks (Next.js, React, Node.js) with clean, tested code. We work in 2-week sprints with regular demos, ensuring you see progress and can adjust priorities as needed."
        },
        {
          step: 4,
          title: "Testing & Deployment",
          description: "Every feature undergoes rigorous testing: unit tests, integration tests, user acceptance testing, and performance benchmarking. We handle deployment to your preferred cloud provider with CI/CD pipelines, monitoring, and error tracking configured."
        },
        {
          step: 5,
          title: "Launch & Growth Support",
          description: "We don't just launch and leave. You'll receive analytics setup, user onboarding materials, and a 30-day optimization window. We offer ongoing retainers for feature development, maintenance, and growth support as your product scales."
        }
      ],
      faqs: [
        {
          question: "What's included in a full stack project?",
          answer: "Our full stack service includes: strategy & discovery, UX/UI design, front-end development (Next.js/React), back-end development (Node.js/APIs), database design, authentication & security, cloud deployment, testing & QA, documentation, and 30 days of post-launch support. Analytics setup and user training are included."
        },
        {
          question: "How do you handle project scope changes?",
          answer: "We use agile methodology with 2-week sprints. At the start of each sprint, we review priorities and can adjust scope based on your feedback. Changes that impact timeline or budget are discussed transparently before implementation. We believe in flexibility without scope creep."
        },
        {
          question: "Can you work with our existing backend or APIs?",
          answer: "Absolutely. We regularly integrate with existing systems, legacy databases, or third-party APIs. We'll start with a technical audit to understand your current architecture, then propose the most efficient path forward—whether that's extending your existing system or modernizing it incrementally."
        },
        {
          question: "What cloud platforms do you support?",
          answer: "We primarily deploy to Vercel (for Next.js apps) and AWS (for more complex infrastructure), but we're platform-agnostic. We can work with Google Cloud, Azure, or your preferred provider. Our focus is on choosing the right tool for your specific needs, budget, and team expertise."
        },
        {
          question: "How do you ensure security?",
          answer: "Security is integrated throughout our process: secure authentication (OAuth, JWT), input validation, SQL injection prevention, XSS protection, dependency auditing, and regular security updates. We follow OWASP guidelines and can implement additional measures like rate limiting, CSP headers, and audit logging based on your risk profile."
        },
        {
          question: "What if we need to scale the team later?",
          answer: "Our code is written to be maintainable by other developers. We provide comprehensive documentation, architectural diagrams, and onboarding support. If you need to scale your internal team, we can help with hiring guidance, knowledge transfer sessions, or transition to a dedicated development partner."
        }
      ]
    },
    images: {
      hero: {
        src: "/full-stack.webp",
        alt: "Full stack development services by Creatovix - end-to-end web solutions from database to deployment with Next.js, React & Node.js",
        width: 1200,
        height: 630
      },
      gallery: [
        { src: "/projects/proj-10.webp", alt: "Full stack portfolio: complete SaaS application with user authentication, dashboard, and API integration" },
        { src: "/projects/proj-11.webp", alt: "Full stack portfolio: e-commerce platform with product management, cart functionality, and Stripe payments" },
        { src: "/projects/proj-1.webp", alt: "Full stack portfolio: real-time collaboration tool with WebSocket integration and responsive UI" }
      ]
    }
  },
  {
    id: 5,
    slug: "shopify",
    number: "05",
    icon: "◉",
    title: "Shopify",
    h1: "Custom Shopify Development Services | Shopify Plus Experts | Creatovix",
    tagline: "Stores built to sell more",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
    problem: "Default Shopify themes are generic, slow, and don't reflect your brand — leaving revenue on the table.",
    solution: "We build fully custom Shopify themes and apps, optimised for conversion, speed, and seamless UX.",
    result: "Clients average 3× ROI boost post-launch through better UX, faster checkout, and higher average order values.",
    features: ["Custom Shopify themes", "App integration & dev", "Checkout optimisation", "Shopify Plus expertise"],
    seo: {
      title: "Shopify Development Services | Creatovix",
      description: "Custom Shopify development services for businesses. High-converting themes, app integrations, checkout & optimization. Boost your eCommerce revenue.",
      keywords: ["Shopify development", "Shopify Plus expert", "eCommerce development", "Shopify theme customization", "checkout optimization", "UK Shopify developer"],
      location: "UK & Remote"
    },
    content: {
      whatIs: `
        <p><strong>Shopify development services</strong> at Creatovix help small businesses and eCommerce brands build high-converting online stores that stand out from the competition. We don't just install themes—we engineer custom shopping experiences that <strong>increase average order value</strong>, <strong>reduce cart abandonment</strong>, and <strong>build customer loyalty</strong>.</p>
        
        <p>While Shopify provides a powerful foundation, default themes often lack the unique branding, performance optimization, and conversion-focused features that growing brands need. Generic templates can make your store look like everyone else's, slow load times can cost you sales, and missing functionality can frustrate customers at checkout.</p>
        
        <p>Our Shopify expertise combines strategic eCommerce consulting, custom theme development, app integration, and performance optimization to create stores that don't just look great—they drive measurable revenue growth. We've helped clients achieve 2-3× increases in conversion rates and significant improvements in customer lifetime value.</p>
        
        <h3>Who is our Shopify service for?</h3>
        <ul>
          <li><strong>DTC brands</strong> launching their first store or refreshing an existing one to scale revenue</li>
          <li><strong>Small businesses</strong> migrating from other platforms to Shopify for better management and growth tools</li>
          <li><strong>Established stores</strong> needing custom functionality, performance optimization, or Shopify Plus migration</li>
          <li><strong>Agencies</strong> requiring a reliable Shopify development partner for client projects</li>
        </ul>
        
        <p>Whether you need a custom theme from scratch, app development for unique functionality, checkout optimization to reduce abandonment, or Shopify Plus enterprise features, we tailor our approach to your specific business goals, product type, and target audience. We believe your store should work as hard as you do.</p>
      `,
      benefits: [
        {
          title: "Conversion-Optimized Design",
          description: "Every element of your store is designed to guide visitors toward purchase: strategic product placement, trust signals, urgency tactics, and frictionless checkout. We use A/B testing principles and eCommerce best practices to maximize your conversion rate.",
          icon: "🎯"
        },
        {
          title: "Blazing-Fast Performance",
          description: "Slow stores lose sales. We optimize images, minify code, leverage Shopify's CDN, and implement lazy loading to ensure your store loads in under 2 seconds. Faster stores rank better in search and convert more visitors.",
          icon: "⚡"
        },
        {
          title: "Custom Functionality",
          description: "Need subscription billing, custom product builders, wholesale portals, or unique integrations? We develop custom Shopify apps and theme features that give you competitive advantages generic themes can't provide.",
          icon: "🔧"
        },
        {
          title: "Mobile-First Shopping Experience",
          description: "Over 70% of eCommerce traffic comes from mobile. We design and develop your store with mobile users as the priority, ensuring thumb-friendly navigation, fast image loading, and seamless checkout on any device.",
          icon: "📱"
        },
        {
          title: "SEO & Marketing Ready",
          description: "Built-in SEO best practices: semantic HTML, optimized meta tags, structured data, and fast load times. Plus, seamless integration with email marketing, analytics, and advertising platforms to fuel your growth.",
          icon: "🔍"
        }
      ],
      process: [
        {
          step: 1,
          title: "eCommerce Strategy Session",
          description: "We start by understanding your products, target customers, competitors, and business goals. We'll audit your current store (if applicable), analyze your conversion funnel, and identify opportunities for improvement. You'll receive a customized roadmap with priorities and expected ROI."
        },
        {
          step: 2,
          title: "Custom Theme Design",
          description: "Our designers create a unique visual identity that reflects your brand and optimizes for conversion. We'll present mockups for key pages (homepage, product, collection, cart) and iterate based on your feedback. Mobile and desktop experiences are designed in parallel."
        },
        {
          step: 3,
          title: "Theme Development & Integration",
          description: "Our Shopify experts build your custom theme using Liquid, HTML, CSS, and JavaScript. We integrate necessary apps, configure payment gateways, set up shipping rules, and implement custom functionality. Every feature is tested across devices and browsers."
        },
        {
          step: 4,
          title: "Optimization & Testing",
          description: "Before launch, we rigorously test your store: checkout flow, payment processing, mobile responsiveness, page speed, and SEO elements. We implement conversion rate optimization tactics like trust badges, urgency elements, and post-purchase upsells."
        },
        {
          step: 5,
          title: "Launch & Growth Support",
          description: "We handle the technical launch, DNS configuration, and post-launch monitoring. You'll receive analytics setup, staff training, and a 30-day optimization window. We offer ongoing retainers for feature development, A/B testing, and growth strategy."
        }
      ],
      faqs: [
        {
          question: "What's the difference between a custom theme and a premium theme?",
          answer: "Premium themes are pre-built templates you customize yourself—they're affordable but limited in uniqueness and functionality. Custom themes are built from scratch specifically for your brand, products, and goals. They offer complete design freedom, optimized performance, and unique features that give you a competitive edge. For serious brands, the ROI of a custom theme typically pays for itself within months."
        },
        {
          question: "Can you migrate my existing store to Shopify?",
          answer: "Yes. We regularly migrate stores from WooCommerce, BigCommerce, Magento, and custom platforms to Shopify. We handle product data migration, URL redirects to preserve SEO, design recreation or improvement, and functionality replication or enhancement. We ensure zero downtime during the transition."
        },
        {
          question: "Do you work with Shopify Plus?",
          answer: "Absolutely. We're experienced with Shopify Plus features like custom checkout scripts, wholesale channels, multi-currency support, and advanced automation. If you're on Plus or considering an upgrade, we can help you maximize the platform's enterprise capabilities."
        },
        {
          question: "How do you handle app integrations?",
          answer: "We carefully evaluate apps for performance impact, security, and long-term viability. We prefer native Shopify features when possible, but can integrate best-in-class apps for email marketing (Klaviyo), reviews (Judge.me), subscriptions (Recharge), and more. Custom app development is available for unique needs."
        },
        {
          question: "What about ongoing maintenance and updates?",
          answer: "Shopify handles core platform updates, but themes and apps require maintenance. We offer monthly retainers that include: theme updates, app management, performance monitoring, security checks, and minor feature additions. This ensures your store stays fast, secure, and competitive."
        },
        {
          question: "How do you measure success?",
          answer: "We focus on metrics that matter to your business: conversion rate, average order value, cart abandonment rate, and customer lifetime value. We set up analytics tracking pre-launch and provide regular reports showing the impact of our work. Our goal is to deliver measurable ROI, not just a pretty store."
        }
      ]
    },
    images: {
      hero: {
        src: "/shopify.webp",
        alt: "Custom Shopify development services by Creatovix - high-converting eCommerce stores with optimized checkout and mobile-first design",
        width: 1200,
        height: 630
      },
      gallery: [
        { src: "/projects/proj-2.webp", alt: "Shopify portfolio: custom theme with product quick view, wishlist functionality, and optimized checkout" },
        { src: "/projects/proj-4.webp", alt: "Shopify portfolio: mobile-optimized store showing thumb-friendly navigation and fast-loading product images" },
        { src: "/projects/proj-6.webp", alt: "Shopify portfolio: subscription product page with flexible billing options and seamless upsell flow" }
      ]
    }
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find(s => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map(s => s.slug);
}