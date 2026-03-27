export function parseLatLng(input) {
  if (!input) return undefined;

  const s = input.trim();

  // supports comma OR whitespace separator
  const match = s.match(
    /^(-?\d+(?:\.\d+)?)\s*(?:,|\s)\s*(-?\d+(?:\.\d+)?)$/
  );

  if (!match) return undefined;

  const lat = Number(match[1]);
  const lng = Number(match[2]);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return undefined;

  if (lat < -90 || lat > 90) return undefined;
  if (lng < -180 || lng > 180) return undefined;

  return { lat, lng };
}
