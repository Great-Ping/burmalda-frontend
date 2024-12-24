export default class RoutingHelper {
  private _baseUrl: string
  
  public constructor(baseUrl: string){
    this._baseUrl = baseUrl
  }

  public get login(): string{
    return new URL("api/auth/login", this._baseUrl).href
  }

  public get signup(): string{
    return new URL("api/auth/signup", this._baseUrl).href
  }

  public get me(): string{
    return new URL("api/users/@me", this._baseUrl).href
  }

  public get myAuctions(): string{
    return new URL("api/auctions/@my", this._baseUrl).href
  }

  public get auctions(): string {
    return new URL("api/auctions/", this._baseUrl).href
  }
}