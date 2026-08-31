---
title: "Context Is a Budget. Most PMs Spend It Like It's Free."
date: "2026-08-31"
description: "A practical guide to token optimization and AI workflow design for product managers: what tokens actually cost you, why more context often produces worse answers, and how to build reusable context so you stop re-explaining your product to a machine."
---

A product manager I'll call Priya finishes a discovery round: 40 customer interviews, transcribed. She opens a chat window, pastes all 40, and types:

> "Analyze these interviews and create a product strategy."

Good output. Then, in the same thread:

> "Now create a PRD."
> "Now create user stories."
> "Now write an executive summary."
> "Now build a roadmap."
> "Now turn it into a presentation."

Six hours later she has a deck. She also has a PRD that contradicts the strategy, user stories that reference a persona the strategy dropped in step two, and an executive summary that confidently cites a pain point mentioned by exactly one interviewee.

The model wasn't slow. It answered every question. The problem is that Priya designed an information flow where the same 40 transcripts got dragged through six different cognitive tasks, where every downstream artifact inherited the drift of the one before it, and where she had no compact, reviewable record of what the research actually said.

**AI productivity is not about asking AI more questions. It's about designing a better information flow between you and the model.**

That's the whole argument. Everything below is the mechanics.

---

## The hidden productivity problem: you can't feel it

Before we get technical, one uncomfortable finding.

In 2025, METR ran a randomized controlled trial with 16 experienced open-source developers across 246 real tasks in repositories they knew well. The developers expected AI tools to make them about 24% faster. Afterward, they estimated they had been about 20% faster. Measured, they took **19% longer** ([METR, 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)).

Read the caveats before you weaponise that number. It's one study, one setting, early-2025 tools, and METR frames it as a snapshot rather than a verdict on AI assistance generally; a follow-up experiment produced an unreliable signal ([METR, 2026](https://metr.org/blog/2026-02-24-uplift-update/)). The evidence also genuinely disagrees with itself: a separate enterprise RCT found developers using AI roughly 21% *faster* ([Paradis et al., 2024](https://arxiv.org/pdf/2410.12944)). Task type and context density appear to matter enormously.

The durable finding isn't "AI slows you down." It's that **perceived speedup and measured speedup can point in opposite directions**. Which means your instinct about whether your AI workflow is working is not evidence. That's the case for treating this as an engineering problem rather than a vibes problem.

---

## What tokens actually are (the accurate version)

A token is a chunk of text the model processes — roughly a word, a word fragment, or a punctuation mark. Anthropic's documentation puts the rough English estimate at **about 4 characters, or 0.75 words, per token**, varying by language and content type ([Claude Platform pricing docs](https://platform.claude.com/docs/en/about-claude/pricing)). A Hindi or Japanese sentence tokenizes differently from its English equivalent; tables, JSON and code differently again.

Three distinctions matter for your workflow:

