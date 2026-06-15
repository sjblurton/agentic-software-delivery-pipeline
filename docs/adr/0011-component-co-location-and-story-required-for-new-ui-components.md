# Component co-location and story-required rule for new UI components

New UI components must follow component co-location by default: implementation and Storybook story live in the same component folder (for example `button/button.tsx` and `button/button.stories.tsx`). A new UI component is not considered complete unless at least one story is added in that same folder. This aligns authoring structure with Storybook and visual regression CI, which already consume stories as the source of UI state coverage and screenshot baselines.

## Consequences

- New component PRs are expected to include both implementation and story in one vertical slice.
- Storybook and visual regression CI behavior is unchanged; this rule documents and standardizes the expected usage.
- Legacy components can be backfilled incrementally in follow-up work.
