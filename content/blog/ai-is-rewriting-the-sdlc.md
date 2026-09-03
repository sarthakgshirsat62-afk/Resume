---
title: "Your AI Coding Tool Isn't the Bottleneck. Your Review Queue Is."
date: "2026-09-03"
description: "Google's DORA team just put a price tag on AI-assisted development, and it comes with a J-curve, a verification tax, and an uncomfortable question about legacy code. Here's what the data actually says."
---

Every vendor deck I've sat through in the last eighteen months has the same slide. Big number. Usually starts with a 3 or a 5. Usually followed by an X. "5x developer productivity." Someone in the back nods. Someone in finance writes it down.

Then the pilot ships, and six months later the engineering org is somehow *slower*, the review queue looks like a Mumbai local at 6pm, and nobody can explain where the 5x went.

I've been trying to figure out why. The good news is that 2026 has given us actual research instead of vibes. The bad news is that the research is a lot less flattering than the slide.

Let's go through it.

---

## The report that reframed the question

In May 2026, Google Cloud's DORA team published **[The ROI of AI-Assisted Software Development (2026.01)](https://dora.dev/ai/roi/report/)**, a follow-up to their [2025 State of AI-Assisted Software Development report](https://dora.dev/dora-report-2025). It's the first serious attempt I've seen to translate "AI makes devs faster" into a number a CFO can hold.

The central claim, from DORA team lead Nathen Harvey, is that AI is an **amplifier**, not an engine. The biggest returns don't come from the tool. They come from the system the tool lands in: the quality of your internal platform, how clear your workflows are, whether your teams are aligned. Without that foundation, you get little islands of productivity that drown in downstream chaos. ([InfoQ's write-up](https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/) is a good summary if you want the short version.)

This echoes the 2025 finding exactly: AI magnifies whatever your organisation already is. High performers get better. Struggling orgs get more efficiently dysfunctional.

If you take one thing from this post, take that. Everything below is a footnote to it.

---

## The J-curve, or: why quarter two looks like a disaster

Here's the shape that should be on every AI adoption roadmap and is on approximately none of them.

DORA describes a **J-curve of value realisation**. Adopt AI, and most organisations dip *before* they climb. Productivity goes down first. The report is blunt about calling this the tuition cost of transformation, and warns that leaders who mistake the dip for failure will kill funding right before the payoff arrives.

Three things cause the dip:

1. **The learning curve.** Teams have to rewire how they work, not just install an extension.
2. **The verification tax.** More on this in a second, because it's the important one.
3. **Downstream process strain.** Testing, change approval, and release pipelines were sized for human-volume code. They are now receiving machine-volume code.

DORA notes this J-curve isn't new. The same pattern showed up in earlier research on continuous delivery and platform engineering. Every genuinely useful practice change costs you something before it pays.

### The verification tax

This is my favourite concept from the report, because it names a cost everyone feels and nobody budgets for.

The verification tax is the effort required to check whether AI-generated code is actually reliable, secure, and architecturally sane. Not "does it compile." Does it belong in your system.

And here's the thing about that tax: it lands on a *different person* than the one who got the speedup. The developer who generated the code got faster. The reviewer who now has to read 400 lines that nobody wrote got slower. Congratulations, you've moved the bottleneck downstream and called it a productivity gain.

DORA also flags an **instability tax**. The 2025 research found AI adoption correlated with improved individual effectiveness *and* increased delivery instability. In DORA's own sample ROI model, they assume change failure rate creeps from 5% to 6% after AI adoption, and that single percentage point shows up as a **negative $344,000** line item for downtime. Their argument isn't "so don't adopt AI." It's "so fund your automated testing, CI, and small-batch discipline first."

---

## The number that should worry you most

Buried in the DORA report is research from Stanford's Software Engineering Productivity programme, and it's the finding I keep coming back to.

AI delivers a **35–40% productivity gain on simple, greenfield tasks**. On **complex legacy code, the gain is often 10% or less**.

Sit with that for a second, because it detonates most enterprise business cases.

