export interface Company {
  id: string;
  name: string;
  logo?: string;
  domain: string;
  associatedDeals: string[];
  icpFit: "Excellent" | "Good" | "Medium" | "Low";
  estimatedARR: string;
  connectionStrength: "Very strong" | "Strong" | "Good" | "Weak";
}

export const companies: Company[] = [
  {
    id: "1",
    name: "Vercel",
    domain: "vercel.com",
    associatedDeals: ["Vercel", "Vercel - Expansion"],
    icpFit: "Excellent",
    estimatedARR: "$100M-$250M",
    connectionStrength: "Very strong"
  },
  {
    id: "2",
    name: "DigitalOcean",
    domain: "digitalocean.com",
    associatedDeals: ["DigitalOcean"],
    icpFit: "Medium",
    estimatedARR: "$500M-$1B",
    connectionStrength: "Strong"
  },
  {
    id: "3",
    name: "GitHub",
    domain: "github.com",
    associatedDeals: ["GitHub - x20 Enterprise"],
    icpFit: "Good",
    estimatedARR: "$1B-$10B",
    connectionStrength: "Very strong"
  },
  {
    id: "4",
    name: "Stripe",
    domain: "stripe.com",
    associatedDeals: ["Stripe"],
    icpFit: "Good",
    estimatedARR: "$1B-$10B",
    connectionStrength: "Very strong"
  },
  {
    id: "5",
    name: "Figma",
    domain: "figma.com",
    associatedDeals: ["Figma"],
    icpFit: "Good",
    estimatedARR: "$500M-$1B",
    connectionStrength: "Very strong"
  },
  {
    id: "6",
    name: "Intercom",
    domain: "intercom.com",
    associatedDeals: ["Intercom", "Intercom - Automation"],
    icpFit: "Medium",
    estimatedARR: "$250M-$500M",
    connectionStrength: "Very strong"
  },
  {
    id: "7",
    name: "Segment",
    domain: "segment.com",
    associatedDeals: ["Segment - x30 Pro"],
    icpFit: "Good",
    estimatedARR: "$250M-$500M",
    connectionStrength: "Strong"
  },
  {
    id: "8",
    name: "Notion",
    domain: "notion.so",
    associatedDeals: ["Notion - Exec", "Notion - GTM"],
    icpFit: "Medium",
    estimatedARR: "$100M-$250M",
    connectionStrength: "Strong"
  },
  {
    id: "9",
    name: "Slack",
    domain: "slack.com",
    associatedDeals: ["Slack", "Slack - Expansion"],
    icpFit: "Low",
    estimatedARR: "$1B-$10B",
    connectionStrength: "Weak"
  },
  {
    id: "10",
    name: "Loom",
    domain: "loom.com",
    associatedDeals: ["Loom"],
    icpFit: "Medium",
    estimatedARR: "$50M-$100M",
    connectionStrength: "Good"
  },
  {
    id: "11",
    name: "Retool",
    domain: "retool.com",
    associatedDeals: ["Retool"],
    icpFit: "Excellent",
    estimatedARR: "$50M-$100M",
    connectionStrength: "Good"
  },
  {
    id: "12",
    name: "Customer.io",
    domain: "customer.io",
    associatedDeals: ["Customer.io - x10 Plus"],
    icpFit: "Excellent",
    estimatedARR: "$10-$50M",
    connectionStrength: "Strong"
  },
  {
    id: "13",
    name: "Snowflake",
    domain: "snowflake.com",
    associatedDeals: ["Snowflake", "Snowflake - Enterprise"],
    icpFit: "Low",
    estimatedARR: "$1B-$10B",
    connectionStrength: "Strong"
  }
];
