import { getSolidDataset, getStringNoLocale, getThing, setStringNoLocale, setThing, saveSolidDatasetAt } from '@inrupt/solid-client';
import { Session } from '@inrupt/solid-client-authn-browser';
import {FOAF} from '@inrupt/vocab-common-rdf';

const session = new Session();
const solidLoginForm = document.querySelector('form[name="solid-login"]');
solidLoginForm.addEventListener('submit', login);
handleRedirectAfterLogin();

const solidProfileForm = document.querySelector('form[name="solid-profile"]');
solidProfileForm.addEventListener('submit', updateProfile);
let profileDataset = undefined;
let profile = undefined;


async function login(event){
    event.preventDefault();
    const identityProvider = solidLoginForm['identity-provider'].value;

    if(!session.info.isLoggedIn){
        await session.login({
            oidcIssuer: identityProvider,
            clientName: 'Solid Profile Explorer',
            redirectUrl: window.location.href
        });
    }
}

async function handleRedirectAfterLogin(){
    await session.handleIncomingRedirect(window.location.href);
    const status = solidLoginForm['status'];

    if(session.info.isLoggedIn){
        status.value = `Logged in as webId: ${session.info.webId} with sessionId: ${session.info.sessionId}`;        
        await fetchProfile()
            .then(profile => populateProfileForm(profile));
        
    }
}

async function fetchProfile(){
    profileDataset= await getSolidDataset(session.info.webId, {
        fetch: session.fetch
      });
    
    profile = getThing(profileDataset, session.info.webId);
    console.dir(profile);
    return profile;
}

function populateProfileForm(profile){
    solidProfileForm['name'].value = getStringNoLocale(profile, FOAF.name);
    solidProfileForm['givenName'].value = getStringNoLocale(profile, FOAF.givenName);
    solidProfileForm['familyName'].value = getStringNoLocale(profile, FOAF.familyName);
}

async function updateProfile(event){
    event.preventDefault();
    profile = setStringNoLocale(profile, FOAF.name, solidProfileForm['name'].value);
    profile = setStringNoLocale(profile, FOAF.givenName, solidProfileForm['givenName'].value);
    profile = setStringNoLocale(profile, FOAF.familyName, solidProfileForm['familyName'].value);
    profileDataset = setThing(profileDataset, profile);
    await saveSolidDatasetAt(session.info.webId, profileDataset, {
        fetch: session.fetch
    });
}