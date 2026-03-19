const CONSENT_KEY = 'ollander_consent'

export function useConsent() {
  const consent = useState<boolean | null>('consent', () => null)

  function laadToestemming() {
    if (import.meta.client) {
      const opgeslagen = localStorage.getItem(CONSENT_KEY)
      if (opgeslagen) {
        consent.value = JSON.parse(opgeslagen).consent
      }
    }
  }

  function geefToestemming() {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ consent: true }))
    consent.value = true
  }

  function weigerToestemming() {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ consent: false }))
    consent.value = false
  }

  function heeftToestemming(): boolean | null {
    return consent.value
  }

  return { consent, laadToestemming, geefToestemming, weigerToestemming, heeftToestemming }
}
