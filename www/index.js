import { getSolidDataset } from "@inrupt/solid-client";                    

const solidProfileForm = document.querySelector('form[name="solid-profile"]');
solidProfileForm.addEventListener('submit', fetchProfile);

export function fetchProfile(event){
  event.preventDefault();
  const profileUrl = event.target.elements['profile-url'].value;
  const profile = event.target.elements['profile'];
  fetch(profileUrl)
    .then(response => response.text())
    .then(data => profile.value = data);
}