Where does your engineering org actually spend its time? Not building shiny new microservices from an empty folder. It's spent inside a fifteen-year-old billing system with three generations of architectural decisions fossilised into it and a test suite that everyone is quietly afraid of.

That's where AI helps least. The demo happens in the greenfield. The work happens in the swamp.

So when a vendor benchmark shows a beautiful number, my first question is now always the same: *what was the codebase?* If the answer is a fresh repo and a self-contained task, that number tells you nothing about your Tuesday.

---

## The bottleneck moved, and the data shows exactly where

Two independent datasets tell the same story from different angles.

### GitClear: the maintainability gap

GitClear analyses one of the largest structured code-change datasets around. Their [2026 research, "The Maintainability Gap"](https://www.gitclear.com/the_ai_code_quality_maintainability_gap), tracks seven code-quality signals across 2023–2026, and the trend lines are ugly:

| Signal | Then | Now |
|---|---|---|
| Copy/pasted code | 9.4% of changed lines (2022) | **15.7%** (H1 2026) |
| "Moved" code (a refactoring proxy) | 21% (2022) | **3.8%** (2026 YTD) |
| Duplicated blocks per million changed lines | 40.3 (2023) | **73.0** (2026 YTD) |

Refactoring didn't decline. It collapsed. It fell to roughly a sixth of what it was four years ago, while copy/paste rose to nearly the highest level on record and block duplication hit an all-time high, up 81% over 2023.

GitClear calls duplication a **propagation tax**, and the phrase is exactly right. Change one copy of a five-line block and you inherit an obligation to hunt down every sibling across files and domains you may not know, and decide whether the fix has to travel. That cost never shows up in a velocity dashboard. It shows up eighteen months later as an incident.

One more GitClear finding that deserves more attention than it gets: in their [January 2026 analysis](https://www.gitclear.com/the_ai_code_quality_maintainability_gap), heavy AI users out-produce non-users by 4–10x. Sounds incredible. Except most of that gap **pre-dated AI**. Compared to their own past selves, heavy AI users gained a much more modest ~25%. AI tools are disproportionately adopted by people who were already top performers. If you're benchmarking tool impact by comparing adopters to non-adopters, you are measuring who your best engineers are, not what the tool did.

### Stack Overflow: the "almost right" problem

Stack Overflow's [2025 Developer Survey](https://survey.stackoverflow.co/2025/ai) pulled in over 49,000 responses across 177 countries. The single biggest AI frustration, cited by **66% of developers**, is AI output that's almost right but not quite. Second place, at **45%**: debugging AI-generated code takes more time than expected.

That specific failure mode is the expensive one. Obviously broken code is cheap. It fails the build, you fix it, you move on. Plausible-looking code that passes a casual read and breaks on an edge case three sprints later requires full-scrutiny review, which is precisely the time you were hoping to save.

The supporting numbers point the same direction. Positive sentiment toward AI tools fell from 70%+ in 2023–24 to 60% in 2025. Only 29% of developers believed AI could handle complex problems, down from 35% the year before. And 75% said they'd still ask a human when they don't trust the AI's answer. ([Stack Overflow's own summary is here.](https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/))

Adoption is near-universal. Trust is not. Those two facts coexisting *is* the story.

---

## The honest caveat: what happened to the 19% study

