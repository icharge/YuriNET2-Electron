/**
 * User model
 */
export interface User {

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
  hdSerial: string;

  /**
   * Join date - as string date formatted
   */
  joinDate: string;

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
  passPvpgn: string;

  /**
   * Player name (In-game)
   */
  playerName: string;

  /**
   * Prefer country (In-game)
   */
  preferCountry: string;

  /**
   * User role
   */
  role: string;

  /**
   * Special name (Special symbol prefix on player name)
   */
  specialName: boolean | string;

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
