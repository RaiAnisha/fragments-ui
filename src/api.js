// src/api.js

// fragments microservice API to use, defaults to localhost:8080 if not set in env


export const API_BASE_URL =process.env.API_URL || 'ec2-54-242-162-250.compute-1.amazonaws.com:8080';

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

    // console.log('Successfully got user fragments data', { data });
    
    // return data.fragments || [];

     console.log('FULL RESPONSE:', data); // 👈 add this

    // ✅ Log and return properly
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
  console.log('Creating new fragment...');
  try {
    const fragmentsUrl = new URL('/v1/fragments', API_BASE_URL);
        
        const res = await fetch(fragmentsUrl, {
          method: 'POST',
          headers: user.authorizationHeaders(type), // send selected type as Content-Type
          body: content, // send raw text
          // headers: user.authorizationHeaders('application/json'), // send JSON
          // body: JSON.stringify({ 
          //   type: 'text/plain',
          //   data : content,
          
          // }), 
        });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Successfully created fragment', { data });
    return data;
  } catch (err) {
    console.error('Unable to call POST /v1/fragments', { err });
    throw err;
  }
}