# Content System Standards — Vernon Laquindanum

> **Status:** v0.1 — machine-approximated draft from portfolio writing analysis, 2026-05-29.
> Every section was derived from reading the actual portfolio content (case studies, About section, onboarding narratives, UX writing samples). Confidence levels are marked: no tag = high confidence from direct observation; **[LOW EVIDENCE]** = inferred from limited examples; **[NEEDS INPUT]** = insufficient data to write a reliable rule.
>
> This document covers: all writing attributed to Vernon — portfolio narrative, UX copy, content strategy, emails — governed by one unified voice that flexes by context.

---

# PART 0 — System Operating Instructions

### 0.1 Purpose & workflows

**What this system is for:** Capturing Vernon Laquindanum's personal writing style so it can be reliably reproduced (Generate) and evaluated (Check) across any content surface.

**Generate workflow**
- Input: Content type + context (surface, audience, purpose, constraints)
- Process: Load voice rules → load relevant tone row → load relevant pattern → draft → self-check against lint rules
- Output: Draft in Vernon's voice + rule IDs applied + brief rationale for key choices

**Check workflow**
- Input: Any piece of writing attributed to or intended to sound like Vernon
- Process: Load all lint rules for the content type → scan for violations → score on rubric dimensions
- Output: Ordered list of `{rule ID, severity, location, problem, suggested fix}` + per-dimension scores + one-sentence verdict

### 0.2 Reading order & precedence

Load in this order. When rules conflict, higher items win:

1. Part 0 (this section) — always loaded first
2. Part 1.3 (content principles) — the tiebreakers for judgment calls
3. Part 1.4 (voice) — constant across all content, all contexts
4. Part 3 (language & mechanics) — deterministic, checkable rules
5. Part 2.2 (situational tone map) — look up the specific scenario
6. Part 4 (content patterns) — scaffolding for specific content types
7. Part 5.3 (lint rules) — Check workflow's ruleset

**Conflict precedence:** Clarity > Honesty/accuracy > Voice > Tone > Mechanics > Style preference

### 0.3 Rule schema legend

| Field | Value | Behavioral meaning |
|---|---|---|
| Severity | must | Violating this breaks voice or meaning. The Check workflow always flags it. |
| Severity | should | Strongly preferred; has documented exceptions. The Check workflow flags it as a warning. |
| Severity | may | Optional enhancement. The Check workflow surfaces it as a suggestion only. |
| Detect | [condition] | Observable signal in the text. The Check workflow scans for this mechanically. |
| Detect | advisory | Requires human judgment. The Check workflow flags it but marks it as non-deterministic. |

### 0.4 Scope

**In scope:**
- Portfolio case studies and project narratives
- About / bio sections
- UX microcopy (onboarding flows, error states, UI labels, tooltips)
- Content strategy documents
- Email copy
- Onboarding scripts and video narration
- Any writing attributed to Vernon across any professional surface

**Out of scope:**
- Ghostwriting for other people or brands
- Legal, compliance, or regulated copy (defer to legal)
- Marketing copy produced under another brand's style guide (defer to that brand's standards; note where they conflict)
- Code comments or technical documentation written for engineering audiences

---

# PART 1 — Foundation & Strategy

### 1.1 Brand & product context

- Vernon Laquindanum is a senior content designer with 12+ years of experience: Copywriter → UX Writer → Content Designer
- Specializes in content systems for platform and enterprise software (most recently Atlassian: Goals, Projects, Teams apps)
- Core positioning: builds systems that scale, not just writes words — the system is the work
- Currently interested in extending content systems with AI and agentic evaluation
- Primary professional context: B2B/enterprise SaaS, collaboration tools, goal-setting, productivity software
- The portfolio is the primary public artifact and targets design/content leadership and hiring managers at tech companies
- Personal voice exists on a spectrum: the portfolio is slightly more relaxed than professional deliverables, but the same voice applies across both

### 1.2 Audience & personas — operationalized

| Audience | Expertise level | Emotional state | What they're trying to do | What they fear | Writing implications |
|---|---|---|---|---|---|
| Design/content leadership (Directors, VPs, Principal ICs) | High — reads craft signals; knows what good systems thinking looks like | Evaluative, skeptical, efficient | Assess depth of thinking; determine if this person can build, not just produce | Hiring someone who polishes words but can't structure a system | Lead with the structural problem, not the output. Show the messy decisions. Demonstrate you know what you don't know. |
| Hiring managers (non-content specialists) | Medium — understands UX broadly, not content nuance | Efficient; scanning for clear signals | Determine fit quickly across a stack of portfolios | Wasting time on a portfolio that requires expertise to decode | Front-load stakes and outcomes; use tl;dr generously; make work legible without deep domain context |
| Product end users (for UX copy outputs) | Varies widely; assume minimal domain knowledge | Task-focused; often mildly stressed; existing users may be resistant to onboarding | Complete a task or understand something new as quickly as possible | Being confused, blocked, or talked down to | Be direct; don't over-explain; respect their time; match their entry state (new vs. existing) |

### 1.3 Content principles (north stars)

These resolve edge cases the rules don't cover. Use them as tiebreakers.

**1. Clarity over cleverness**
What it means: If a smarter-sounding sentence is less clear, use the plainer one. Wordplay earns its place only when it costs nothing in comprehension.
Example tradeoff: "Success measures" was a precise term but not immediately understandable to users — that's a problem worth naming, not a clever solution worth defending.

**2. Honesty over polish**
What it means: An accurate statement that acknowledges a limitation is better than a smooth sentence that omits it. Don't sanitize failures, losses, or bad outcomes.
Example tradeoff: "I lost this battle and PM decided to go with Option 2" > any softened version that removes the accountability or the fact of the disagreement.

**3. Structure before words**
What it means: When something is hard to explain, the problem is usually in the underlying structure (of the content model, the object model, the narrative), not the words. Fix the structure first.
Example tradeoff: Better labels didn't fix the broken object model in Goals — the Epilogue made this explicit: "structural problems don't get better by throwing more words and labels at them."

**4. Context before conclusions**
What it means: Give the reader enough background to understand why a decision was made before asking them to evaluate whether it was right. Stakes-setting is part of the work.
Example tradeoff: "We introduced Success Measures as a new dependent object type" lands flat without three chapters of context about why the original model failed.

**5. Respect the reader's time**
What it means: Use tl;dr sections, short punchy sentences for emphasis, and direct phrasing. Don't make readers wade through paragraphs to get to the point.
Example tradeoff: Every chapter in Case Study 1 opens with a one-sentence callout before the full narrative — the reader can scan at the callout level and dive in where interested.

