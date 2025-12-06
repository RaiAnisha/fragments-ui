// src/api.js

// fragments microservice API to use, defaults to localhost:8080 if not set in env


export const API_BASE_URL =process.env.API_URL || 'http://ec2-54-242-162-250.compute-1.amazonaws.com:8080';

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user) {
  console.log('Requesting user fragments data...');
  
  // console.log('Token being sent:', user.idToken);
  try {
    const fragmentsUrl = new URL('/v1/fragments?expand=1', API_BASE_URL);
    
    const res = await fetch(fragmentsUrl, {
      headers: user.authorizationHeaders(),
      
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const data = await res.json();

     console.log('FULL RESPONSE:', data); 

    
    if (Array.isArray(data.fragments)) {
      console.log('Returning fragments array:', data.fragments);
      return data.fragments;
    } else {
      console.warn('Unexpected fragments format:', data);
      return [];
    }
    
  } catch (err) {
    console.error('Unable to call GET /v1/fragments', { err });
    return [];
  }
}

export async function createUserFragment(user, content, type = 'text/plain') {
  console.log('Creating new fragment with type:', type);
  try {
    const fragmentsUrl = new URL('/v1/fragments', API_BASE_URL);
    console.log(content,"createUserfunc");
    const res = await fetch(fragmentsUrl, {
      method: 'POST',
      headers: user.authorizationHeaders(type), // Content-Type: file.type
      body: content,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Upload failed: ${res.status} ${res.statusText} - ${text}`);
    }

    const data = await res.json();
    console.log('Successfully created fragment', { data });
    return data;
  } catch (err) {
    console.error('Unable to call POST /v1/fragments', { err });
    throw err;
  }
}
/**
 * DELETE /v1/fragments/:id
 * Deletes a fragment belonging to the authenticated user
 */
export async function deleteUserFragment(user, id) {
  console.log(`Deleting fragment: ${id}`);

  try {
    const url = new URL(`/v1/fragments/${id}`, API_BASE_URL);

    const res = await fetch(url, {
      method: 'DELETE',
      headers: user.authorizationHeaders(),
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    console.log(`Fragment ${id} deleted successfully`);
    return true;
  } catch (err) {
    console.error('Unable to delete fragment:', err);
    throw err;
  }
}

/**
 * PUT /v1/fragments/:id
 * Updates fragment data (text or binary)
 */
export async function updateUserFragment(user, id, content, type) {
  console.log(`Updating fragment ${id} with type: ${type}`);

  try {
    const url = new URL(`/v1/fragments/${id}`, API_BASE_URL);

    const res = await fetch(url, {
      method: 'PUT',
      headers: user.authorizationHeaders(type),
      body: content,
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`${res.status} ${res.statusText} - ${txt}`);
    }

    const data = await res.json();
    console.log('Successfully updated fragment', data);
    return data;
  } catch (err) {
    console.error('Unable to update fragment:', err);
    throw err;
  }
}
/**
 * GET /v1/fragments/:id
 * Fetches a single fragment (raw data) from backend
 */
export async function getUserFragment(user, id) {
  console.log(`Fetching fragment ${id}`);

  try {
    const url = new URL(`/v1/fragments/${id}`, API_BASE_URL);

    const res = await fetch(url, {
      method: 'GET',
      headers: user.authorizationHeaders(),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`${res.status} ${res.statusText} - ${txt}`);
    }

    const contentType = res.headers.get('Content-Type') || '';
    let data;

    if (contentType.startsWith('image/')) {
      data = await res.blob();
    } else if (contentType === 'application/json') {
      data = await res.json();
    } else {
      data = await res.text();
    }

    return { data, type: contentType };
  } catch (err) {
    console.error('Unable to fetch fragment:', err);
    throw err;
  }
}
