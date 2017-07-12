export class AppConstant {

  public static URI = {
    PROTOCOL: {
      HTTP: 'http',
      HTTPS: 'https',
    },
    HOST: 'play.thaira2.com',
  };


  public static BASE_URL = `${AppConstant.URI.PROTOCOL.HTTP}://${AppConstant.URI.HOST}`;

  public static LOGIN_URL = `${AppConstant.BASE_URL}/auth/loginyn`;

  private constructor() { }

}
