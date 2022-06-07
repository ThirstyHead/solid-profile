import { getSolidDataset, getThing } from "@inrupt/solid-client";
import { Session } from "@inrupt/solid-client-authn-browser";


const session = new Session();
const solidProfileForm = document.querySelector('form[name="solid-profile"]');
solidProfileForm.addEventListener('submit', login);
handleRedirectAfterLogin();


async function login(event){
    event.preventDefault();
    const identityProvider = solidProfileForm['identity-provider'].value;
    console.log('Logging in...');

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
    const status = solidProfileForm['status'];

    if(session.info.isLoggedIn){
        console.log("Logged in!");
        console.dir(session.info);
        status.value = `Logged in with sessionId: ${session.info.sessionId}`;        
    }

}
