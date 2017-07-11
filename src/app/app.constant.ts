export class AppConstant {

  public static URI = {
    PROTOCOL: {
      HTTP: 'http',
      HTTPS: 'https',
    },
    HOST: 'play.thaira2.com',
  };

  public static URL = {
    BASE: `${AppConstant.URI.PROTOCOL.HTTP}://${AppConstant.URI.HOST}`,
    LOGIN: `${AppConstant.URL.BASE}/auth/loginyn`,
  }

  private constructor() { }

}
