import { getSolidDataset, getThing } from "@inrupt/solid-client";                    

const solidProfileForm = document.querySelector('form[name="solid-profile"]');
solidProfileForm.addEventListener('submit', fetchProfile);

export function fetchProfile(event){
  event.preventDefault();
  const profileUrl = event.target.elements['profile-url'].value;
  const rawProfile = event.target.elements['raw-profile'];
  const solidProfile = event.target.elements['solid-profile'];

  // raw fetch
  fetch(profileUrl)
    .then(response => response.text())
    .then(data => rawProfile.value = data);

  fetchProfileWithSolid(profileUrl)
    .then(data => {
      solidProfile.value = JSON.stringify(data, null, 2);  
      console.dir(data);
    });
  
}

export async function fetchProfileWithSolid(profileUrl){
  const dataset = await getSolidDataset(profileUrl);
  const profile = getThing(dataset, profileUrl);
  return profile;
}
