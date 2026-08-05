import type { TutorialConfig } from "./types"
import { remateConfig } from "./tutorials/remate"

export const tutorialConfigs = {
  remate: remateConfig,
} satisfies Record<string, TutorialConfig>

export type TutorialId = keyof typeof tutorialConfigs

export const defaultTutorialId: TutorialId = "remate"

export function getTutorialConfig(id: TutorialId) {
  return tutorialConfigs[id]
}
