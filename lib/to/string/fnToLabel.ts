import type { PlanetName } from "@/lib/types/planet";
import type { ZodiacName } from "@/lib/types/zodiac";
import type { AspectName } from "@/lib/types/aspect";
import type { Lang } from "@/lib/types/common";

import { PlanetConfigs, PlanetList } from "@/lib/types/planet";
import { ZodiacConfigs, ZodiacList } from "@/lib/types/zodiac";
import { AspectConfigs, AspectList } from "@/lib/types/aspect";

import { fnToCapitalize } from "../fnToCapitalize";

const fnToPlanetLabel = (planetName: PlanetName, lang: Lang): string =>
  PlanetConfigs[planetName].label[lang] ??
  fnToCapitalize(PlanetConfigs[planetName].label["en"]) ??
  fnToCapitalize(planetName);

const fnToZodiacLabel = (zodiacName: ZodiacName, lang: Lang): string =>
  ZodiacConfigs[zodiacName].label[lang] ??
  fnToCapitalize(ZodiacConfigs[zodiacName].label["en"]) ??
  fnToCapitalize(zodiacName);

const fnToAspectLabel = (aspectName: AspectName, lang: Lang): string =>
  AspectConfigs[aspectName].label[lang] ??
  fnToCapitalize(AspectConfigs[aspectName].label["en"]) ??
  fnToCapitalize(aspectName);

export const fnToLabel = (
  name: PlanetName | ZodiacName | AspectName,
  lang: Lang,
): string =>
  PlanetList.includes(name as PlanetName)
    ? fnToPlanetLabel(name as PlanetName, lang)
    : ZodiacList.includes(name as ZodiacName)
      ? fnToZodiacLabel(name as ZodiacName, lang)
      : AspectList.includes(name as AspectName)
        ? fnToAspectLabel(name as AspectName, lang)
        : fnToCapitalize(name);
