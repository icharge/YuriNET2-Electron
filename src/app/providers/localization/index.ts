import { LocalizationService } from './localization-service';

export { LocalizationService };

// AoT compilation requires a reference to an exported function.
export function initLocalization(localizationConfig: LocalizationService): Function {
  return () => localizationConfig.load();
}


