import RoutingHelper from "./routing-helper"

export default class BurmaldaApiClient {
  private _refreshToken: string | null
  private _accessToken: string | null
  private _routes: RoutingHelper
  
  public constructor(baseUrl: string){
    this._accessToken = null
    this._refreshToken = null
    this._routes = new RoutingHelper(baseUrl)
  }
  
  public get isAuthenticated() : boolean {
    return this._accessToken != null
  }

  public async loginAsync(email: string, password:string): Promise<boolean> {
    let identity = {
      email: email,
      password: password
    }

    let response = await this.fetch(this._routes.login, {
      method: "POST",
      body: JSON.stringify(identity)
    })

    if (!response.ok)
      return false

    this.setTokens(await response.json())
    return true 
  }

  public async signupAsync(nickname: string, email: string, password:string): Promise<boolean> {
    let identity = {
      nickname: nickname,
      email: email,
      password: password
    }

    let response = await this.fetch(this._routes.signup, {
      method: "POST",
      body: JSON.stringify(identity)
    })

    if (!response.ok)
      return false

    this.setTokens(await response.json())
    return true
  }

  public async getMeAsync(): Promise<any>{
    let response = await this.fetch(this._routes.me, {
      method: 'GET'
    })

    return response.json()
  }

  public async createAuctionAsync(title: string, initialDuration: string, strategy: number): Promise<any>{
    let response = await this.fetch(this._routes.auctions,{
      method: 'POST', 
      body: JSON.stringify({
        title: title,
        initialDuration: initialDuration,
        timeIncrementingStrategy: strategy
      })
    })

    return response.json()
  }

  public async getMyAuctionsAsync(): Promise<Array<any>> {
    let request = await this.fetch(this._routes.myAuctions, {
      method: 'GET'
    })

    return request.json()
  }

  private setTokens(tokens: any){
    let accessToken = tokens["access"]?? this._accessToken
    let refreshToken = tokens["refresh"]?? this._refreshToken
    this.authorize(accessToken, refreshToken)
  }

  public authorize(accessToken: string, refreshToken: string){
    localStorage.setItem("auth",  JSON.stringify({refresh: refreshToken, access: accessToken}))
    this._accessToken = accessToken
    this._refreshToken = refreshToken
  }

  private async fetch(
    input: RequestInfo | URL, 
    init?: RequestInit
  ): Promise<Response> {
    init ??= {}
    
    let additionalHeaders: any = {"Content-Type": "application/json"}
    if (this._accessToken != null){
      additionalHeaders["authorization"] = `Bearer ${this._accessToken}`
    }

    init.headers ??= {}
    init.headers = { ...init.headers, ...additionalHeaders} 

    return await fetch(input, init)
  } 
}
