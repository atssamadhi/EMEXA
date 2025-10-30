// Small fetch wrapper for the frontend to talk to the backend.
// It reads base URL from Vite env: VITE_API_BASE (e.g. http://localhost:4000)
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

async function request(path, opts = {}){
  const url = API_BASE.replace(/\/$/, '') + path
  const headers = Object.assign({'Content-Type':'application/json'}, opts.headers || {})

  const res = await fetch(url, Object.assign({
    credentials: 'include', // use cookies when backend sets them
    headers,
  }, opts))

  let body = null
  const contentType = res.headers.get('content-type') || ''
  if(contentType.includes('application/json')){
    body = await res.json()
  } else {
    body = await res.text()
  }

  if(!res.ok){
    // throw the json body or a generic error
    const err = (body && body.message) ? body : { message: body || 'Request failed' }
    throw err
  }

  return body
}

export async function post(path, data){
  return request(path, { method: 'POST', body: JSON.stringify(data) })
}

export async function get(path){
  return request(path, { method: 'GET' })
}

export default { post, get }
