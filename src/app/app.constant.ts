export class AppConstant {

  public static URI = {
    PROTOCOL: {
      HTTP: 'http',
      HTTPS: 'https',
    },
    HOST: 'play.thaira2.com',
  };

  public static URL = class {

    public static BASE = `${AppConstant.URI.PROTOCOL.HTTP}://${AppConstant.URI.HOST}`;

  }


  private constructor() { }

}
