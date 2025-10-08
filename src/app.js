// // src/app.js

// import { signIn, getUser } from './auth';
// import { getUserFragments } from './api';

// async function init() {
//   // Get our UI elements
//   const userSection = document.querySelector('#user');
//   const loginBtn = document.querySelector('#login');

//   // Wire up event handlers to deal with login and logout.
//   loginBtn.onclick = () => {
//     // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
//     signIn();
//   };

//   // See if we're signed in (i.e., we'll have a `user` object)
//   const user = await getUser();
//   if (!user) {
//     return;
//   }

//   // Update the UI to welcome the user
//   userSection.hidden = false;

//   // Show the user's username
//   userSection.querySelector('.username').innerText = user.username;

//   // Disable the Login button
//   loginBtn.disabled = true;
//   const userFragments = await getUserFragments(user);
// }

// // Wait for the DOM to be ready, then start the app
// addEventListener('DOMContentLoaded', init);


// import { signIn, getUser } from './auth';
// import { getUserFragments } from './api';
// import { API_BASE_URL } from './api.js';


// // Wait for the DOM to be ready, then start the app
// addEventListener('DOMContentLoaded', init);

// async function init() {
//   // Get our UI elements
//   const userSection = document.querySelector('#user');
//   const loginBtn = document.querySelector('#login');

//   // Wire up event handlers for login
//   loginBtn.onclick = () => signIn();

//   // Check if user is signed in
//   const user = await getUser();
//   if (!user) return;

//   // Update the UI
//   userSection.hidden = false;
//   userSection.querySelector('.username').innerText = user.username;
//   loginBtn.disabled = true;

//   // Fetch and display user fragments (optional)
//   const userFragments = await getUserFragments(user);
//   console.log('User fragments:', userFragments);

//   // ----- NEW: Handle fragment creation -----
//   const fragmentForm = document.querySelector('#fragmentForm');
//   const fragmentInput = document.querySelector('#fragmentInput');
//   const result = document.querySelector('#result');

//   fragmentForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const text = fragmentInput.value;

//     try {
//   const res = await fetch(`${API_BASE_URL}/v1/fragments`, {
//     method: 'POST',
//   headers: {
//     ...user.authorizationHeaders(),   // must include: Authorization: 'Bearer <idToken>'
//     'Content-Type': 'text/plain',     // must match backend supported type
//   },
//   body: 'Hello world',                // raw string, will be converted to Buffer
// });

//   let data;
//   try {
//     data = await res.json(); // try parsing JSON
//   } catch {
//     const text = await res.text(); // fallback for plain text response
//     console.error('Server returned non-JSON response:', text);
//     result.textContent = 'Error: ' + text;
//     return;
//   }

//   // If JSON parsed successfully
//   result.textContent = JSON.stringify(data, null, 2);
//   console.log('Fragment created:', data);
//   fragmentInput.value = '';

// } catch (err) {
//   console.error('Error creating fragment:', err);
//   result.textContent = 'Error: ' + err.message;
// }

//   });
// }



// src/app.js
// import { signIn, getUser } from './auth';
// import { getUserFragments } from './api';
// import { API_BASE_URL } from './api.js';

// // Wait for the DOM to be ready, then start the app
// addEventListener('DOMContentLoaded', init);

// async function init() {
//   // UI elements
//   console.log('DEBUG: init() started');
//   const userSection = document.querySelector('#user');
//   const loginBtn = document.querySelector('#login');
//   const fragmentForm = document.querySelector('#fragmentForm');
//   const fragmentInput = document.querySelector('#fragmentInput');
//   const result = document.querySelector('#result');

//   // Login button handler
//   loginBtn.onclick = () => signIn();


//   console.log('DEBUG: calling getUser()...');
//   // Check if user is signed in
//   const user = await getUser();
//   console.log('DEBUG: getUser() returned:', user);


// // If the helper exists, show the headers object
// if (user && typeof user.authorizationHeaders === 'function') {
//   try {
//     const hdrs = user.authorizationHeaders('application/json');
//     console.log('DEBUG: authorizationHeaders() returned:', hdrs);
//   } catch (e) {
//     console.error('DEBUG: error calling authorizationHeaders():', e);
//   }
// } else {
//   console.warn('DEBUG: user.authorizationHeaders is not a function or user is undefined');
// }

// // Try to show likely token fields used by common libs
// // console.log('DEBUG: possible id/access tokens:',
// //   'id_token=', user?.id_token || user?.idToken || null,
// //   'access_token=', user?.access_token || user?.accessToken || null
// // );

