export const ROBOT_DOG_PRODUCT_ID = "robot-dog";

export const ROBOT_DOG_MODELS = [
  {
    id: "go2-edu",
    image: "/images/go2_edu.png",
  },
  {
    id: "b2",
    image: "/images/b2_robotdog.png",
  },
] as const;

export const ROBOT_DOG_FEATURES = [
  "gps",
  "obstacle",
  "holes",
  "vehicle",
  "waypoints",
  "stairs",
] as const;

export const ROBOT_DOG_CONTROLS = ["whatsapp", "indoor"] as const;

export type RobotDogModelId = (typeof ROBOT_DOG_MODELS)[number]["id"];
export type RobotDogFeatureId = (typeof ROBOT_DOG_FEATURES)[number];
export type RobotDogControlId = (typeof ROBOT_DOG_CONTROLS)[number];

export function isRobotDogModelId(id: string): id is RobotDogModelId {
  return ROBOT_DOG_MODELS.some((model) => model.id === id);
}

export function isRobotDogFeatureId(id: string): id is RobotDogFeatureId {
  return (ROBOT_DOG_FEATURES as readonly string[]).includes(id);
}

export function isRobotDogControlId(id: string): id is RobotDogControlId {
  return (ROBOT_DOG_CONTROLS as readonly string[]).includes(id);
}

export function getRobotDogModel(id: RobotDogModelId) {
  return ROBOT_DOG_MODELS.find((model) => model.id === id)!;
}

export function parseRobotDogFeaturesParam(
  raw: string | null
): RobotDogFeatureId[] {
  if (!raw) return [];
  const seen = new Set<RobotDogFeatureId>();
  for (const part of raw.split(",")) {
    const id = part.trim();
    if (isRobotDogFeatureId(id)) seen.add(id);
  }
  return ROBOT_DOG_FEATURES.filter((id) => seen.has(id));
}

export function buildRobotDogContactHref(
  model: RobotDogModelId,
  features: RobotDogFeatureId[],
  control: RobotDogControlId
): string {
  const params = new URLSearchParams();
  params.set("product", ROBOT_DOG_PRODUCT_ID);
  params.set("model", model);
  if (features.length > 0) {
    params.set("features", features.join(","));
  }
  params.set("control", control);
  return `/contact?${params.toString()}`;
}

type Translate = (key: string) => string;

export function formatRobotDogInquiryMessage(
  t: Translate,
  model: RobotDogModelId,
  features: RobotDogFeatureId[],
  control: RobotDogControlId
): string {
  const featureLabels =
    features.length > 0
      ? features
          .map((id) => t(`store.robotDog.features.${id}.title`))
          .join(", ")
      : t("store.robotDog.inquiry.noneSelected");

  const lines = [
    t("store.robotDog.inquiry.intro"),
    "",
    `${t("store.robotDog.inquiry.productLabel")}: ${t("store.robotDog.title")} — ${t(
      `store.robotDog.models.${model}.name`
    )}`,
    `${t("store.robotDog.inquiry.featuresLabel")}: ${featureLabels}`,
    `${t("store.robotDog.inquiry.controlLabel")}: ${t(
      `store.robotDog.controls.${control}.title`
    )}`,
  ];

  return lines.join("\n");
}