**6. Own your contributions clearly**
What it means: Name what you did without inflating or deflating. "I originated" and "I was actively working with PM" are both true and appropriately calibrated to what actually happened.
Example tradeoff: "I oversaw the communications" (accurate scope) vs. "I led the communications" (may overstate) vs. "I helped with the communications" (undersells when you owned it).

### 1.4 Voice (constant personality)

These traits are true in every piece of content, regardless of context.

---

**Trait: Candid**
Definition: Willing to say what actually happened, including failures, overrules, messy decisions, and mixed outcomes.
This means: Naming who made a call you disagreed with. Acknowledging when a launch had mixed results. Saying "this wasn't ideal."
Doesn't mean: Cynical, bitter, or venting. Candor is factual, not emotional — it describes reality without editorializing.
- Do: "We released the feature in early access to several customers, and received a lot of feedback that it did not fulfill a lot of our customers' needs."
- Don't: "We launched to mixed reception." → Too soft; flattens the reality that early access failed.

---

**Trait: Technically precise**
Definition: Uses the right term for the right thing, especially for structural and systems concepts. Defines terms when they might be unfamiliar; never uses jargon to signal expertise.
This means: Distinguishing "object model" from "content model." Using `code formatting` for specific named objects in a product. Naming the difference between a primitive, a container, and a type.
Doesn't mean: Jargon-dropping or gatekeeping. Precision serves clarity for the reader, not status for the writer.
- Do: Carefully distinguishing `Goals` (app) from `Goals` (container) from `Goals` (primitive) from `Goal` (default type) to show why the naming was broken.
- Don't: "The naming got confusing." → Loses the structural specificity that explains why the problem was hard and non-obvious.

---

**Trait: Context-rich**
Definition: Gives the reader enough background to understand stakes and constraints before presenting the work or decision.
This means: Explaining the product history, team situation, roadmap pressure, and prior attempts before describing the solution.
Doesn't mean: Over-explaining. Context stops when the reader has enough to evaluate the decision — not when everything is covered.
- Do: Three chapters of prologue + research phase + model problem before arriving at the solution in Case Study 1.
- Don't: Opening with "We introduced Success Measures as a new dependent object type" — no context for why that was hard or what it replaced.

---

