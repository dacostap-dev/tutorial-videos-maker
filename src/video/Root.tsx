import { Composition } from "remotion"
import { tutorialConfig } from "../config/tutorial"
import TutorialComposition from "./TutorialComposition"
import { getTotalDurationInFrames } from "./timeline"

export default function RemotionRoot() {
  return (
    <Composition
      id="TutorialVideo"
      component={TutorialComposition}
      durationInFrames={getTotalDurationInFrames(tutorialConfig)}
      fps={tutorialConfig.output.fps}
      width={tutorialConfig.output.width}
      height={tutorialConfig.output.height}
      defaultProps={{ config: tutorialConfig }}
    />
  )
}
