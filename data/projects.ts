/* ---------------------------------------------------------------------------
 * PROJECTS — the three projects named on Nikita_Owalekar_Resume-2.pdf.
 *
 * Ground rules used while writing these case studies:
 *   • Facts (stack, scope, role, what was built) come straight from the résumé.
 *   • The problem/solution/challenge write-ups describe engineering that
 *     follows from that scope — they contain no invented numbers.
 *   • Wherever a real metric would be stronger than prose, there is an
 *     [ADD METRIC] comment. Fill those in with numbers you can defend.
 * ------------------------------------------------------------------------- */

export interface ProjectLink {
  github?: string;
  demo?: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

/** A simple layered architecture diagram, rendered from data. */
export interface ArchitectureLayer {
  label: string;
  nodes: { name: string; hint?: string }[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  /** Card blurb — keep it to two lines. */
  summary: string;
  year: string;
  /** e.g. "Enterprise AI", "Job Portal", "E-Commerce" */
  category: string;
  featured: boolean;
  cover: Screenshot;
  tech: string[];
  links: ProjectLink;
  /** Shown in place of the buttons when there is nothing public to link to. */
  linksNote?: string;
  /** Card-level micro-content, reused at the top of the case study. */
  problem: string;
  contribution: string;
  /* ----- Case study ----- */
  caseStudy: {
    overview: string;
    problem: string[];
    solution: string[];
    role: { summary: string; responsibilities: string[] };
    challenges: { title: string; body: string }[];
    implementation: { title: string; body: string }[];
    features: string[];
    results: { label: string; value: string; note?: string }[];
    /** Optional — omit the key to hide the diagram entirely. */
    architecture?: ArchitectureLayer[];
    screenshots: Screenshot[];
  };
}

const cover = (slug: string, alt: string): Screenshot => ({
  src: `/projects/${slug}.svg`,
  alt,
  width: 1600,
  height: 1000,
});

export const projects: Project[] = [
  {
    slug: 'syngenta-dossier-automation',
    title: 'Syngenta Dossier Automation',
    tagline: 'Enterprise AI document automation for regulatory dossiers',
    summary:
      'An enterprise platform that automates regulatory dossier work with AI services. I am the sole frontend developer on it.',
    year: '2026',
    category: 'Enterprise AI',
    featured: true,
    cover: cover(
      'syngenta-dossier-automation',
      'Document automation interface with a document list, viewer and AI-extracted fields panel',
    ),
    tech: ['React.js', 'TypeScript', 'LLM APIs', 'REST APIs'],
    links: {},
    linksNote: 'Internal enterprise product — the code and a live demo are not public.',
    problem:
      'Regulatory dossier preparation is long-form document work: assembling, extracting and reviewing across many files.',
    contribution:
      'Sole frontend developer — built the React and TypeScript workflow UI and integrated it with backend AI services.',
    caseStudy: {
      overview:
        'An enterprise AI document automation platform for regulatory dossiers. Specialists work through document sets where AI services do the heavy extraction and the interface is where that output is driven, reviewed and corrected. I am the only frontend developer on the product, so I own the client architecture as well as the features.',
      problem: [
        'Dossier preparation spreads across many documents and review steps, so the interface has to make the current state and what is still outstanding unmistakable.',
        'AI output cannot be presented as final. Reviewers need to see what was produced, check it against the source and correct it.',
        'The AI work happens on the backend and does not return instantly, so the UI cannot assume a request-response rhythm.',
      ],
      solution: [
        'Built the React.js and TypeScript component set for the regulatory workflow screens, so the same patterns carry across every step instead of each screen inventing its own.',
        'Integrated the frontend with backend AI services and REST APIs, keeping a typed boundary between API responses and the components that render them.',
        'Designed the review surfaces so AI output sits next to its source and stays editable — the human stays in control of what ends up in the dossier.',
        'Gave every asynchronous surface an explicit pending, empty and error state rather than a blocking spinner.',
      ],
      role: {
        summary:
          'Sole frontend developer — responsible for the frontend architecture, UI development, AI/API integration, debugging and feature delivery.',
        responsibilities: [
          'Frontend architecture and component structure',
          'React.js + TypeScript workflow components',
          'Integration with backend AI services and REST APIs',
          'Debugging and ongoing feature delivery',
        ],
      },
      challenges: [
        {
          title: 'Making AI output reviewable, not just visible',
          body: 'Automation is only useful here if a specialist can trust it. The review UI keeps generated content adjacent to its source and editable, so verification is part of the normal flow rather than a separate audit step.',
        },
        {
          title: 'Long-running document processing',
          body: 'Document and AI work does not complete within a single quick request. The UI treats processing as a state with its own feedback, so the rest of the screen stays usable and nothing looks broken while work is in flight.',
        },
        {
          title: 'Being the only frontend developer',
          body: 'With no second pair of frontend hands, maintainability beats cleverness. I kept the component set small and consistent, and pushed shared behaviour into reusable pieces so new workflow screens are assembled rather than rebuilt.',
        },
      ],
      implementation: [
        {
          title: 'Typed API boundary',
          body: 'AI and REST responses are typed at the edge, so components never handle raw response shapes and a backend contract change surfaces at compile time instead of in production.',
        },
        {
          title: 'Composable workflow components',
          body: 'Regulatory steps share structure. Building them from the same primitives means a new step is largely configuration, and a fix to a primitive fixes every step.',
        },
        {
          title: 'Explicit async states',
          body: 'Pending, empty and error states are designed rather than inherited, which matters most on a screen where the user is waiting on AI work.',
        },
      ],
      features: [
        'Regulatory workflow screens built from a shared component set',
        'Document review with AI-assisted extraction kept editable',
        'Integration with backend AI/LLM services',
        'REST API integration with typed responses',
        'Explicit loading, empty and error states throughout',
        'Reusable, typed React + TypeScript components',
      ],
      results: [
        // [ADD METRIC] e.g. documents processed per dossier, review time saved,
        // number of workflow screens shipped — anything you can defend.
        { label: 'Ownership', value: 'Sole frontend developer', note: 'Architecture through delivery' },
        { label: 'Scope', value: 'Enterprise platform', note: 'Complex regulatory workflows' },
        { label: 'Integration', value: 'AI + REST services', note: 'Typed client boundary' },
      ],
      architecture: [
        {
          label: 'UI',
          nodes: [
            { name: 'Workflow Screens' },
            { name: 'Document Review' },
            { name: 'AI Output Panel', hint: 'editable' },
          ],
        },
        {
          label: 'Client',
          nodes: [{ name: 'Typed API Client' }, { name: 'Async State Handling', hint: 'pending / error' }],
        },
        {
          label: 'Services',
          nodes: [{ name: 'AI / LLM Services' }, { name: 'REST Endpoints' }],
        },
      ],
      screenshots: [
        {
          src: '/projects/syngenta-dossier-automation.svg',
          alt: 'Document automation workspace with a document list, viewer and extracted-fields panel',
          caption: 'Workspace — documents, viewer and AI-extracted fields side by side',
          width: 1600,
          height: 1000,
        },
        {
          src: '/projects/syngenta-dossier-automation-2.svg',
          alt: 'Review view comparing generated output against the source document',
          caption: 'Review — generated output stays next to its source and editable',
          width: 1600,
          height: 1000,
        },
      ],
    },
  },
  {
    slug: 'seikor-job-portal',
    title: 'Seikor — Job Portal',
    tagline: 'Three products in one: admin, business and candidate',
    summary:
      'A job portal built in Next.js with separate Admin, Business and User modules — complete UI and API integration across all three.',
    year: '2022 – 2024',
    category: 'Job Portal',
    featured: true,
    /* Real screenshots captured from the live site. */
    cover: {
      src: '/projects/seikor-home.webp',
      alt: 'Seikor home page with the headline "Turning Job Searches Into Success Stories" and a job search bar',
      width: 1920,
      height: 1200,
    },
    tech: ['Next.js', 'React.js', 'Tailwind CSS', 'REST APIs'],
    links: { demo: 'https://www.seikor.com/' },
    problem:
      'One product had to serve three different audiences — platform admins, hiring businesses and candidates.',
    contribution: 'Built the Admin, Business and User modules end to end: full UI plus API integration.',
    caseStudy: {
      overview:
        'A live job portal (seikor.com) with three distinct modules. Platform admins manage the marketplace, businesses post and manage roles, and candidates search and apply. Each audience needs its own views and permissions, but they all operate on the same underlying data — so the interesting work is sharing everything worth sharing without blurring the roles.',
      problem: [
        'Three audiences with different goals meant three navigations, three sets of screens and three permission surfaces.',
        'Building each module independently would have tripled the UI work and guaranteed inconsistency between them.',
        'Job data is list-heavy and filter-driven, which is where a portal either feels fast or feels sluggish.',
      ],
      solution: [
        'Built one shared component layer — lists, filters, forms, tables, empty states — and composed each module from it, so a fix lands everywhere at once.',
        'Kept module boundaries explicit in routing and navigation, so an admin screen can never be mistaken for a business screen.',
        'Integrated every screen with REST APIs, including multi-field search (keyword, location, experience level) and the flows for posting a job and applying to one.',
        'Styled the whole portal with Tailwind CSS so spacing, type and states stay consistent across modules.',
      ],
      role: {
        summary: 'Frontend developer — built the Admin, Business and User modules with complete UI and API integration.',
        responsibilities: [
          'UI for all three modules (Admin, Business, User)',
          'Shared component layer used across modules',
          'REST API integration and form flows',
          'Responsive layouts with Tailwind CSS',
        ],
      },
      challenges: [
        {
          title: 'Three modules, one component layer',
          body: 'The temptation with role-based products is to fork the UI per role. Instead the shared pieces are genuinely shared and the role differences live in composition and permissions, which keeps three modules maintainable by one frontend developer.',
        },
        {
          title: 'Long, filter-driven lists',
          body: 'Job listings are browsed by filter, not read top to bottom. Filters drive the fetch rather than the render, so narrowing results is a request for less data instead of more work in the browser.',
        },
        {
          title: 'An application flow that does not lose people',
          body: 'Applying means uploading a CV and answering required screening questions (current CTC, expected CTC, notice period) in one pass. The flow keeps upload and questions on a single surface with field-level validation, so a candidate is never bounced between steps or told at submit that something was missing.',
        },
      ],
      implementation: [
        {
          title: 'Module-scoped routing',
          body: 'Each module owns its route subtree, so navigation, layout and access checks are decided in one place per module rather than per screen.',
        },
        {
          title: 'Composable list + filter primitives',
          body: 'Listings are built from the same list, filter and pagination pieces, so adding a filter is a data change rather than new UI plumbing.',
        },
        {
          title: 'Consistent async states',
          body: 'Loading, empty and error states are part of the shared components, which is why they look the same in the admin module as in the candidate module.',
        },
      ],
      features: [
        'Admin module for platform management',
        'Business module for posting and managing roles',
        'Candidate module for search and applications',
        'Search by keyword, location and experience level, with sort and filter on the listing',
        'Job detail pages with structured meta: function, industry, experience, qualification, openings',
        'Application flow with CV upload and required screening questions',
        'Separate employer and candidate sign-in on one auth surface',
        'Responsive layouts across mobile, tablet and desktop',
      ],
      results: [
        // [ADD METRIC] e.g. jobs posted, applications submitted, users supported.
        { label: 'Status', value: 'Live at seikor.com', note: 'In production with real listings' },
        { label: 'Scope', value: '3 modules', note: 'Admin, Business, Candidate' },
        { label: 'Consistency', value: 'One component layer', note: 'Shared across all modules' },
      ],
      architecture: [
        {
          label: 'Modules',
          nodes: [{ name: 'Admin' }, { name: 'Business' }, { name: 'Candidate' }],
        },
        {
          label: 'Shared UI',
          nodes: [
            { name: 'Lists & Filters' },
            { name: 'Forms', hint: 'apply, post a role' },
            { name: 'Auth', hint: 'employer / candidate' },
          ],
        },
        { label: 'Data', nodes: [{ name: 'REST APIs' }] },
      ],
      screenshots: [
        {
          src: '/projects/seikor-jobs.webp',
          alt: 'Seikor jobs listing with a search field, sort and filter controls, and job result cards',
          caption: 'Candidate — search, sort and filter across the listing',
          width: 1920,
          height: 1200,
        },
        {
          src: '/projects/seikor-job-detail.webp',
          alt: 'Seikor job detail page showing the description alongside a structured job details panel',
          caption: 'Detail — description beside structured job meta',
          width: 1920,
          height: 1200,
        },
        {
          src: '/projects/seikor-apply.webp',
          alt: 'Seikor application dialog with a resume drop zone and required screening questions',
          caption: 'Apply — CV upload and required screening questions in one pass',
          width: 1920,
          height: 1200,
        },
        {
          src: '/projects/seikor-employer-login.webp',
          alt: 'Seikor employer sign-in screen with a switch to candidate login',
          caption: 'Auth — employer sign-in, switchable to the candidate side',
          width: 1920,
          height: 1200,
        },
      ],
    },
  },
  {
    slug: 'organik-truck-ecommerce',
    title: 'Organik Truck — E-Commerce',
    tagline: 'Cart to Stripe checkout, mobile first',
    summary:
      'An e-commerce storefront where I built the shopping cart, the responsive product UI and Stripe checkout.',
    year: '2022 – 2024',
    category: 'E-Commerce',
    featured: true,
    /* Real screenshots captured from the live store. */
    cover: {
      src: '/projects/organik-home.webp',
      alt: 'Organik Truck storefront: category navigation, product search and a hero reading "From Local Farms to Your Kitchen."',
      width: 1920,
      height: 1200,
    },
    /* NOTE: organiktruck.com today is served by Shopify, so the stack below
       describes the storefront work you did rather than what runs in
       production now. Confirm this before an interview — if your React /
       Next.js / Stripe work was an earlier or separate build, say so in the
       overview, and adjust `tech` if the résumé needs it too. */
    tech: ['React.js', 'Next.js', 'Stripe', 'REST APIs'],
    links: { demo: 'https://www.organiktruck.com/' },
    problem:
      'Everything downstream of "add to cart" decides whether a store makes money — and most of it happens on a phone.',
    contribution: 'Built the shopping cart, the responsive storefront UI and the Stripe checkout flow.',
    caseStudy: {
      overview:
        'A storefront for an organic produce brand. My work covered the part of the funnel that has to be exactly right: browsing products on a phone, keeping a cart that behaves, and handing off to Stripe for payment without leaving the customer guessing at any point.',
      problem: [
        'Cart state has to survive the customer changing their mind — adding, removing, adjusting quantity, and returning later.',
        'Payment is the one flow where an unclear state is unacceptable: the customer must always know whether they have paid.',
        'Most shoppers arrive on a phone, so the catalogue and checkout have to be designed for that first, not adapted to it.',
      ],
      solution: [
        'Built the cart as a single source of truth for line items and totals, so every surface that shows the cart shows the same numbers.',
        'Integrated Stripe checkout and handled the states around it — in progress, succeeded, failed — so the customer is never left uncertain.',
        'Built the product and checkout UI mobile-first with responsive layouts that hold up from phone to desktop.',
        'Handled produce sold by weight, where the variant a customer picks changes the line price and the cart total.',
        'Used native input types and validation in the checkout form, which is what makes a payment form bearable on a phone keyboard.',
      ],
      role: {
        summary: 'Frontend developer — shopping cart, responsive storefront UI and Stripe checkout integration.',
        responsibilities: [
          'Shopping cart state and totals',
          'Responsive product listing and detail UI',
          'Stripe checkout integration and its states',
          'Checkout form validation',
        ],
      },
      challenges: [
        {
          title: 'A cart that never disagrees with itself',
          body: 'Cart totals appear in the header, the cart drawer and the checkout summary. Deriving all of them from one piece of state means they cannot drift apart, which is the usual source of "the price changed at checkout" complaints.',
        },
        {
          title: 'Payment states, spelled out',
          body: 'A payment can be pending, succeed or fail, and the customer needs to know which. Each of those is an explicit UI state with its own message rather than a spinner that eventually stops.',
        },
        {
          title: 'Checkout on a small screen',
          body: 'Correct input types, autocomplete hints and generous tap targets are not polish on a checkout form — they are the difference between a completed order and an abandoned one.',
        },
      ],
      implementation: [
        {
          title: 'Single cart source of truth',
          body: 'Line items live in one place; totals, counts and badges are derived from them, so there is exactly one place a cart bug can be.',
        },
        {
          title: 'Stripe handoff',
          body: 'The payment step delegates to Stripe rather than handling card data in the app, which keeps sensitive details out of the frontend entirely.',
        },
        {
          title: 'Responsive product UI',
          body: 'Product grids and detail pages use fluid layouts and correctly sized images, so the catalogue stays fast and stable on mobile connections.',
        },
      ],
      features: [
        'Shopping cart with quantity updates and derived totals',
        'Weight-based product variants that drive line and cart pricing',
        'Stripe checkout with explicit success and failure states',
        'Responsive product listing and detail pages with faceted filters',
        'Mobile-first checkout form with native validation',
        'Consistent cart display across header, drawer and checkout',
        'REST API integration for catalogue and orders',
      ],
      results: [
        // [ADD METRIC] e.g. conversion or load-time improvement, orders handled.
        { label: 'Checkout', value: 'Stripe integrated', note: 'Card data never touches the app' },
        { label: 'Cart', value: 'One source of truth', note: 'Totals cannot drift' },
        { label: 'Layout', value: 'Mobile first', note: 'Phone through desktop' },
      ],
      architecture: [
        {
          label: 'Storefront',
          nodes: [{ name: 'Product Grid' }, { name: 'Product Detail' }, { name: 'Cart Drawer' }],
        },
        {
          label: 'Client State',
          nodes: [{ name: 'Cart State', hint: 'derived totals' }, { name: 'Checkout Flow' }],
        },
        {
          label: 'Services',
          nodes: [{ name: 'Catalogue API' }, { name: 'Stripe', hint: 'hosted payment' }],
        },
      ],
      screenshots: [
        {
          src: '/projects/organik-collection.webp',
          alt: 'Organik Truck vegetables collection with category, price and availability filters beside a product grid',
          caption: 'Catalogue — 62 products behind category, price and availability filters',
          width: 1920,
          height: 1200,
        },
        {
          src: '/projects/organik-product.webp',
          alt: 'Organik Truck product page for baby corn with weight options and an add-to-cart control',
          caption: 'Product — weight variants and add to cart',
          width: 1920,
          height: 1200,
        },
        {
          src: '/projects/organik-cart.webp',
          alt: 'Organik Truck cart page with a line item, quantity stepper, estimated total and checkout button',
          caption: 'Cart — line items, quantity stepper and running total',
          width: 1920,
          height: 1200,
        },
      ],
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