**Input tokens vs output tokens are priced differently.** Claude Opus 5 is listed at $5 per million input tokens and $25 per million output tokens ([Anthropic model docs](https://platform.claude.com/docs/en/models/opus-5/overview)); Claude Sonnet 5 at $2 and $10 ([Anthropic model docs](https://platform.claude.com/docs/en/models/sonnet-5/overview)). Output is the expensive direction. Asking for a 6,000-word PRD when a 1,200-word one would do is a bigger line item than most people assume.

**The context window is working memory, not a hard drive.** Claude Opus 5 and Sonnet 5 both carry a 1M-token context window with 128k maximum output ([Anthropic](https://platform.claude.com/docs/en/build-with-claude/context-windows)). That's an enormous amount of room. It is not a filing cabinet, and filling it is not free.

**Conversations resend themselves.** In a chat interface, each new turn ships the accumulated history back to the model. Turn 12 of a thread that started with 40 transcripts is not a short prompt. It's 40 transcripts plus eleven exchanges. That's why long threads get slower and vaguer at the same time.

### Why a bigger window doesn't mean better output

This is the part most PMs get wrong.

Chroma's *Context Rot* technical report evaluated 18 models — including GPT-4.1, Claude 4, Gemini 2.5 and Qwen3 — and found that models do not use their context uniformly. Reliability degrades as input length grows, even on simple retrieval and text-replication tasks ([Hong, Troynikov & Huber, Chroma, 2025](https://research.trychroma.com/context-rot)).

The academic version is older and blunter. In *Lost in the Middle*, Liu et al. showed a U-shaped performance curve: models handle relevant information best at the beginning or end of a long input, and significantly worse when it sits in the middle — including in models explicitly built for long context ([Liu et al., TACL 2024](https://aclanthology.org/2024.tacl-1.9/)).

Anthropic's engineering team frames the underlying constraint as an **attention budget**: the transformer architecture creates n² pairwise relationships for n tokens, so as context grows, the model's ability to hold all those relationships gets stretched thin. Every token you add depletes the budget ([Anthropic, *Effective context engineering for AI agents*, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)).

Practical translation for a PM: your critical constraint, buried on page 43 of a pasted PRD, is in the worst possible position in the worst possible format. Pull it out and put it in a five-line constraints block, and it goes from "technically present" to "actually used."

**Context volume** is how much you sent. **Context quality** is how much of what you sent is high-signal, well-placed and unambiguous. They are not correlated. Often they're inversely correlated, because volume comes from dumping and quality comes from curating.

---

## Token optimization ≠ productivity optimization

Keep these separate or you'll optimize the wrong thing.

- **Token optimization:** reducing unnecessary token consumption while holding or improving output quality.
- **Productivity optimization:** reducing total time and effort to a useful outcome.

They usually agree. Sometimes they don't, and when they don't, productivity wins.

**The cheapest prompt is rarely the most productive prompt.** A 600-word prompt that produces a usable PRD in one pass beats a 40-word prompt that needs five rounds of "no, not like that." You paid maybe 500 extra input tokens. You saved four generations, four reviews, and the twenty minutes of context-switching around each one.

So the metric isn't tokens. It's something closer to:

```
outcome quality
──────────────────────────────
your time  ×  iterations  ×  cost
```

Your time is the term with the largest coefficient. A senior PM hour costs vastly more than a million tokens of anything. Token discipline matters mostly because it *buys* fewer iterations and better first drafts, not because tokens are expensive in themselves.

---

## From prompt engineering to context engineering

Anthropic describes context engineering as the natural progression of prompt engineering: prompt engineering is about writing and organizing instructions; context engineering is about curating and maintaining the whole set of information the model sees at inference time — instructions, tools, history, retrieved documents. Prompt writing is a discrete task. Context curation happens every time you decide what to pass ([Anthropic, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)).

For a PM, that reframes the daily question. Not "what should I ask?" but **"what should the model be looking at when I ask?"**

Here's the same request in both modes.

**Volume mode:**

> "Here's our company strategy deck, the 100-page PRD for the current release, all 40 interview transcripts, an analytics export, and our last three planning docs. What feature should we build next?"

**Curated mode:**

> "Current objective: reduce time-to-first-invoice for new SMB accounts from 9 days to 3.
> Target persona: solo operator, no finance staff, does onboarding in evenings.
> Validated pain points (evidence count in brackets): manual bank linking [17/40], unclear tax-profile step [12/40], no way to resume a half-finished setup [9/40].
> Constraints: 2 sprints of capacity, must use existing auth, cannot change the billing provider.
> Evaluate these three opportunities against reach, confidence, effort and strategic fit. Flag any evidence gap that would change the ranking."

The second is shorter *and* better. It's better because every line is decision-relevant, the evidence is quantified, and the constraints are stated rather than buried.

A five-part taxonomy for anything you're about to send:

| Information type | What to do with it |
|---|---|
| Critical constraints | Keep, verbatim, near the top |
| Current objective and decision | Keep |
| Key evidence (structured, counted) | Keep |
| Large raw documents | Summarize once, or retrieve on demand |
| Repeated explanations | Remove |
| Historical background | Compress into two or three lines |
| Irrelevant context | Remove |
| Frequently reused context | Cache or reuse where the system supports it |

**A note on the framing:** "prompt engineering → context engineering → workflow engineering" is how I find it useful to think about the progression, and the first two steps track how Anthropic describes the field. The third step is my own extension, not an established taxonomy. Treat it as an analytical lens, not a citation.

---

## The PM AI Context Budget

Before you send anything substantial, seven questions. They take about a minute.

1. Does the model need this at all?
2. Does it need *all* of this, or a summary?
3. Can this be structured instead of narrated?
4. Is this already somewhere earlier in the thread?
5. Is this actually relevant to *this* decision?
6. Could this be retrieved on demand instead of pasted?
7. Will I need this again next week — and if so, should it be a reusable artifact?

Question 7 is the one that compounds.

---

## Prompt design: the structure that kills iterations

Most re-generation happens because the model made an assumption you didn't want and you didn't discover it until you read the output. A prompt structure that surfaces assumptions before generation is the single highest-leverage change most PMs can make.

**Context → Objective → Constraints → Inputs → Process → Output → Evaluation**

Weak:

> "Create a PRD for this feature."

Strong:

> **Context:** B2B invoicing product for SMBs in India. Self-serve onboarding, no sales assist.
> **Objective:** Increase 7-day activation from 34% to 50%.
> **Problem:** New users abandon at the bank-linking step; 17 of 40 interviewees named it unprompted.
> **Constraints:** 2 sprints; must use the existing auth flow; cannot change the billing provider; must work on 3G.
> **Task:** Write a PRD.
> **Include:** problem statement, goals and non-goals, user stories, functional requirements, edge cases, success metrics.
> **Process:** Before writing anything, list any missing information that would materially change the solution. Then wait for my answers.
> **Evaluation:** A good PRD here is one an engineer could estimate without asking me a clarifying question.

Why the second works: the constraints prevent whole categories of unusable output. The evaluation criterion tells the model what "done" means. And the *Process* line — asking for missing information first — turns a bad four-iteration cycle into a good two-step one. That single instruction is worth more than every other token-saving trick in this article.

---

## Task decomposition: one prompt, one cognitive job

Bad:

> "Analyze the research, identify the core problem, build a strategy, prioritize features, write the PRD, and produce a launch plan."

That's six different kinds of thinking. The model will do all six, and it will do most of them at 70%.

Anthropic's own prompting guidance recommends chaining: break complex work into sequential subtasks so each gets full attention, which improves accuracy, clarity and traceability, and lets you fix one broken step without redoing everything ([Anthropic prompt engineering docs](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/chain-prompts)).

For discovery-to-delivery, the chain looks like:

```
Raw research → structured evidence → themes → problem definition
→ opportunity assessment → prioritization → strategy → PRD → launch plan
```

Each arrow is a checkpoint where you review a compact artifact instead of a wall of prose. Each artifact becomes the input to the next step, which means you stop resending the raw material.

When is one big prompt fine? When the task is genuinely one job (reformat this, summarize that, draft this email), or when the steps are so tightly coupled that splitting them loses more than it gains. Chaining costs you wall-clock time and adds handoff points. Don't chain a two-minute task into six.

---

## Sixteen techniques that actually move the needle

**1. Extract before you analyze**
*Problem:* raw transcripts get re-read on every question. *Technique:* run one extraction pass into a structured evidence table, then work from the table. *Example:* 40 interviews → a 60-row table of `quote | pain point | severity | segment | interview ID`. *Why:* one expensive pass replaces six. *Trade-off:* extraction errors propagate silently; spot-check 10% against source.

**2. Build a Product Context Block**
*Problem:* you re-explain the product every session. *Technique:* maintain one 300–500 word block: objective, persona, constraints, key metrics, terminology. *Example:* paste it once at the top of a session, then ask five different questions. *Why:* the model's picture of your product stays stable across every artifact. *Trade-off:* stale blocks poison everything downstream — date them and review monthly.

**3. Separate permanent context from task context**
*Problem:* everything gets mixed into one blob. *Technique:* two blocks — what's always true, and what's true for this decision. *Example:* Product Context Block (permanent) + "this sprint we're deciding between A and B" (task). *Why:* permanent context becomes cacheable and reusable; task context stays small. *Trade-off:* requires discipline about which bucket a fact belongs in.

**4. Ask for missing information before generating**
*Problem:* the model fills gaps with plausible invention. *Technique:* "List what's missing that would materially change your answer, then stop." *Example:* before any PRD or strategy doc. *Why:* converts a wrong 2,000-token output into a right one. *Trade-off:* adds a turn; skip it for low-stakes drafts.

**5. Specify output length and format up front**
*Problem:* you get 3,000 words and want 800. *Technique:* state the format and the ceiling. *Example:* "Max 800 words. Markdown. Table for the comparison." *Why:* output tokens are the priciest and slowest part of the request. *Trade-off:* over-constraining truncates genuinely useful nuance.

**6. Use tables instead of prose for structured facts**
*Problem:* narrative descriptions of comparable things are verbose and hard to scan. *Technique:* structure anything with repeated fields. *Example:* competitor matrix instead of five competitor write-ups. *Why:* higher information density per token, for you and the model. *Trade-off:* tables flatten causal nuance; add a short "what this misses" note.

**7. Reuse intermediate artifacts**
*Problem:* every deliverable is generated from raw material. *Technique:* treat the evidence table, opportunity matrix and context block as durable inputs. *Example:* one opportunity matrix feeds the strategy, the PRD *and* the exec summary. *Why:* consistency across artifacts, and a fraction of the context. *Trade-off:* an error in a shared artifact appears in every child document.

**8. Summarize the thread instead of continuing it**
*Problem:* turn 20 carries nineteen turns of history. *Technique:* ask for a compact state summary, then start fresh with it. *Example:* "Summarize decisions made, open questions, and constraints in under 300 words." *Why:* Anthropic calls this compaction and uses it in Claude Code for exactly this reason ([Anthropic, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)). *Trade-off:* aggressive compaction drops details whose importance only becomes clear later.

**9. Don't paste the same document twice**
*Problem:* re-attaching a doc "so it's fresh." *Technique:* reference it — it's already in the thread. *Example:* "Using the PRD above, list edge cases." *Why:* duplicate content doubles cost and creates contradictory anchors. *Trade-off:* in very long threads, a targeted re-quote of five key lines genuinely helps.

**10. Right-size the model to the job**
*Problem:* frontier model for a reformatting task. *Technique:* route by cognitive difficulty, not by habit. *Example:* strong model for trade-off analysis; fast model for turning a decision log into a Slack update. *Why:* covered in detail below. *Trade-off:* switching costs attention; don't micro-optimize.

**11. Retrieve instead of paste for large knowledge bases**
*Problem:* pasting the whole support-ticket export. *Technique:* retrieval over a corpus. *Example:* "find tickets mentioning bank linking in the last 90 days." *Why:* only relevant chunks enter context. *Trade-off:* retrieval quality becomes a new failure mode; see the RAG section.

**12. Front-load the important stuff**
*Problem:* constraints buried mid-prompt. *Technique:* objective and constraints at the top; bulk material below. *Example:* five-line constraints block, then the evidence table. *Why:* the U-shaped attention curve is real ([Liu et al., 2024](https://aclanthology.org/2024.tacl-1.9/)). *Trade-off:* none worth mentioning. Just do it.

**13. Define evaluation criteria before generating**
*Problem:* you only know what you wanted after seeing what you got. *Technique:* write the acceptance test into the prompt. *Example:* "An engineer should be able to estimate this without asking a question." *Why:* the model optimizes for a target instead of guessing. *Trade-off:* forces you to actually know what you want, which is the point.

**14. Edit, don't regenerate**
*Problem:* one bad section triggers a full rewrite. *Technique:* ask for a surgical revision. *Example:* "Rewrite only the success metrics section; leave everything else." *Why:* full regeneration costs full output tokens and reintroduces drift in sections you'd already accepted. *Trade-off:* patched documents can lose coherence; do one full read before shipping.

**15. Keep a single source of truth**
*Problem:* four versions of the product context in four threads. *Technique:* one canonical doc that every session starts from. *Example:* a `product-context.md` you paste or attach. *Why:* eliminates the "which version did I tell it?" problem entirely. *Trade-off:* someone has to own updating it.

**16. Exploit prompt caching where the system supports it**
*Problem:* the same stable prefix reprocessed every call. *Technique:* keep reused content byte-identical and at the front. *Example:* company context, glossary, output template. *Why and trade-offs:* see below — behaviour differs sharply by provider.

---

## PM workflows, before and after

The techniques are only worth anything inside a workflow. Here's what changes across the seven places PMs use AI most.

| Workflow | Before | After |
|---|---|---|
| **Product discovery** | Paste all interviews → ask for themes → paste again → ask for personas → paste again → ask for opportunities | One extraction pass into an evidence table (`quote / pain / severity / segment / ID`), then themes, personas and opportunities all derived from the table |
| **PRD creation** | Re-explain product, problem, goals, non-goals, constraints and personas in every prompt | Product Context Block once per session, then generate PRD, user stories, acceptance criteria, edge cases, FAQs and launch checklist off the same block |
| **Competitive analysis** | Dump three competitor reports into every strategic question | One structured matrix — company, target customer, core problem, features, pricing, differentiation, strengths, weaknesses, evidence, source date — then reason over the matrix |
| **User research** | Ask the model to re-derive insights from raw data each time | A fixed pipeline: raw → structured evidence → themes → insights → opportunities → hypotheses → decisions, with each stage saved |
| **Stakeholder comms** | Write the exec summary, Slack update, email, review doc and eng brief from scratch | One decision record; generate six audience-shaped views from it in one session |
| **Analytics** | Re-explain the whole product before every metric question | A metric-definitions block plus business context, reused for interpretation, hypothesis generation, experiment design, root-cause analysis and SQL help |
| **Meeting prep** | Skim six documents an hour before | Feed previous decisions, open questions, stakeholder concerns and current metrics; get a one-page brief with the three questions likely to be asked |

Note the pattern. In every row, the "after" version isn't a cleverer prompt. It's a **durable artifact** that the prompt points at.

---

## Model selection is a token strategy

The strongest available model is not always the right one, and choosing well is itself an optimization.

**Reach for a stronger reasoning model when:** the problem is ambiguous, the trade-offs are genuinely contested, the stakes are high, the analysis spans many interacting constraints, or you're pressure-testing a strategy you're about to defend to a leadership team.

**Reach for a faster, cheaper model when:** the task is summarization, reformatting, classification, extraction against a clear schema, drafting repetitive content, or transforming structured data you've already validated.

Two practical notes. First, capabilities, prices and context windows change fast — Anthropic's own model lineup has shifted repeatedly in the last year, so verify against current documentation ([Claude models overview](https://platform.claude.com/docs/en/about-claude/models/overview)) before you standardize a routing rule. Second, in most consumer chat interfaces the choice is a dropdown, not an API parameter; the discipline is remembering the dropdown exists.

---

## RAG and retrieval: when not to paste

Retrieval-augmented generation, introduced by [Lewis et al. (NeurIPS 2020)](https://arxiv.org/abs/2005.11401), combines a language model with a retrieval system so that relevant external content is fetched at query time rather than baked in. The PM-relevant idea is simple: **instead of sending everything, retrieve only what matters.**

Good PM candidates for retrieval rather than pasting: product documentation, the full research archive, policy and compliance docs, the support-ticket corpus, competitive intelligence, and any internal knowledge base that changes weekly.

Anthropic's teams describe a shift toward "just-in-time" context — keeping lightweight references and loading data at runtime rather than pre-loading everything, sometimes blended with upfront retrieval for speed ([Anthropic, 2025](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)).

The trade-offs are real and worth stating plainly:

- **Retrieval quality** becomes your new bottleneck. If it fetches the wrong three chunks, the answer is confidently wrong.
- **Relevance ≠ completeness.** Retrieval is bad at questions that need the whole corpus ("what changed across all 40 interviews?").
- **Latency and complexity** go up. You've added a system to maintain.
- **Freshness** is a genuine advantage — the index updates, your pasted PDF doesn't.

Rule of thumb: retrieve when the corpus is large, stable and queried repeatedly. Paste when the material is small, one-off and needs to be read whole.

---

## Prompt caching: real, useful, and provider-specific

If you repeatedly send the same stable prefix — company context, glossary, output template, evaluation criteria — some systems can reuse the already-processed version rather than reprocessing it.

The mechanics differ by provider, and the details matter:

- **Anthropic** offers automatic caching and explicit cache breakpoints. Default cache lifetime is 5 minutes, with a 1-hour option at higher cost. Cache reads are priced at 0.1× base input tokens; 5-minute cache writes at 1.25×, 1-hour writes at 2×. Minimum cacheable prompt length varies by model — 512 tokens for Claude Opus 5, 1,024 for Sonnet 5, 4,096 for Haiku 4.5. Cache hits require a 100% identical prefix ([Anthropic prompt caching docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)).
- **OpenAI** applies caching automatically on supported models above a minimum prefix length (1,024 tokens for GPT-5.6 and later, 2,048 for older models), with cached input discounted up to 90% and reduced time-to-first-token ([OpenAI prompt caching guide](https://developers.openai.com/api/docs/guides/prompt-caching)).
- **Google** enables implicit caching by default on Gemini 2.5 and newer, with a 90% discount on cached tokens, plus explicit caching that guarantees the discount but adds storage cost ([Google Cloud context caching docs](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview)).

Three things a PM should take from this:

1. **Caching rewards stability.** Change one character in your context block and the cache misses. That's an argument for a canonical, versioned block rather than a slightly-different paste each time.
2. **Order matters.** Stable content first, variable content last. Putting today's date at the top of an otherwise-static block defeats the entire mechanism.
3. **Most of this is API-level.** If you work in a chat interface, you don't control breakpoints. The transferable habit is structural: stable prefix, variable suffix.

Verify all of the above against current provider documentation before building anything on it. These numbers change.

---

## AI workflow compounding

The biggest gains don't come from one brilliant prompt. They come from artifacts that keep paying out.

Build these once, refine them over a quarter:

- Customer research extraction template
- Product Context Block
- PRD generation prompt with your team's section structure
- Competitive matrix schema
- Experiment design template
- Meeting prep prompt
- Product review and launch checklist prompts

Each one is unremarkable in isolation. Together they become an operating system: a PM who has them starts every task from a warm start, while a PM without them starts every task by explaining their product to a stranger. Over a year that gap is not a productivity difference. It's a capability difference.

### The PM AI Operating System

| Layer | Contains | Changes |
|---|---|---|
| **1. Persistent context** | Company, product, personas, strategy, constraints | Quarterly |
| **2. Knowledge** | Research, analytics, competitors, feedback, docs | Weekly — retrieve, don't paste |
| **3. Task context** | Current problem, objective, decision | Per task |
| **4. Execution** | Prompt structure, model choice, tools, output format | Per task |
| **5. Evaluation** | Accuracy, completeness, decision usefulness | Every output |

The layers work because each has a different change frequency. Layer 1 is stable enough to cache and reuse. Layer 2 is too big and too volatile to paste, which is exactly what retrieval is for. Layer 3 is small by construction. Most bad AI workflows collapse all three into one giant paste, which is why they're simultaneously expensive and vague.

Layer 5 is the one PMs skip. Given the perception gap in the METR data, evaluating outputs against a stated standard — rather than against how impressive they feel — is not optional rigor. It's the only thing standing between you and confidently shipping a strategy built on one interviewee's offhand comment.

---

## Case study: three features, thirty interviews

*Fictional but realistic. All numbers below are **illustrative estimates** used to show the shape of the difference, not measured results.*

A PM at a B2B SaaS company must choose between Feature A (bulk import), Feature B (approval workflows) and Feature C (mobile approvals). She has 30 customer interviews, product analytics, a support-ticket export, competitor material and a hard two-sprint constraint.

**Traditional workflow.** Paste everything into one thread. Ask for analysis, then a recommendation. Disagree. Re-paste the analytics with more explanation. Get a different recommendation. Ask for a PRD for Feature B, notice it assumes a permissions model that doesn't exist, re-explain, regenerate. Build the exec summary from scratch because the thread is now too messy to trust.

**Optimized workflow.**
1. One extraction pass over 30 interviews → evidence table (30 rows, ~1,200 words).
2. One pass over support tickets → frequency counts by theme.
3. Write a 400-word Product Context Block, including the permissions constraint that broke the first attempt.
4. Build an opportunity matrix: opportunity × evidence count × affected segment × estimated effort × strategic fit.
5. Write decision criteria *before* asking for a recommendation.
6. One focused prompt: context block + matrix + criteria + "flag any evidence gap that would change the ranking."
7. Generate the PRD from the decision, not from the raw research.

| Illustrative comparison | Traditional | Optimized |
|---|---|---|
| AI interactions | ~25 | ~8 |
| Typical context per request | Very large, mostly raw | Small, mostly structured |
| Elapsed PM time | ~6 hours | ~3 hours |
| Rework | High — repeated re-explanation | Low — errors caught at artifact boundaries |
| Consistency across artifacts | Poor — each drifts | High — all derive from shared artifacts |
| Auditability | None | The evidence table survives the conversation |

That last row is the one that matters most and gets discussed least. In the traditional workflow, when a VP asks "how many customers actually said that?", the answer lives inside a chat thread nobody can reconstruct. In the optimized one, it's a row count.

---

## The 60-second checklist

Before sending a large prompt:

- [ ] Can I remove anything?
- [ ] Can I summarize anything?
- [ ] Can I structure this instead of narrating it?
- [ ] Am I repeating context that's already in the thread?
- [ ] Does the model actually need this to answer *this* question?
- [ ] Could this be retrieved instead of pasted?
- [ ] Can I reuse an artifact I already have?
- [ ] Am I on the right model for this task?
- [ ] Do I know what a good answer looks like?
- [ ] Have I defined the output clearly enough to avoid another round?

---

## Common mistakes

**Treating the context window as a target.** A 1M-token window is headroom, not an instruction.

**Confusing fluency with accuracy.** A well-written strategy built on thin evidence reads exactly like a well-written strategy built on strong evidence. Only the evidence table tells you which one you have.

**Optimizing for token count instead of outcomes.** Shaving 200 tokens off a prompt that then needs three more rounds is a loss.

**Letting one thread accumulate forever.** Summarize and restart. Threads decay.

**Never updating the context block.** A six-month-old Product Context Block that still names a deprecated metric will quietly corrupt every output derived from it.

**Believing your own speedup estimate.** See METR. Measure something — cycle time to a shippable PRD, number of regenerations, rework rate — rather than trusting the feeling.

---

## Final principles

1. Context is a budget. Spend it on decision-relevant information.
2. The cheapest prompt is not the most productive prompt. Optimize for outcome per hour.
3. More context is not better context. Curation beats volume.
4. Structure once, reuse many times. Artifacts compound; prompts don't.
5. One prompt, one cognitive job.
6. Ask what's missing before you ask for output.
7. Retrieve large corpora; paste small ones.
8. Front-load what matters. Attention is uneven.
9. Right-size the model to the task.
10. Measure the workflow, because your intuition about it is unreliable.

Priya's real problem was never the 40 transcripts. It was that she treated a language model as a very fast reader instead of a very fast reasoner, and gave it the job that a structured evidence table should have done once. The next productivity advantage for product managers isn't better prompt-writing. It's noticing which parts of your thinking should become durable artifacts — and building them before you need them.

---

## Sources & further reading

**Anthropic, *Effective context engineering for AI agents* (Sep 2025)** — [link](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). Supports the attention-budget framing, context engineering vs prompt engineering, compaction, structured note-taking, and just-in-time retrieval.

**Hong, K., Troynikov, A. & Huber, J., *Context Rot: How Increasing Input Tokens Impacts LLM Performance*, Chroma (Jul 2025)** — [link](https://research.trychroma.com/context-rot). Supports the claim that model reliability degrades non-uniformly as input length grows, across 18 evaluated models.

**Liu, N. F. et al., *Lost in the Middle: How Language Models Use Long Contexts*, TACL vol. 12 (2024)** — [link](https://aclanthology.org/2024.tacl-1.9/). Supports the U-shaped attention curve and the front-loading recommendation.

**Anthropic, *Prompt caching* — Claude Platform docs (accessed Aug 2026)** — [link](https://platform.claude.com/docs/en/build-with-claude/prompt-caching). Supports all Anthropic caching figures: TTLs, 0.1×/1.25×/2× multipliers, per-model minimums, exact-prefix matching.

**OpenAI, *Prompt caching* — API docs (accessed Aug 2026)** — [link](https://developers.openai.com/api/docs/guides/prompt-caching). Supports OpenAI's automatic caching, minimum prefix lengths and discount range.

**Google Cloud, *Context caching overview* (accessed Aug 2026)** — [link](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview). Supports implicit/explicit caching behaviour and the 90% cached-token discount.

**Anthropic, *Pricing* and *Models overview* — Claude Platform docs (accessed Aug 2026)** — [pricing](https://platform.claude.com/docs/en/about-claude/pricing), [models](https://platform.claude.com/docs/en/about-claude/models/overview). Supports the ~4 characters / 0.75 words per token estimate and current model pricing and context windows.

**Anthropic, *Chain complex prompts for stronger performance*** — [link](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/chain-prompts). Supports the task-decomposition section.

**Lewis, P. et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*, NeurIPS 2020** — [link](https://arxiv.org/abs/2005.11401). Original RAG paper; supports the retrieval section.

**METR, *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity* (Jul 2025)** and the [Feb 2026 update](https://metr.org/blog/2026-02-24-uplift-update/) — [link](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/). Supports the perception-vs-measurement gap, with the authors' own caveats.

**Paradis, E. et al., *How much does AI impact development speed? An enterprise-based randomized controlled trial* (2024)** — [link](https://arxiv.org/pdf/2410.12944). Included deliberately because it disagrees with METR, reporting roughly 21% faster completion. The honest summary of the literature is that measured AI productivity effects vary by task type and context density, and no single number generalizes.