//   if (!user) {
//     console.warn('DEBUG: user is null → you are NOT signed in');
//     return;
//   }

//   //console.log('Access token:', user.accessToken);


//   // Update UI for signed-in user
//   userSection.hidden = false;
//   userSection.querySelector('.username').innerText = user.username;
//   loginBtn.disabled = true;

//   // Fetch and display user fragments
//   const userFragments = await getUserFragments(user);
//   console.log('User fragments:', userFragments);

//   // Handle fragment creation
//   fragmentForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const text = fragmentInput.value.trim();
//     if (!text) return;

//     try {
//       const res = await fetch(`${API_BASE_URL}/v1/fragments`, {
//         method: 'POST',
//         headers: {
//           ...user.authorizationHeaders(), // correct place
//           'Content-Type': 'text/plain',   // match backend supported type
//         }, // Use id_token + correct content-type
//         body: text, // raw string; backend parses to Buffer
//       });

//       if (!res.ok) {
//   const bodyText = await res.text();
//   let data;
//   try {
//     data = JSON.parse(bodyText);
//   } catch {
//     data = { error: bodyText };
//   }
//   console.error('Error creating fragment:', data);
//   result.textContent = JSON.stringify(data, null, 2);
//   return;
// }
//       // Successfully created fragment
//       const fragmentData = await res.json();
//       console.log('Fragment created:', fragmentData);
//       result.textContent = JSON.stringify(fragmentData, null, 2);

//       // Clear input
//       fragmentInput.value = '';

//     } catch (err) {
//       console.error('Failed to create fragment:', err);
//       result.textContent = 'Error: ' + err.message;
//     }
//   });
// }


// src/app.js
import { signIn, getUser } from './auth';
import { getUserFragments, createUserFragment } from './api';

async function init() {
  // Get our UI elements
  const userSection = document.querySelector('#user');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');
  const fragmentsSection = document.querySelector('#fragments');
  const fragmentInput = document.querySelector('#fragment-input');
  const createFragmentBtn = document.querySelector('#create-fragment');
  const fragmentList = document.querySelector('#fragment-list');
  const fragmentsOutput = document.querySelector('#fragments-output');

  // Wire up event handlers
  loginBtn.onclick = () => signIn();
  //logoutBtn.onclick = () => signOut();

  // See if we're signed in
  const user = await getUser();
  if (!user) {
    userSection.hidden = true;
    //logoutBtn.style.display = 'none';
    fragmentsSection.hidden = true;
    fragmentList.hidden = true;
    return;
  }

  // If logged in, update UI
  userSection.hidden = false;
  //logoutBtn.style.display = 'inline-block';
  loginBtn.style.display = 'none'; // hide login
  fragmentsSection.hidden = false;
  fragmentList.hidden = false;

  // Show the user's username
  userSection.querySelector('.username').innerText = user.username;

  // Handle creating a new fragment
  createFragmentBtn.onclick = async () => {
    const content = fragmentInput.value.trim();
    if (!content) {
      alert('Please enter some text before creating a fragment.');

      return;
    }

    try {
      const newFragment = await createUserFragment(user, content);
      console.log('Created fragment:', newFragment);

      // Refresh list after creating
      const updatedFragments = await getUserFragments(user);
      renderFragments(updatedFragments, fragmentsOutput);
      fragmentInput.value = '';
    } catch (err) {
      console.error('Failed to create fragment:', err);
      alert('Error creating fragment, check console.');
    }
  };

  // Fetch and render fragments
  try {
    const fragments = await getUserFragments(user);
    //displayFragments(fragments);
    renderFragments(fragments, fragmentsOutput);
  } catch (err) {
    console.error('Failed to fetch fragments:', err);
  }
}

function renderFragments(fragments, container) {
  container.innerHTML = '';
  if (!fragments || fragments.length === 0) {
    container.innerHTML = '<p> No fragments found </p>';
    return;
  }

  fragments.forEach((frag) => {
    const div = document.createElement('div');
     div.classList.add('fragment-item');
    div.innerHTML = `
      <p><strong>ID:</strong> ${frag.id}</p>
      <p><strong>Type:</strong> ${frag.type}</p>
      <p><strong>Size:</strong> ${frag.size} bytes</p>
      <hr>
    `;
    container.appendChild(div);
  });
}

// Wait for DOM ready
addEventListener('DOMContentLoaded', init);