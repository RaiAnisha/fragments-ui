// src/api.js

// fragments microservice API to use, defaults to localhost:8080 if not set in env
// const apiUrl = process.env.API_URL || 'http://ec2-34-229-171-22.compute-1.amazonaws.com:8080';
// export const API_BASE_URL = apiUrl.replace(/\/$/, ''); // remove trailing slash if any

export const API_BASE_URL =process.env.API_URL || 'http://localhost:8080';

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
// export async function getUserFragments(user) {
//   console.log('Requesting user fragments data...');
//   try {
//     const fragmentsUrl = new URL('/v1/fragments',API_BASE_URL );
//     const res = await fetch(fragmentsUrl, {
//       // Generate headers with the proper Authorization bearer token to pass.
//       // We are using the `authorizationHeaders()` helper method we defined
//       // earlier, to automatically attach the user's ID token.
//       headers: user.authorizationHeaders('application/json', true),
//     });
//     if (!res.ok) {
//       throw new Error(`${res.status} ${res.statusText}`);
//     }
//     const data = await res.json();
//     console.log('Successfully got user fragments data', { data });
//     return data;
//   } catch (err) {
//     console.error('Unable to call GET /v1/fragments', { err });
//   }
// }


export async function getUserFragments(user) {
  console.log('Requesting user fragments data...');
  //badal rhi hu jp
   // Add this line ↓↓↓
  // console.log('Token being sent:', user.idToken);
  try {
    const fragmentsUrl = new URL('/v1/fragments', API_BASE_URL);
    
    const res = await fetch(fragmentsUrl, {
      headers: user.authorizationHeaders(),
      // 'Authorization': `Bearer ${user.idToken}` ,
      // 'Content-Type': 'application/json',
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Successfully got user fragments data', { data });
    return data.fragments || [];
    //return {fragments: data.fragments || []}
  } catch (err) {
    console.error('Unable to call GET /v1/fragments', { err });
    return [];
  }
}

export async function createUserFragment(user, content) {
  console.log('Creating new fragment...');
  try {
    const fragmentsUrl = new URL('/v1/fragments', API_BASE_URL);
    // const res = await fetch(fragmentsUrl, {
    //   method: 'POST',
    //   headers: {
    // //     ...user.authorizationHeaders(),
    // //     'Content-Type': 'text/plain',
    // //   },
    // //   body: content,
    // // });

    // ...user.authorizationHeaders(),
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     type: 'text/plain',
    //     content: content,
    //   }),
    // });
        const res = await fetch(fragmentsUrl, {
          method: 'POST',
          headers: user.authorizationHeaders('application/json'), // send JSON
          body: JSON.stringify({ 
            type: 'text/plain',
            data : content,
          //'Content-Type': type,
          }), // wrap content in JSON
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
