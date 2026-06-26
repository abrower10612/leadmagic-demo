import {
  Mail,
  MailCheck,
  AtSign,
  Phone,
  UserSearch,
  UserRoundCheck,
  Building2,
  Banknote,
  Boxes,
  Target,
  Briefcase,
  Activity,
  type LucideIcon,
} from 'lucide-react';

/** Column types we can detect in an uploaded CSV. */
export type DetectedColumn =
  | 'email'
  | 'linkedin_url'
  | 'company_domain'
  | 'first_name'
  | 'last_name';

export type EnrichmentGroup =
  | 'emails'
  | 'phone'
  | 'profiles'
  | 'company'
  | 'signals';

export interface Enrichment {
  id: string;
  name: string;
  group: EnrichmentGroup;
  icon: LucideIcon;
  /** Short "input → output" labels. */
  input: string;
  output: string;
  /**
   * Requirements as an OR of AND-groups: the enrichment is "Ready" when ANY
   * inner group has all of its columns present in the file.
   */
  requires: DetectedColumn[][];
  /** Credits per successful unit. */
  cost: number;
  unit: string;
  popular?: boolean;
}

export interface GroupMeta {
  id: EnrichmentGroup;
  label: string;
  icon: LucideIcon;
}

export const enrichmentGroups: GroupMeta[] = [
  { id: 'emails', label: 'Emails', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'profiles', label: 'Profiles', icon: UserSearch },
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'signals', label: 'Signals', icon: Activity },
];

export const enrichments: Enrichment[] = [
  // Emails
  {
    id: 'validate-emails',
    name: 'Validate emails',
    group: 'emails',
    icon: MailCheck,
    input: 'Email',
    output: 'deliverability status',
    requires: [['email']],
    cost: 0.25,
    unit: 'validated email',
    popular: true,
  },
  {
    id: 'find-work-emails',
    name: 'Find work emails',
    group: 'emails',
    icon: Mail,
    input: 'Name + company',
    output: 'work email',
    requires: [['first_name', 'last_name', 'company_domain']],
    cost: 1,
    unit: 'work email found',
  },
  {
    id: 'find-personal-emails',
    name: 'Find personal emails',
    group: 'emails',
    icon: AtSign,
    input: 'LinkedIn profile',
    output: 'personal email',
    requires: [['linkedin_url']],
    cost: 2,
    unit: 'personal email found',
  },
  {
    id: 'find-emails-from-profiles',
    name: 'Find emails from profiles',
    group: 'emails',
    icon: Mail,
    input: 'LinkedIn profile',
    output: 'work email',
    requires: [['linkedin_url']],
    cost: 1,
    unit: 'work email found',
  },
  // Phone
  {
    id: 'find-mobile',
    name: 'Find mobile numbers',
    group: 'phone',
    icon: Phone,
    input: 'LinkedIn or work email',
    output: 'mobile number',
    requires: [['linkedin_url'], ['email']],
    cost: 5,
    unit: 'mobile found',
  },
  // Profiles
  {
    id: 'find-profiles-from-emails',
    name: 'Find profiles from emails',
    group: 'profiles',
    icon: UserSearch,
    input: 'Work email',
    output: 'LinkedIn profile',
    requires: [['email']],
    cost: 1,
    unit: 'profile found',
  },
  {
    id: 'enrich-linkedin',
    name: 'Enrich LinkedIn profiles',
    group: 'profiles',
    icon: UserRoundCheck,
    input: 'LinkedIn URL',
    output: 'full profile',
    requires: [['linkedin_url']],
    cost: 1,
    unit: 'enriched profile',
  },
  // Company
  {
    id: 'add-company-details',
    name: 'Add company details',
    group: 'company',
    icon: Building2,
    input: 'Company domain',
    output: 'firmographics',
    requires: [['company_domain']],
    cost: 1,
    unit: 'company enriched',
  },
  {
    id: 'add-funding',
    name: 'Add funding insights',
    group: 'company',
    icon: Banknote,
    input: 'Company domain',
    output: 'funding data',
    requires: [['company_domain']],
    cost: 1,
    unit: 'company with funding data',
  },
  {
    id: 'tech-stacks',
    name: 'Discover company tech stacks',
    group: 'company',
    icon: Boxes,
    input: 'Company domain',
    output: 'tech stack',
    requires: [['company_domain']],
    cost: 1,
    unit: 'company with tech data',
  },
  {
    id: 'similar-companies',
    name: 'Find similar companies',
    group: 'company',
    icon: Target,
    input: 'Company domain',
    output: 'similar companies',
    requires: [['company_domain']],
    cost: 5,
    unit: 'row with results',
  },
  // Signals
  {
    id: 'detect-job-changes',
    name: 'Detect job changes',
    group: 'signals',
    icon: Briefcase,
    input: 'LinkedIn profile',
    output: 'job change signal',
    requires: [['linkedin_url']],
    cost: 1,
    unit: 'row with a job-change signal',
  },
];

export const enrichmentById: Record<string, Enrichment> = Object.fromEntries(
  enrichments.map((e) => [e.id, e])
);
