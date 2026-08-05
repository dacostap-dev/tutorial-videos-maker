import { Composition } from "remotion"
import {
  defaultTutorialId,
  getTutorialConfig,
  tutorialConfigs,
  type TutorialId,
} from "../config"
import type { TutorialConfig } from "../config/types"
import TutorialComposition from "./TutorialComposition"
import { getTotalDurationInFrames } from "./timeline"

function TutorialCompositionDefinition({
  id,
  config,
}: {
  id: string
  config: TutorialConfig
}) {
  return (
    <Composition
      id={id}
      component={TutorialComposition}
      durationInFrames={getTotalDurationInFrames(config)}
      fps={config.output.fps}
      width={config.output.width}
      height={config.output.height}
      defaultProps={{ config }}
    />
  )
}

export default function RemotionRoot() {
  const entries = Object.entries(
    tutorialConfigs,
  ) as [TutorialId, TutorialConfig][]

  return (
    <>
      <TutorialCompositionDefinition
        id="TutorialVideo"
        config={getTutorialConfig(defaultTutorialId)}
      />
      {entries
        .filter(([id]) => id !== defaultTutorialId)
        .map(([id, config]) => (
          <TutorialCompositionDefinition
            key={id}
            id={`TutorialVideo-${id}`}
            config={config}
          />
        ))}
    </>
  )
}
