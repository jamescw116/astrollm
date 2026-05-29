import type { PlanetName } from "@/lib/types/planet";
import type { ZodiacName } from "@/lib/types/zodiac";
import type { AspectName } from "@/lib/types/aspect";
import type { Lang } from "@/lib/types/common";

import { PlanetConfigs, PlanetList } from "@/lib/types/planet";
import { ZodiacConfigs, ZodiacList } from "@/lib/types/zodiac";
import { AspectConfigs, AspectList } from "@/lib/types/aspect";

import { fnToCapitalize } from "../fnToCapitalize";

const fnToDescPlanet = (planetName: PlanetName, lang: Lang): string =>
  [
    ...(PlanetConfigs[planetName].detail.core[lang] ??
      PlanetConfigs[planetName].detail.core["en"] ??
      []),
    ...(PlanetConfigs[planetName].detail.operation[lang] ??
      PlanetConfigs[planetName].detail.core["en"] ??
      []),
  ].join(", ");

const fnToDescZodiac = (zodiacName: ZodiacName, lang: Lang): string =>
  ZodiacConfigs[zodiacName].deco[lang]?.join(", ") ??
  fnToCapitalize(ZodiacConfigs[zodiacName].deco["en"]?.join(", ")) ??
  "";

const fnToDescAspect = (aspectName: AspectName, lang: Lang): string =>
  AspectConfigs[aspectName].interaction[lang]?.join(", ") ??
  fnToCapitalize(AspectConfigs[aspectName].interaction["en"]?.join(", ")) ??
  "";

export const fnToDesc = (
  name: PlanetName | ZodiacName | AspectName,
  lang: Lang,
): string =>
  PlanetList.includes(name as PlanetName)
    ? fnToDescPlanet(name as PlanetName, lang)
    : ZodiacList.includes(name as ZodiacName)
      ? fnToDescZodiac(name as ZodiacName, lang)
      : AspectList.includes(name as AspectName)
        ? fnToDescAspect(name as AspectName, lang)
        : (fnToCapitalize(name) ?? "");
