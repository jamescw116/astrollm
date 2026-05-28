import type { PlanetName } from "@/lib/types/planet";
import type { ZodiacName } from "@/lib/types/zodiac";
import type { AspectName } from "@/lib/types/aspect";
import type { Lang } from "@/lib/types/common";

import { PlanetConfigs, PlanetList } from "@/lib/types/planet";
import { ZodiacConfigs, ZodiacList } from "@/lib/types/zodiac";
import { AspectConfigs, AspectList } from "@/lib/types/aspect";

import { fnToCapitalize } from "../fnToCapitalize";
import { fnToDesc } from "./fnToDesc";

const fnToLabelPlanet = (planetName: PlanetName, lang: Lang): string =>
  PlanetConfigs[planetName].label[lang] ??
  fnToCapitalize(PlanetConfigs[planetName].label["en"]) ??
  fnToCapitalize(planetName) ??
  planetName;

const fnToLabelZodiac = (zodiacName: ZodiacName, lang: Lang): string =>
  ZodiacConfigs[zodiacName].label[lang] ??
  fnToCapitalize(ZodiacConfigs[zodiacName].label["en"]) ??
  fnToCapitalize(zodiacName) ??
  zodiacName;

const fnToLabelAspect = (aspectName: AspectName, lang: Lang): string =>
  AspectConfigs[aspectName].label[lang] ??
  fnToCapitalize(AspectConfigs[aspectName].label["en"]) ??
  fnToCapitalize(aspectName) ??
  aspectName;

const fnToLabelCore = (
  name: PlanetName | ZodiacName | AspectName,
  lang: Lang,
): string =>
  PlanetList.includes(name as PlanetName)
    ? fnToLabelPlanet(name as PlanetName, lang)
    : ZodiacList.includes(name as ZodiacName)
      ? fnToLabelZodiac(name as ZodiacName, lang)
      : AspectList.includes(name as AspectName)
        ? fnToLabelAspect(name as AspectName, lang)
        : fnToCapitalize(name) ?? name;

export const fnToLabel = (
  name: PlanetName | ZodiacName | AspectName,
  lang: Lang,
  desc: boolean = false
): string => `${fnToLabelCore(name, lang)}${desc ? ` (${fnToDesc(name, lang)})` : ""}`;