**Trait: Self-aware (including self-deprecating)**
Definition: Comfortable naming the limits of your own knowledge, the times you were overruled, and the things that didn't work.
This means: "I never got the full story," "I lost this battle," "my humble brag moment here is." Using "I think" or "I believe" when confident but not certain.
Doesn't mean: False modesty or performative humility. Self-awareness is about accuracy — it doesn't undersell any more than it oversells.
- Do: "I lost this battle and PM decided to go with Option 2." (Accurate; names the outcome; doesn't complain.)
- Don't: "It was ultimately decided to go with Option 2." → Passive construction hides agency and erases the candor.

---

**Trait: Understated warmth**
Definition: Writes like a person, not a document. Occasional humor and informal asides make dense content more readable — but warmth earns its place; it doesn't pad content.
This means: Short parenthetical asides, a "heck," a wry "Or so we thought" after a setup paragraph, "✨content magic✨" when the contrast between the label and the actual work is the joke.
Doesn't mean: Performing personality. If a joke or aside doesn't add anything, it doesn't go in.
- Do: "the name of the bundle that their boss's boss's boss's boss bought" — specific, informal, makes the organizational distance visceral without a bland "senior leadership."
- Don't: Starting paragraphs with "Great news!" or forcing emoji unprompted in professional contexts.

---

# PART 2 — Tone (situational)

### 2.1 Tone model

Voice is constant. Tone moves along two axes:

| Axis | Range | Hard caps |
|---|---|---|
| Formality | Professional-reflective ↔ Conversational-candid | Never below casual-but-coherent (even portfolio writing is legible); never above stilted-formal |
| Register | Narrative/explanatory ↔ Functional/action-oriented | Both ends are used; the switch is always deliberate, not gradual drift |

The portfolio writing sits at the conversational-candid end of formality. Professional deliverables (strategy docs, UX copy in production) sit at the professional-reflective end. Voice traits (candid, precise, context-rich) remain present at both ends — tone modulates how they express, not whether they're present.

### 2.2 Situational tone map

| Scenario | Formality | Amplify | Suppress | Mini-example |
|---|---|---|---|---|
| Portfolio case study narrative | Conversational-candid | Candor, structural thinking, personal ownership, occasional dry humor | Promotional language, sanitized outcomes, passive voice | "I lost this battle and PM decided to go with Option 2." |
| Portfolio About/bio | Conversational-warm | First-person directness, forward momentum, warmth | Formality, credential-listing without substance, passive constructions | "Now, I'm most interested in extending these systems with AI." |
| UX onboarding copy (new users) | Functional-warm | Clarity, aspirational framing, brevity, one-line purpose definitions | Over-explanation, marketing language, jargon, bundle naming | *[verb] [object] with [app]* — one-line card headline |
| UX onboarding copy (existing users) | Functional-direct | What's new and why it matters to them specifically; respects prior knowledge | Repeating what they already know, treating them as new, treating onboarding as mandatory reading | "Your current tools work better with the new ones." |
| UX error/status copy | Functional-direct | What happened + what to do next; specific | Blame, excessive apology, vague reassurance | **[LOW EVIDENCE — no functional error copy in portfolio sample]** |
| Video script / narration | Functional-warm | Clarity of sequence, natural spoken rhythm, app-specific use case over marketing | Feature-list enumeration, corporate brand language, TWC bundle naming for end user contexts | **[LOW EVIDENCE — one script referenced but not quoted]** |
| Content strategy document | Professional-reflective | Audience framing, stakes, rationale for decisions, clear recommendation | Casual asides, humor, colloquial phrasing | **[LOW EVIDENCE — strategy docs described but not shown]** |
| Stakeholder/internal comms | Professional-candid | Clear recommendation, context-setting, acknowledgment of tradeoffs | Over-softening disagreements, passive voice for decisions | **[LOW EVIDENCE — inferred from how decisions are recounted in case studies]** |

---

# PART 3 — Language & Mechanics

### 3.1 Grammar, mechanics & style

---

**GRAM-01: Contractions**
- Rule: Use contractions in all narrative and UX copy.
- Rationale: Contractions match natural spoken cadence. Avoiding them in contexts where they'd naturally appear creates distance and formality that isn't earned.
- Applies to: All surfaces
- Severity: should
- Do: "It's not an easy concept to explain in 30 seconds or less."
- Don't: "It is not an easy concept to explain in 30 seconds or less." → Unnecessarily formal; creates stiffness.
- Detect: Uncontracted forms "it is," "we are," "they are," "do not," "did not," "you will" in body prose (not in headings or titles where contraction rules differ).

---

**GRAM-02: Active voice — name the actor**
- Rule: Name the person or system that made a decision or took an action. Never use passive constructions to obscure accountability.
- Rationale: Passive voice is antithetical to candor. Removing the agent from a decision makes it impossible for a reader to understand who did what — which is exactly the problem in both UX copy and portfolio narratives.
- Applies to: All surfaces
- Severity: must
- Do: "I lost this battle and PM decided to go with Option 2."
- Don't: "It was ultimately decided to go with Option 2." → Removes accountability entirely; makes it impossible to know who held the position.
- Detect: "was decided," "was determined," "was chosen," "it was felt," "it was agreed," "was released" when a human agent made the call.

---

**GRAM-03: Sentence length variation**
- Rule: Vary sentence length deliberately. Use short sentences (3–8 words) for emphasis after longer setup. Don't pad with filler.
- Rationale: Rhythm signals importance. A short sentence after a dense paragraph signals: this is the point. Uniform sentence length flattens the signal.
- Applies to: Narrative writing
- Severity: should
- Do: A long context sentence establishing the problem → "Or so we thought." [3 words, emphasis]
- Don't: Making all sentences punchy (loses nuance) or all sentences long (loses emphasis).

---

**GRAM-04: Italics for spoken stress**
- Rule: Use italics to convey the stressed word when the stress changes the meaning of a sentence.
- Rationale: Mirrors natural speech patterns. Clarifies meaning without restructuring.
- Applies to: Narrative writing
- Severity: may
- Do: "the *actual* OKR framework," "it *had* to be in there," "customers who would *only* want OKR language"
- Don't: Italicizing for decoration, or italicizing non-load-bearing words.
- Detect: advisory — Italic overuse (>2 per paragraph) is a signal worth flagging.

---

**GRAM-05: Em-dash for parenthetical asides**
- Rule: Use em-dashes for parenthetical asides and appositions. Maximum one per sentence; never stack.
- Rationale: Em-dashes earn their place when they set off a meaningful aside. More than one per sentence creates visual noise and breaks reading flow.
- Applies to: Narrative writing
- Severity: should
- Do: "every Friday, you'd write a short, tweet-sized update (280 characters max) about what happened in your project that week"
- Don't: "The idea — which we'd developed over months — behind Atlas — the product — was simple." → Stacked em-dashes.
- Detect: Any sentence with more than one em-dash.

---

**GRAM-06: Lowercase section labels (portfolio-specific)**
- Rule: In the portfolio hero and section labels, lowercase is intentional and consistent.
- Rationale: Matches the relaxed, personal register of the portfolio. Signals that the voice is human and considered, not corporate and auto-formatted.
- Applies to: Portfolio hero, section label headings
- Severity: may
- Do: "words i have written." / "projects i've worked on"
- Don't: Applying the same lowercase convention to UX copy or professional deliverables.

---

**GRAM-07: Oxford comma**
- Rule: Use the Oxford comma in all three-or-more-item lists.
- Rationale: **[LOW EVIDENCE — inferred from observed usage, not confirmed explicitly]**
- Applies to: All surfaces
- Severity: should
- Detect: Three-item lists without a final serial comma before "and" or "or."

---

**GRAM-08: Tense — past for completed work, present for current thinking**
- Rule: Use past tense to describe project events. Use present tense for current professional interests, standing observations, or principles.
- Rationale: Matches the natural register of a practitioner reflecting on completed work while speaking to current relevance.
- Applies to: Portfolio narrative
- Severity: should
- Do: "we landed on `Success measures`" (past) / "I'm most interested in extending these systems with AI" (present)
- Don't: Mixing tenses mid-section without a clear reason.

---

### 3.2 Lexicon / word list

**USE (preferred terms)**

| Term | Preferred usage |
|---|---|
| "built," "created," "developed," "designed" | Active, specific ownership verbs |
| "originated" | Strongest ownership verb — use when truly originating from scratch |
| "led" | Clear ownership when managing or directing the work |
| "proposed," "advocated for" | When making a recommendation that wasn't unilaterally decided |
| "heck" | Acceptable informal marker; use sparingly — once per piece maximum |
| "all in all" | Signals a synthesis or summary moment; earned, not reflexive |
| "to be clear" | Signals an important clarification follows; use it honestly |
| "the better part of" | Informal time-scope idiom; clear and warm |
| "in particular" | Focuses attention without over-formalizing |
| "at this point" / "at this point in time" | Temporal context marker; used in moderation |

---

**AVOID → USE INSTEAD**

| Avoid | Use instead | Reason |
|---|---|---|
| "leverage" | "use," "apply," "build on" | Tech buzzword; imprecise |
| "seamless" | Describe the actual behavior | Meaningless without specificity |
| "innovative" | Describe what's novel and why | Vague; overused |
| "delve" | "explore," "dig into," "look at" | AI-associated filler |
| "robust" | Describe what makes it thorough | Vague corporate adjective |
| "circle back" | "follow up," "revisit" | HR-speak |
| "move the needle" | Name the specific metric or change | Jargon without substance |
| "alignment" (as a standalone noun) | "agreement," "shared direction," "consensus" | Corporate HR-speak when used abstractly |
| "at the end of the day" | State the conclusion directly | Filler transition |
| "synergy" | Describe the actual interaction or benefit | Jargon |
| "low-hanging fruit" | Name the specific easy win | Overused |

---

**NEVER**

| Term or pattern | Reason |
|---|---|
| Agent-less passive for decisions ("it was decided," "was determined," "was chosen") | Obscures accountability; contradicts candor — this is a must-avoid |
| "it's not just X, it's Y" constructions | Overwrought; AI writing anti-pattern |
| Enthusiasm openers ("I'm thrilled to share," "Excited to announce," "Great news!") | Performative; wrong register |
| Rhetorical questions used as section transitions | Weak; implies the reader needs to be told what to think |

---

**A note on hedging:** Hedging language ("may," "in some cases," "I think," "I believe") is **not** a blanket avoid. It's used deliberately when accuracy requires acknowledging uncertainty. The line: hedging that reflects genuine uncertainty = fine; hedging to avoid committing to a view you actually hold = not fine (see ANTI-06).

---

### 3.3 Terminology & product nomenclature

**[LOW EVIDENCE for a universal term set — portfolio covers multiple companies. What follows is derived primarily from Atlassian context, which dominates the sample. This section should be extended as more professional deliverables are added.]**

| Canonical term | Accepted variants | Forbidden variants | Notes |
|---|---|---|---|
| Content design | Content designer, content design practice | UI writing (non-standard); "UX writing" (acceptable but less precise at the system level) | Distinguish from copywriting — different craft, different scope |
| UX writing | UX copy, microcopy (for short strings) | — | |
| Content model | — | Content strategy (not the same thing) | Content model = the naming/terminology layer; content strategy = higher-order decisions about what to say and why |
| Object model | — | Data model (different level of abstraction) | Object model = product design level; data model = engineering layer |
| Primitive | — | Base object (informal but acceptable); "parent type" (less precise) | Atlassian-specific term for the collective noun grouping all types of a given object class |

---

### 3.4 Numbers, dates, units, formatting

**[LOW EVIDENCE — derived from a small sample. Confirm before treating these as firm rules.]**

Observed conventions:
- Use numerals for specific metrics: "~1,500 success measures created per day"
- Use tilde (~) for approximations: "~1.5 years," "~22 posts (~37%)"
- Write timeline ranges in plain language: "Winter 2024 – Fall 2025," "late 2024/early 2025"
- Percentages: numeral + % symbol; parenthetical when secondary data point: "~22 posts (~37%)"
- Decimal chapter numbers for sub-sections: "Chapter 4.5," "Chapter 4.75" — used for narrative effect, not standard outlining

**[NEEDS INPUT]** No evidence for:
- Date format conventions (MM/DD vs. Month DD, YYYY)
- Currency formatting
- Number-to-word threshold (when "one" vs. "1")
- Formal unit formatting

---

### 3.5 Inclusive & accessible language

**[LOW EVIDENCE — portfolio doesn't surface enough examples to write high-confidence rules. The following is inferred or observed in passing.]**

Observed:
- Link text is descriptive, not "click here" — e.g., "They sunset the product in 2025" as anchor text; "moved to the Atlassian platform" as anchor text
- Plain-language explanation of specialized concepts is a consistent value: Time-of-Use electricity rates, OKR frameworks, object models all get plain-language treatment

Inferred (not directly evidenced):
- Avoid ability-based metaphors (not seen in portfolio, but small sample size)

**[NEEDS INPUT]** No evidence for:
- Formal WCAG reading-level targets
- Specific ARIA copy conventions
- Inclusive language checklist items beyond link text

---

### 3.6 Localization readiness

**[LOW EVIDENCE — the portfolio describes localization constraints Vernon navigated; it doesn't show localization-ready writing directly. The following reflects knowledge about loc, not necessarily personal writing conventions.]**

Inferred from Case Study 1:
- Avoid embedding custom/variable terms mid-sentence when they can be isolated
- Don't assume singular/plural forms cover all localized languages — build in flexibility
- Separate user-customizable terms from surrounding system copy as much as possible

**[NEEDS INPUT]** Whether these constraints are consistently applied to Vernon's own writing, or only known and navigated as a constraint on product design decisions.

---

# PART 4 — Content Patterns & Components

### 4.1 Component patterns

---

**PATTERN-CASECHAPTER: Case study chapter**
- ID: PATTERN-CASECHAPTER
- Purpose: A narrative unit covering one phase of a project — the context, the problem, what was done, and the outcome.
- Required parts: (1) Chapter title, informal/descriptive; (2) tl;dr callout (see PATTERN-TLDR); (3) Context setup — background, constraints, what existed before; (4) Problem statement; (5) Process and decisions; (6) Outcome or outcome preview
- Length: 300–700 words of prose per chapter, supplemented with images, callouts, or lists
- Format: Chapters can be decimal-numbered (4.5, 4.75) to signal sub-phases without breaking the main arc
- Annotated example: "Chapter 4.5: Speed Bumps Incoming…" opens with tl;dr callout, establishes the localization problem, presents three options (with explicit recommendation stance), then names who made the final call and what it was. Failure mode shown: author's recommendation was rejected — this is not softened.
- Common failure modes: Starting with the solution before the context; omitting the tl;dr on a long chapter; presenting outcomes as uniformly positive when they were mixed.

---

**PATTERN-TLDR: tl;dr callout**
- ID: PATTERN-TLDR
- Purpose: Gives time-pressed readers a one-sentence summary before a dense section.
- Required parts: Bold "tl;dr" label + one sentence capturing the core event, decision, or outcome of the section that follows
- Length: One sentence, max two
- Format: Visually distinct block (background-differentiated from body prose); placed at the opening of the section, not the end
- Do: "**tl;dr** Using our single-object-type model in Goals, we created a lightweight type system to introduce custom terms and OKR support. It was not well received."
- Don't: Making the tl;dr a paragraph; making it vague ("We made some changes to the model"); putting it at the end of the section.

---

**PATTERN-OPTIONS: Proposed options list**
- ID: PATTERN-OPTIONS
- Purpose: Shows the decision space when multiple approaches were considered; surfaces the author's recommendation among them.
- Required parts: 3 options in parallel format; [OPTION N]: label + description of what it would mean; at least one option marked with a clear stance ("I did not recommend" or marked as recommended); outcome noted (which option was chosen and by whom)
- Format: Side-by-side or stacked cards; parallel length per option
- Do: Naming "I did not recommend" within the option body, not as an aside. Naming who made the final call if it wasn't the author.
- Don't: Presenting options without indicating which was chosen or why; implying all options were equally viable when they weren't.

---

**PATTERN-PROBLEM-SOLUTION: Numbered problem-solution pairs**
- ID: PATTERN-PROBLEM-SOLUTION
- Purpose: Maps specific customer/user problems to the solution approach taken.
- Required parts: Numbered problem statements from research → lettered sub-item for the SOLUTION: under each problem; solution marked in green/styled text for visual distinction
- Format: Parent numbered list; lettered (a.) nested solutions; solution label in caps or styled distinctly
- Annotated example: Case Study 1, Chapter 4 — three customer feedback themes each get a SOLUTION: that maps to the design decision made.

---

**PATTERN-AUDIENCE-CARD: Audience segment profile**
- ID: PATTERN-AUDIENCE-CARD
- Purpose: Defines a specific audience with their assumptions, psychographics, primary goal, and target message — for use in strategy documents and case study sections.
- Required parts: Segment name + one-line scope definition; Assumptions (about who this person is); Psychographics (emotional state at point of contact); Primary goal (what they're trying to accomplish); Target message (what content should communicate to them)
- Format: Card or visual block; side-by-side when comparing two segments
- Annotated example: Net new Atlassian users vs. Existing Atlassian users in TWC onboarding case study — psychographics contrast clearly ("Overwhelmed" vs. "Annoyed, resistant to change").

---

**PATTERN-UX-CARDHEADLINE: Onboarding card headline format**
- ID: PATTERN-UX-CARDHEADLINE
- Purpose: One-line scannable label conveying the core action/function of a tool or experience — for onboarding card decks.
- Format: `[verb] [object] with [app/tool]`
- Length: Exactly one line; must not wrap in expected display contexts
- Do: Follows format exactly; verb is active and specific to what the app does
- Don't: Starting with a noun; describing a feature rather than an action; wrapping into two lines.

---

**PATTERN-EPILOGUE: Reflective closing**
- ID: PATTERN-EPILOGUE
- Purpose: Closes a case study with a honest reflection on what the project taught, what would be done differently, and what it represents about the craft — not just what was shipped.
- Required parts: Acknowledgment of what worked and what didn't; honest statement of constraints that shaped decisions; one portable insight that generalizes beyond this project
- Tone: More reflective than the chapter narrative; slight shift toward present-tense thinking
- Annotated example: Case Study 1 Epilogue — names the ongoing localization problem, states what the longer-term solution should have been, and closes with a generalized insight about structural thinking in content systems work.
- Do: Make the generalized insight earn its place — it should be a real observation, not a tidy bow.
- Don't: Using the epilogue to praise the outcome; ending with "I learned a lot from this project."

---

### 4.2 Content-type templates

**TEMPLATE-CASESTUDY: Case study page structure**
```
[Title]: [Project type] — [Company]

[Two-column intro]
  Left column: Role | Company | Timeline | Collaborators | Deliverables
  Right column: 2–3 paragraph intro (stakes + entry circumstances + what makes this case study interesting)

[tl;dr / Elevator breakdown section]
  Before/After images or comparable artifact if applicable
  2–3 paragraph narrative summary of what happened and what was accomplished

[Chapters — as many as the project arc requires]
  Each chapter:
    - Title: informal, descriptive, may use subtitle notation (e.g., "Ch. 4.5: Speed Bumps...")
    - tl;dr callout (one sentence)
    - Context (background, constraints, what existed before)
    - Problem
    - Process (decisions, options, pivots)
    - Outcome or outcome preview

[Epilogue]
  Reflection: what it showed, what would change, the portable insight
```

**TEMPLATE-ABOUT: Bio/About section**
```
[Warm greeting + name]
[Career arc in one sentence: from X to Y to Z, but at the core of it all, ___]
[Most recent meaningful work: specific scope, what the system was, what made it hard]
[Current professional interest: one sentence, forward-looking, specific to what's next]
[Implicit or explicit CTA: invitation to connect]
```

---

### 4.3 Microcopy decision rules

Derived from Opower and TWC onboarding case studies:

- IF content is introducing a concept users haven't seen before → THEN explain what it *does* (behavior) not what it *is* (definition), BECAUSE behavioral guidance is more immediately actionable
- IF user is existing and already familiar with the product → THEN skip the re-explanation and focus only on what's new or different, BECAUSE over-explaining to experienced users signals you don't know them
- IF onboarding covers a bundle of apps → THEN define each app's core action individually in one line, BECAUSE bundled apps are confusing unless each one has a single, distinct purpose
- IF content appears in an email → THEN put the primary insight in the headline, BECAUSE email readers scan headlines first and may not read body copy
- IF a modal interrupts a user session → THEN match modal content to the user's entry state (new vs. existing) as specifically as possible, BECAUSE generic onboarding is the worst outcome for existing users who already know the product
- IF humor would work in a given context → THEN use it only if it costs nothing in clarity, BECAUSE humor that lands is efficient; humor that confuses is a net negative and not worth the trade

---

# PART 5 — AI Operational Layer

### 5.1 Explicit decision logic

**Which voice register to use:**
1. Is this portfolio/narrative writing? → Conversational-candid. Use contractions, informal asides, first person throughout.
2. Is this functional UX copy? → Functional register. Match formality to user state (warm for new users; direct for existing or experienced users).
3. Is this a strategy document or stakeholder communication? → Professional-reflective. Same voice, more formal expression. Reduce casual markers.
4. Is this unclear? → Default to conversational-candid and flag the assumption.

**How much context to include before a decision:**
- IF the reader is new to the product or domain → THEN 2–4 sentences of background before the problem statement
- IF the reader likely knows the product context → THEN one sentence maximum; link to additional context if needed
- IF a decision only makes sense given a specific constraint → THEN state the constraint first, then the decision
- IF the constraint was a timeline or leadership pressure → THEN name it plainly; don't euphemize it

**When to use a tl;dr:**
- IF a narrative section is >~300 words → THEN open with a one-sentence tl;dr callout
- IF the section covers a phase with a clear event or outcome → THEN the tl;dr captures that event/outcome specifically
- IF the tl;dr can't be written as one sentence → THEN the section probably covers too much and should be split

**How to describe an outcome honestly:**
- IF outcomes were positive → THEN name the specific metric or signal, not just "it went well"
- IF outcomes were mixed → THEN give the actual breakdown (positive + mixed/positive + negative + no-sentiment categories, as in Case Study 1)
- IF outcomes were negative or the work was cut short → THEN state it plainly and follow with what it showed or what would have come next

### 5.2 Anti-patterns & AI failure modes

---

**ANTI-01: The sanitized narrative**
What it is: Describing a project as a clean arc (problem → solution → success) while omitting failures, pivots, overrules, or ambiguous results.
Why it fails here: Dishonest; misrepresents the actual work. Design/content leadership can tell when a portfolio has been sanitized — it reads like a case for the outcome, not a record of the work.
Corrected: Name the early access failure. Name the PM overrule. Name the localization scramble in the eleventh hour. Those are the story.

---

**ANTI-02: Agent-less passive for decisions**
What it is: "It was decided," "the team landed on," "the solution that was chosen," "it was felt," "a decision was made."
Why it fails here: Removes accountability; obscures what the author contributed vs. what others decided; contradicts the candor trait.
Corrected: Name who decided. "PM decided to go with Option 2." / "I proposed three options." / "Design leadership asked me to take over."

---

**ANTI-03: Enthusiasm opener**
What it is: "I'm thrilled to share," "Excited to announce," "It's my pleasure to present," "Great news!"
Why it fails here: Performative; signals marketing register rather than practitioner register; reads as filler.
Corrected: Open with stakes, context, or the interesting problem. "By this point, pretty much everyone knows what an OKR is."

---

**ANTI-04: Over-explaining to the target audience**
What it is: Explaining what UX writing is. Defining what a content system does. Defining terms the target audience (design/content leadership, hiring managers) demonstrably already knows.
Why it fails here: Signals the writer doesn't know their audience; wastes the reader's time; implies condescension.
Corrected: Trust the audience. Hiring managers and content leadership don't need "UX writing is the practice of writing words that appear in digital products."

---

**ANTI-05: Tech/corporate jargon substitution**
What it is: "Leverage," "synergy," "robust solution," "seamless experience," "innovative approach," "circle back," "move the needle."
Why it fails here: Meaningless filler; sounds like an org chart, not a practitioner. Specific language is always more useful.
Corrected: Use the concrete meaning. "We used Jira's approach to isolating custom terms" not "We leveraged existing paradigms in the ecosystem."

---

**ANTI-06: Hedging without cause**
What it is: "It could be argued that," "in some ways," "one might say" — hedging that avoids committing to a view you actually hold.
Why it fails here: Signals low confidence on a claim you're confident about.
Corrected: State your view directly. If genuinely uncertain, say "I think" or "I believe" and give the reason — that's honest, not weak.

Note: **Hedging IS appropriate when the uncertainty is real** (approximations, estimates, contested interpretations). The anti-pattern is using hedging to avoid accountability, not to signal accurate uncertainty.

---

**ANTI-07: False certainty about ambiguous outcomes**
What it is: "The launch was successful." / "It was well-received." when the actual data was mixed or partial.
Why it fails here: Contradicts the honesty principle; misrepresents ambiguous evidence as clear; opposite problem from ANTI-06.
Corrected: Name the actual data with appropriate precision. "In the first month, we saw ~1,500 success measures created per day, which was strong given the end-of-year timing. Ongoing feedback pointed out further gaps."

---

**ANTI-08: Contribution undersell**
What it is: "I helped with," "I assisted with," "I was involved in," "I participated in" when the author owned or led the work.
Why it fails here: Under-represents contribution in a portfolio context where ownership matters; a different form of dishonesty.
Corrected: Use an accurate ownership verb. "I originated," "I led," "I proposed," "I defined." If you didn't own it fully, say "I contributed to" — that's specific without inflating.

---

**ANTI-09: Structural problem named as a word problem**
What it is: "The naming was confusing" / "the UX was unclear" / "the terminology didn't work" — naming a surface symptom instead of the underlying structural issue.
Why it fails here: Surface-level analysis misses the actual problem; shows craft thinking that stops at symptoms.
Corrected: Describe the structure. "The object model had only one type, so distinguishing sub-goals from Key Results using a type label alone was insufficient — the objects were functionally identical, and no label change could fix that."

---

**ANTI-10: Padding length to appear thorough**
What it is: Adding sentences, qualifications, or background that the reader doesn't need to evaluate the point being made.
Why it fails here: Wastes the reader's time; contradicts the "respect the reader's time" principle.
Corrected: Cut to where the point starts. If a context sentence adds nothing new that the reader doesn't already have, remove it.

---

### 5.3 Lint rules / checkable assertions

**LINT-ERR-01: Agent-less passive for decisions**
- Condition: Find "was decided," "was determined," "was chosen," "it was felt," "it was agreed," "was made" in contexts where a human agent made a decision
- Severity: Error
- Message: Passive construction obscures who made this call. Name the person or role responsible.
- Suggested fix: Identify the decision-maker and name them directly. "PM decided..." / "I proposed..." / "Design leadership chose..."
- Source: GRAM-02, ANTI-02

**LINT-ERR-02: Passive actor in functional UX copy**
- Condition: In UX copy, find "you will be redirected," "users are shown," "a message is sent," "the user is taken to"
- Severity: Error
- Message: Passive construction hides the system actor. Clarify what the product does.
- Suggested fix: "We'll redirect you" / "You'll see a message" / "The app sends..." — use the product or "we" as the subject.
- Source: GRAM-02

**LINT-WARN-01: Banned term**
- Condition: Find "leverage," "seamless," "innovative," "delve," "robust," "synergy," "circle back," "move the needle," "at the end of the day," "low-hanging fruit"
- Severity: Warning
- Message: This term is flagged as corporate/AI filler. Replace with the specific meaning.
- Suggested fix: Replace with the plain equivalent specific to context.
- Source: LEXICON-AVOID

**LINT-WARN-02: Enthusiasm opener**
- Condition: First sentence of a section or piece contains "thrilled," "excited to share," "pleased to announce," "it's my pleasure," "great news"
- Severity: Warning
- Message: Performative opener. Replace with stakes, context, or the actual problem.
- Suggested fix: Remove the opener; start with the relevant information.
- Source: ANTI-03

**LINT-WARN-03: Missing tl;dr on long section**
- Condition: A narrative section >~300 words that doesn't open with a callout/tl;dr block
- Severity: Warning (advisory — requires human judgment on whether section warrants it)
- Message: Long section without a summary opener. Consider adding a tl;dr callout.
- Source: PATTERN-TLDR, PRINCIPLE-05

**LINT-WARN-04: Contribution undersell**
- Condition: In portfolio content, find "I helped with," "I assisted with," "I was involved in," "I participated in" describing work the author owned or led
- Severity: Warning (advisory — verify ownership before flagging)
- Message: This phrasing may undersell your contribution. Verify whether you owned or led this work and use the accurate ownership verb.
- Source: PRINCIPLE-06, ANTI-08

**LINT-WARN-05: Vague outcome claim**
- Condition: Find "successful," "well-received," "positive results," "went well" in an outcome section without supporting evidence or data
- Severity: Warning
- Message: Vague outcome claim. Add the specific data, sentiment breakdown, or evidence that supports this characterization.
- Source: ANTI-07, PRINCIPLE-02

**LINT-WARN-06: Structural problem named as surface symptom**
- Condition: advisory — "the naming was confusing," "the UX was unclear," "the terminology didn't land" without a structural explanation following
- Severity: Warning (advisory)
- Message: This describes a symptom. Consider naming the underlying structural reason the symptom appeared.
- Source: ANTI-09

**LINT-SUGG-01: Em-dash stacking**
- Condition: A sentence contains more than one em-dash
- Severity: Suggestion
- Message: Multiple em-dashes in one sentence create visual noise. Consider restructuring one of the asides.
- Source: GRAM-05

**LINT-SUGG-02: Italic overuse**
- Condition: More than 2 italic instances in a single paragraph
- Severity: Suggestion
- Message: Frequent italics reduce the emphasis signal. Reserve italics for load-bearing stress words.
- Source: GRAM-04

**LINT-SUGG-03: Uncontracted form in body prose**
- Condition: "it is," "we are," "they are," "do not," "did not," "you will" in body prose (not headings)
- Severity: Suggestion
- Message: Uncontracted form adds stiffness. Consider using the contraction.
- Source: GRAM-01

### 5.4 Alignment scoring rubric

**Dimensions:**

| Dimension | What it scores | Weight | Pass threshold |
|---|---|---|---|
| Voice fit | Presence of candor, technical precision, context-richness, self-awareness, understated warmth | 30% | 3 of 5 traits clearly present and not contradicted by opposite behavior |
| Tone fit | Match of formality and register to the specific scenario | 20% | Correct axis position for the content type; no hard-cap violations |
| Mechanics | Grammar, contraction use, active voice, banned term absence | 25% | 0 LINT-ERR; ≤ 2 LINT-WARN |
| Pattern compliance | Correct use of tl;dr, chapter structure, options list, audience cards as appropriate | 15% | Required parts present for the identified content type |
| Honesty/accuracy | Outcomes stated with appropriate precision; no sanitizing; no false certainty | 10% | 0 instances of ANTI-01 or ANTI-07 |

**Output schema:**
```json
{
  "overall": "aligned | partially aligned | not aligned",
  "score": 0-100,
  "dimensions": {
    "voice_fit": { "score": 0-5, "notes": "..." },
    "tone_fit": { "score": 0-5, "notes": "..." },
    "mechanics": { "score": 0-5, "flags": ["LINT-ID", "..."] },
    "pattern_compliance": { "score": 0-5, "notes": "..." },
    "honesty_accuracy": { "score": 0-5, "notes": "..." }
  },
  "flagged_rules": [
    {
      "id": "LINT-ID",
      "severity": "error | warning | suggestion",
      "location": "quoted text or section name",
      "problem": "...",
      "suggested_fix": "..."
    }
  ],
  "rewrite_suggestions": ["..."],
  "summary": "1–2 sentence verdict"
}
```

### 5.5 Output contracts

**Generate workflow output:**
```json
{
  "content_type": "case study chapter | bio | UX copy | onboarding card | ...",
  "draft": "...",
  "rationale": "brief note on key voice/tone choices made and why",
  "rules_applied": ["GRAM-02", "PATTERN-TLDR", "..."],
  "flags": ["any rules that couldn't be fully satisfied, and why"]
}
```
Returns one draft by default. If variants are requested: up to 3, each with its own rationale note.

**Check workflow output:**
```json
{
  "overall": "aligned | partially aligned | not aligned",
  "score": 0-100,
  "findings": [
    {
      "rule_id": "LINT-ERR-01",
      "severity": "error | warning | suggestion",
      "location": "quoted text or section name",
      "problem": "...",
      "suggested_fix": "..."
    }
  ],
  "clean_sections": ["sections with no flags"],
  "summary": "1–2 sentence verdict"
}
```
Ordering in `findings`: errors first, then warnings, then suggestions.
If no issues found: `{ "overall": "aligned", "score": 100, "findings": [], "summary": "No violations found. Content is aligned with voice, tone, mechanics, and pattern standards." }`

### 5.6 Workflow recipes

**Generate recipe:**
1. Identify the content type (case study chapter, bio, UX onboarding copy, error message, etc.)
2. Load the relevant tone row from 2.2 — set formality axis and know what to amplify / suppress
3. Load the relevant pattern from 4.1 / 4.2 if the content type has one
4. Draft using active voice throughout; name all agents; set context before conclusions
5. Self-check: run through LINT-ERR-01 and LINT-ERR-02 — fix any passive constructions
6. Self-check: run through LINT-WARN-01 to LINT-WARN-06 — flag or fix
7. Self-check: review against ANTI-01 through ANTI-10 — does the draft contain any of these patterns?
8. Emit per Generate output contract

**Check recipe:**
1. Identify the content type of the input piece
2. Load the tone row for that content type from 2.2
3. Load all applicable LINT rules
4. Scan for each LINT condition; record location, problem, and suggested fix
5. Score on each rubric dimension
6. Order findings: errors → warnings → suggestions
7. Write the one-sentence summary verdict
8. Emit per Check output contract

### 5.7 Context-gathering & clarifying rules

**Required inputs by content type:**

| Content type | Required inputs |
|---|---|
| Case study chapter | Project name; company; your role; the specific event or problem this chapter covers; what the outcome was (including if it was mixed or negative) |
| Portfolio About/bio | Target audience; current professional situation; what you want the reader to understand or do after reading |
| UX onboarding copy | User segment (new vs. existing Atlassian user, or equivalent); what they're gaining access to; the one core action the tool enables for them |
| UX error copy | What failed; whose fault it is (user, system, or network); what the user can do about it |
| Content strategy doc | Audience(s) and their entry state; product surface; business goal; key constraints (timeline, technical, org) |

**ASK IF:**
- The content type is ambiguous (portfolio narrative vs. functional UX copy apply different rules)
- The intended audience is not specified
- An outcome is requested but it's unclear whether results were positive, mixed, or negative
- The project context is unknown (product, company, timeline, collaborators)
- The content involves a decision — and it's unclear who made it

**Default when asking isn't possible:**
- Assume portfolio narrative register (conversational-candid)
- Assume audience is design/content leadership
- Mark any factual claims about projects, metrics, or outcomes as `[PLACEHOLDER — verify before publishing]`

### 5.8 Guardrails, out-of-scope & escalation

**NEVER (highest precedence in the system — overrides all other rules):**
- Invent project outcomes, metrics, or data not provided as input
- Inflate contribution — "I led" when the context only supports "I contributed to"
- Soften or omit a failure to make a narrative arc look cleaner
- Use passive voice to remove accountability for a decision
- Write enthusiasm openers
- Apply another brand's voice or style guide rules to Vernon's writing (or vice versa — Vernon's rules should not contaminate output for other brands)
- Make legal, medical, or compliance claims of any kind
- Change the meaning of a piece when editing — style edits only unless explicitly asked to restructure

**ESCALATE TO HUMAN WHEN:**
- The task requires stating something uncertain as established fact
- An outcome is needed but no outcome data was provided
- A "NEVER" behavior is being requested — flag it and refuse rather than complying
- Editing would require restructuring the underlying argument (not just style) — flag and ask before proceeding
- The input falls into a coverage gap category (see 6.4) — flag rather than guess

### 5.9 Golden examples corpus

---

**EXAMPLE-01: Case study chapter with failure and ownership**
- Content type: Portfolio case study chapter — decision outcome
- Exemplar (from Case Study 1, Ch. 4.5):
  > "I proposed three different options, with varying degrees of feasibility… So anyway, I lost this battle and PM decided to go with Option 2."
- Why it's exemplary: Names who held each position. Names who made the final call. "I lost this battle" is candid without complaint — it's factual and self-aware. "So anyway" is the right transition — it signals the author has moved on to the outcome without lingering in the disagreement. Zero passive voice.

---

**EXAMPLE-02: Context-first opening that trusts the reader**
- Content type: Portfolio case study introduction
- Exemplar (Case Study 1, intro):
  > "By this point, pretty much everyone knows what an OKR is. Even if they don't understand how the framework *actually* works, they can tell you it stands for Objective and Key Results. But as well-known as it is, it's surprisingly difficult to effectively represent the framework in software."
- Why it's exemplary: Meets the reader exactly where they are — doesn't explain what an OKR is; acknowledges the gap between knowing the acronym and knowing the framework. Establishes the stakes (hard to represent in software) without claiming the problem is unique. "Pretty much everyone" is appropriately hedged; "*actually* works" uses italics to mark the stress word.

---

**EXAMPLE-03: Honest, specific outcome statement**
- Content type: Portfolio case study results section
- Exemplar (Case Study 1, Ch. 5):
  > "From the comments on the community thread announcing the feature and individual posts after the announcement, we can glean the following sentiment breakdown: Positive ~9 posts (~15%), Mixed/positive ~22 posts (~37%), Negative/critical ~18 posts (~30%), No sentiment ~11 posts (~18%)."
- Why it's exemplary: Sources are named (community thread + individual posts). Approximation acknowledged with ~ notation. The negative/critical bucket (30%) is included without spin. The data methodology is transparent ("we can glean" — not "data shows").

---

**EXAMPLE-04: Audience insight driving a content decision**
- Content type: Content strategy narrative
- Exemplar (TWC Onboarding case study, strategy section):
  > "One thing I advocated for in particular was avoiding mention of 'Teamwork Collection' in both the onboarding and general end user experience. The name of the collection made sense for the buyer personas, but for users gaining access to new apps, the name of the bundle that their boss's boss's boss's boss bought would at best be trivial and at worst confusing."
- Why it's exemplary: States the advocacy position clearly and owns it ("I advocated for"). Grounds it in a concrete audience distinction (buyers vs. end users). "Boss's boss's boss's boss" is funnier and more precise than "senior leadership" — the repetition conveys organizational distance viscerally and earns the humor without sacrificing meaning.

---

**EXAMPLE-05: Structural problem diagnosis (not a naming problem)**
- Content type: Portfolio epilogue / reflective closing
- Exemplar (Case Study 1, Epilogue):
  > "The hardest problems aren't the ones that look hard on the surface. The localization issue looked like a translation problem. The object model issue looked like a naming problem. But neither of them were as simple as it might've seemed on the surface — instead, the problem was in the structure and structural problems don't get better by throwing more words and labels at them. They only get better when you take the time to define the right structure first, even when the roadmap is breathing down your neck."
- Why it's exemplary: Uses mirror structure to generalize from specifics. Doesn't overstate the project's importance. Connects tactical detail (localization, object models) to a portable practitioner insight. Shows the depth of thinking the case study is building toward — the last paragraph earns the three chapters of setup that preceded it.

---

# PART 6 — Maintenance & Meta

### 6.1 Glossary of internal terms

| Term | Plain definition |
|---|---|
| Object model | The set of named entities (objects) in a product and their relationships — a product design-level concept |
| Content model | The naming and terminology layer: what objects are called in UI copy, microcopy, and documentation |
| Primitive | Atlassian-specific: the collective noun for all types of a given object class (e.g., "Goals" as primitive encompasses `Goal`, `Objective`, and any other Goal-type) |
| Container | A grouping mechanism within a product app that organizes objects (e.g., a Jira Space, a Confluence Space) |
| OOTB | Out of the box — a default state or configuration that ships with the product without customization |
| TWC | Teamwork Collection — the Atlassian app bundle of Jira, Confluence, and Loom |
| tl;dr | Too long; didn't read — shorthand for a summary callout; used non-ironically as a reader aid |
| Changeboarding | Atlassian-specific: in-product communications designed to orient users through a product change or transition |
| FKA | Formerly known as — used when referencing previous names for products or features |
| Rate Coach | The email communication series for Opower's Time-of-Use electricity behavior-change program |
| NPF | New Product Frameworks — Atlassian's internal incubator program that produced Atlas |
| Platform apps | Atlassian's lighter-weight, platform-native apps: Goals, Projects, Teams (as distinct from premium apps like Jira and Confluence) |
| Content lead | The person on a project or team responsible for content strategy, content direction, and final content decisions |

### 6.2 Versioning & source of truth

- **Version:** 0.1 (initial machine-approximated draft from portfolio content analysis)
- **Created:** 2026-05-29
- **Owner:** Vernon Laquindanum
- **Status:** Draft — requires review and validation by Vernon before use in any automated workflow
- **Source of truth:** This document supersedes any informal style guidance documented elsewhere. When in conflict, this document wins.

### 6.3 Changelog

| Date | Change | Reason | Affected rule IDs |
|---|---|---|---|
| 2026-05-29 | v0.1 created — initial draft approximated from portfolio writing analysis | Bootstrapping a content system from existing writing corpus | All |

### 6.4 Coverage gaps register

The following cases are known gaps where portfolio evidence was insufficient to write a reliable rule. The Check workflow should flag these as "advisory — no rule defined" rather than guessing.

1. **Formal numbers and date formatting** — Very limited portfolio evidence. Conventions for date formats (MM/DD vs. Month DD, YYYY), currency, and number-to-word thresholds not confirmed. Add rules when examples exist.

2. **Inclusive language checklist** — The portfolio is consistent in descriptive link text and plain-language explanations, but doesn't surface enough specific inclusive language examples to write reliable rules. Likely practiced but not observable at scale.

3. **Localization-ready writing conventions** — Vernon clearly understands localization constraints, but the portfolio describes them as a product design problem, not as personal writing habits. Rules for how Vernon writes for localizability (as opposed to how Vernon thinks about it) need direct examples.

4. **Functional error state copy pattern** — No error messages, validation messages, or system failure states in the portfolio sample. LINT-ERR-02 covers active voice in UX copy generally, but a full error pattern (what happened + why + how to fix) is undocumented.

5. **Content strategy document register** — Strategy documents are described extensively but not shown directly. The professional-reflective tone row in 2.2 is inferred, not observed. Needs real examples to validate.

6. **Stakeholder and internal communication register** — No Slack messages, emails, or meeting-artifact writing in the sample. The "professional-candid" tone is inferred from how Vernon recounts stakeholder interactions in case studies, not from first-hand examples.

7. **Upper end of formality** — The portfolio writing represents the relaxed end of Vernon's range. What the professional-reflective end looks like in practice (how much it tightens, what markers shift) is not directly observed. This gap affects 2.2 (tone map) and the Generate recipe for formal content types.

8. **Voice in onboarding video script** — One script was referenced and produced in the TWC case study, but the script content itself wasn't quoted in the portfolio. The video narration pattern has no examples to draw from.
