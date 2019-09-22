import Axios from 'axios';
import { Params, ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationRequest, AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { expressOauth, OAuthProfile, OAuthStrategy } from '@feathersjs/authentication-oauth';

import { Application } from './declarations';
import { LocalStrategy } from '@feathersjs/authentication-local';

function anonymizeName(name: string) {
  const parts = name.split(' ');
  if (parts.length === 1) {
    return name;
  }

  const firstName = parts[0];
  const lastName = parts.slice(-1)[0];
  const lastNameLetter = lastName.slice(0, 1);

  return `${firstName} ${lastNameLetter}.`;
}

class FacebookStrategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile, existingEntity: any, params: Params) {
    const baseData = await super.getEntityData(profile, existingEntity, params);
    const imageUrl = `https://graph.facebook.com/${profile.id}/picture?type=large`;
    return {
      ...baseData,
      name: anonymizeName(profile.name),
      imageUrl,
    };
  }

  async getProfile(data: AuthenticationRequest, _params: Params) {
    const baseProfile = await super.getProfile(data, _params);
    const url = `https://graph.facebook.com/v4.0/${baseProfile.id}/?access_token=${data.access_token}&fields=email&format=json`;
    const res = await Axios.get(url);
    const email = res.data.email;
    return {
      ...baseProfile,
      email,
    };
  }
}

declare module './declarations' {
  interface ServiceTypes {
    'authentication': AuthenticationService & ServiceAddons<any>;
  }
}

export default function(app: Application) {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('facebook', new FacebookStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
