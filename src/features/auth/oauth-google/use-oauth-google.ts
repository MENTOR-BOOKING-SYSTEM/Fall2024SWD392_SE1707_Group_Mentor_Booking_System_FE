export const useOAuthGoogle = () => {
  const googleUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const query = {
    client_id: import.meta.env.VITE_GCP_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GCP_REDIRECT_URI,
    response_type: 'code',
    scope: 'email profile',
    prompt: 'consent'
  }

  const endpoints = new URLSearchParams(query).toString()
  return googleUrl + '?' + endpoints
}