You may have seen the METR study cited everywhere in 2025. [A randomized controlled trial](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) ([arXiv](https://arxiv.org/abs/2507.09089)) put 16 experienced open-source developers through 246 real tasks in repos they'd worked on for an average of five years. They forecast AI would make them 24% faster. Afterwards, they estimated it had made them 20% faster. Measured result: **19% slower.**

It became the internet's favourite AI-skeptic stat. I've used it myself.

Here's the part almost nobody cites. In [February 2026, METR published an update](https://metr.org/blog/2026-02-24-uplift-update/) saying they're redesigning the experiment. Their second study (57 developers, 143 repos, 800+ tasks) hit a wall: developers increasingly refuse to participate because they don't want to work without AI, and 30–50% told researchers they were deliberately not submitting tasks where AI would help most, in case those tasks got randomised into the no-AI bucket.

The raw second-study numbers actually show *speedup* — roughly 18% for returning participants, ~4% for new recruits — but with confidence intervals wide enough to drive a bus through. METR's own read: developers are probably more sped up in early 2026 than in early 2025, but the selection effects make their estimate a weak lower bound.

I'm including this because good PM practice means citing the update, not just the headline that supports your prior. The 19% figure is a real result from a real RCT about early-2025 tools. It is not a permanent verdict on AI-assisted development, and METR is the first to say so.

---

## So what do you actually do on Monday?

DORA's illustrative model is worth knowing, with the caveat that they explicitly call it a high-uncertainty conversation starter rather than a formula. For a 500-person engineering org at $176,000 fully-loaded per head: roughly **$11.6M in first-year value against $8.4M of investment**, a **39% ROI**, and about an **eight-month payback**. They've also published an [interactive calculator](https://dora.dev/ai/roi/calculator) and recommend running conservative, realistic, and optimistic scenarios rather than committing to one number in front of your finance team.

Six things I'd do with that:

1. **Budget for the dip.** Put the J-curve in the roadmap and tell your exec sponsor about it *before* quarter two, not during it. A dip you predicted is a plan. A dip you didn't is a failed initiative.
2. **Fund the review side.** If you're spending on code generation and nothing on review capacity, automated testing, or CI, you're buying a faster hose and keeping the same bucket.
3. **Segment your ROI by codebase.** Greenfield and legacy are different products with different economics. One expected 35–40%, the other 10% or less. Averaging them produces a number that's wrong for both.
4. **Stop measuring lines and PR counts.** They were mediocre proxies before. With AI they're actively misleading. Measure delivery-level outcomes: cycle time, change failure rate, rework, and duplication as a quality signal.
5. **Watch duplication like a hawk.** Block duplication at an all-time high with refactoring at 3.8% is a debt curve, and debt curves are quiet right up until they aren't.
6. **Don't confuse tool impact with talent distribution.** Compare teams to their own past baselines, not to the colleagues who haven't adopted yet.

---

## The actual takeaway

The most interesting sentence in the DORA report isn't about AI at all. It's the observation that ROI is no longer about how many developers you can replace. The report actively discourages headcount reduction as a strategy, arguing that retaining and training existing staff is more cost-effective and preserves institutional knowledge you can't rebuild.

Which brings us back to the amplifier thing.

If your platform is solid, your workflows are clear, and your review process can absorb the volume, AI will make a good engineering org visibly better. If your internal platform is held together by tribal knowledge and one very tired staff engineer who approves everything, AI will hand that person sixty PRs instead of fifteen, and half of them written by nobody.

The tool is the cheap part. The system is the whole game.

---

## Sources

- DORA, *The ROI of AI-Assisted Software Development (2026.01)* — [dora.dev/ai/roi/report](https://dora.dev/ai/roi/report/) · [ROI calculator](https://dora.dev/ai/roi/calculator)
- DORA, *2025 State of AI-Assisted Software Development* — [dora.dev/dora-report-2025](https://dora.dev/dora-report-2025)
- InfoQ, *New DORA Report Claims Strong Engineering Foundations Drive AI Return on Investment* (May 2026) — [infoq.com](https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/)
- Kodus, *DORA 2026: The ROI of AI in Software Development Runs Through Code Review* — [kodus.io](https://kodus.io/en/dora-accelerate-state-of-devops/)
- GitClear, *The Maintainability Gap: 2026 AI Code Quality Research* — [gitclear.com](https://www.gitclear.com/the_ai_code_quality_maintainability_gap)
- GitClear, *AI Copilot Code Quality (2025)* — [gitclear.com](https://www.gitclear.com/ai_assistant_code_quality_2025_research)
- Stack Overflow, *2025 Developer Survey: AI* — [survey.stackoverflow.co/2025/ai](https://survey.stackoverflow.co/2025/ai) · [summary post](https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/)
- METR, *Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity* — [metr.org](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) · [arXiv:2507.09089](https://arxiv.org/abs/2507.09089)
- METR, *We are Changing our Developer Productivity Experiment Design* (Feb 2026) — [metr.org](https://metr.org/blog/2026-02-24-uplift-update/)
