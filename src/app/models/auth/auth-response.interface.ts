import { IAuthResponseBase } from './auth-response-base.interface';

/**
 * Authenticate response model - Return user data from server.
 */
export interface IAuthResponse extends IAuthResponseBase {

  /**
   * Game CDKey
   */
  cdkey: string;

  /**
   * User email
   */
  email: string;

  /**
   * Harddisk serial no.
   */
  hdserial: string;

  /**
   * Join date - as string date formatted
   */
  joindate: string;

  /**
   * Just logged in status
   */
  logged: boolean;

  /**
   * Username
   */
  name: string;

  /**
   * Password for PvPGN
   */
  passpvpgn: string;

  /**
   * Player name (In-game)
   */
  playername: string;

  /**
   * Prefer country (In-game)
   */
  prefer_country: string;

  /**
   * User role
   */
  role: string;

  /**
   * Special name (Special symbol prefix on player name)
   */
  specialname: boolean | string;

  /**
   * Account status
   */
  status: string;

  /**
   * Token that use to login
   */
  token: string;

  /**
   * User ID
   */
  uid: string;

}
